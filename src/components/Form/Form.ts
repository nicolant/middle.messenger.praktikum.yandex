import { Block } from 'modules';
import { InputField } from 'components/InputField';

interface Map {
  [key: string]: string | undefined
}

export class Form extends Block {
  validateFields(): boolean {
    let isValid = true;
    this.inputRefs.forEach((field) => { isValid = (field as InputField).validate() && isValid; });
    return isValid;
  }

  get inputRefs() {
    return Object.values(this.refs)
      .filter((ref) => ref instanceof InputField);
  }

  get formValues(): Map {
    return this.inputRefs.reduce((acc, ref): Map => { acc[ref.props.name] = (ref as InputField).value; return acc; }, {} as Map);
  }
}
