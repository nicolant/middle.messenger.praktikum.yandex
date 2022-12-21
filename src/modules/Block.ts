import EventBus from 'modules/EventBus';
import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';

type Events = Values<typeof Block.EVENTS>;

interface BlockEvents {
  [event: string]: EventListenerOrEventListenerObject
}

interface BlockProps {
  [prop: string]: any,
  events?: BlockEvents,
}

export default class Block<P extends object = object> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  static componentName: string;

  public id = nanoid(6);

  protected _element: Nullable<HTMLElement> = null;

  protected readonly props: BlockProps = {};

  protected children: { [id: string]: Block } = {};

  eventBus: () => EventBus<Events>;

  protected refs: { [key: string]: Block } = {};

  public constructor(props?: BlockProps) {
    const eventBus = new EventBus<Events>();
    this.props = this._makePropsProxy(props || {} as BlockProps);
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus<Events>) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    this._element = this._createDocumentElement('div');
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount(props: P) {
    this.componentDidMount(props);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidMount(props: P) {
    return true;
  }

  _componentDidUpdate(oldProps: P, newProps: P) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidUpdate(oldProps: P, newProps: P) {
    return true;
  }

  setProps = (nextProps: P) => {
    if (!nextProps) return;
    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const fragment = this._compile();

    this._removeEvents();
    const newElement = fragment.firstElementChild;
    if (newElement && this._element) {
      this._element.replaceWith(newElement);
      this._element = newElement as HTMLElement;
      this._addEvents();
    }
  }

  protected render(): string {
    return '';
  }

  getContent(): Nullable<HTMLElement> {
    // Хак, чтобы вызвать CDM только после добавления в DOM
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
          this.eventBus().emit(Block.EVENTS.FLOW_CDM);
        }
      }, 100);
    }

    return this.element || null;
  }

  _makePropsProxy(props: BlockProps): BlockProps {
    return new Proxy(props, {
      get: (target: BlockProps, prop: string) => {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target: BlockProps, prop: string, value: any) => {
        console.log('set', prop);
        target[prop] = value;
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      defineProperty: (target, prop) => {
        console.log('define', prop);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  _removeEvents() {
    const { events } = this.props;
    if (!events || !this._element) {
      return;
    }
    Object.entries(events).forEach(([event, listener]) => {
      this._element!.removeEventListener(event, listener);
    });
  }

  _addEvents() {
    const { events } = this.props;
    if (!events) { return; }
    Object.entries(events).forEach(([event, listener]) => {
      this._element!.addEventListener(event, listener);
    });
  }

  _compile(): DocumentFragment {
    const fragment = document.createElement('template');

    /**
   * Рендерим шаблон
   */
    const templateString = this.render();
    const template = Handlebars.compile(templateString);

    const html = template({
      /* ...this.state, */ ...this.props, children: this.children, refs: this.refs,
    });
    console.log(html);
    fragment.innerHTML = html;

    /**
   * Заменяем заглушки на компоненты
   */
    Object.entries(this.children).forEach(([id, component]) => {
      /**
       * Ищем заглушку по id
       */
      const stub = fragment.content.querySelector(`[data-id="${id}"]`);

      if (!stub) {
        return;
      }

      const stubChilds = stub.childNodes.length ? stub.childNodes : [];

      /**
     * Заменяем заглушку на component._element
     */
      const content = component.getContent();
      if (content) {
        stub.replaceWith(content);

        /**
     * Ищем элемент layout-а, куда вставлять детей
     */
        const layoutContent = content.querySelector('[data-layout="1"]');

        if (layoutContent && stubChilds.length) {
          layoutContent.append(...stubChilds);
        }
      }
    });

    /**
   * Возвращаем фрагмент
   */
    return fragment.content;
  }

  show() {
    if (this.element) this.element.style.display = 'block';
  }

  hide() {
    if (this.element) this.element.style.display = 'none';
  }
}
