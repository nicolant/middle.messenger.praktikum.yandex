type RuleSet = {
  [ruleName: string]: [pattern: RegExp[] | RegExp, message: string]
}

const ruleSet: RuleSet = {
  login: [[/[A-Za-z]/, /^[\w-.]{3,20}$/], 'От 3 до 20 символов: хотя бы один латинский, цифры, - и _'],
  password: [[/[A-ZА-Я]/, /\d/, /^.{8,40}$/], 'От 8 до 40 символов, хотя бы одна заглавная буква и цифра'],
  name: [/^[A-ZА-Я][A-Za-zА-Яа-я-]*$/, 'Латиница или кириллица, -, первая заглавная буква'],
  display_name: [/^[A-Za-zА-Яа-я\s-]+$/, 'Латиница или кириллица, пробелы, -'],
  email: [/^[\w-.]+@([\w-]+\.)+[\w]{2,}$/, 'Неверный адрес e-mail'],
  phone: [/^\+?[\d]{10,15}$/, 'От 10 до 15 цифр, может начинаться с +'],
  required: [/^.+$/, 'Не может быть пустым'],
};

export default function validateValue(value: string, rule?: string): Nullable<string> {
  let result = null;
  if (rule) {
    const [pattern, message] = ruleSet[rule];
    let isValid = false;
    if (pattern instanceof RegExp) isValid = value.match(pattern) !== null;
    else isValid = pattern.reduce((totalMatch, re) => totalMatch && (value.match(re) !== null), true);
    if (!isValid) result = message;
  }
  return result;
}
