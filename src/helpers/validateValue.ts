type RuleSet = {
  [ruleName: string]: [pattern: RegExp[] | RegExp, message: string]
}

const ruleSet: RuleSet = {
  login: [[/[A-Za-z]/, /^[A-Za-z0-9-_]{3,20}$/], 'От 3 до 20 символов: хотя бы один латинский, цифры, - и _'],
  password: [[/[A-ZА-Я]/, /[0-9]/, /^.{8,40}$/], 'От 8 до 40 символов, хотя бы одна заглавная буква и цифра'],
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
