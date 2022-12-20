import Block from 'modules/Block';

interface ErrorMessageProps {
  text?: string;
}

export class ErrorMessage extends Block {
  static componentName = 'ErrorMessage';

  constructor(props: ErrorMessageProps) {
    super({ ...props });
  }

  protected render(): string {
    return `<div class="inputfield__message">
    {{text}}
    </div>`;
  }
}
