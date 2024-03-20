// Calculator.ts

// 定义运算符的优先级
const operators = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
  '%':2
};

// 将表达式字符串拆分成数字、运算符和括号
function tokenize(expression: string): string[] {
  const tokens: string[] = [];
  let numBuffer = '';

  for (const char of expression) {
    if (char.match(/[0-9.]/)) {
      numBuffer += char;
    } else {
      if (numBuffer) {
        tokens.push(numBuffer);
        numBuffer = '';
      }
      tokens.push(char);
    }
  }

  if (numBuffer) {
    tokens.push(numBuffer);
  }

  return tokens;
}

// 将中缀表达式转换为后缀表达式（逆波兰表达式）
function toPostfix(tokens: string[]): string[] {
  const postfix: string[] = [];
  const operatorStack: string[] = [];

  for (const token of tokens) {
    if (token.match(/[0-9.]/)) {
      postfix.push(token);
    } else if (token in operators) {
      while (
        operatorStack.length &&
        operators[operatorStack[operatorStack.length - 1]] >= operators[token]
      ) {
        postfix.push(operatorStack.pop() as string);
      }
      operatorStack.push(token);
    } else if (token === '(') {
      operatorStack.push(token);
    } else if (token === ')') {
      while (operatorStack.length && operatorStack[operatorStack.length - 1] !== '(') {
        postfix.push(operatorStack.pop() as string);
      }
      operatorStack.pop();
    }
  }

  while (operatorStack.length) {
    postfix.push(operatorStack.pop() as string);
  }

  return postfix;
}

// 计算后缀表达式的值
function evaluatePostfix(postfix: string[]): number {
  const operandStack: number[] = [];

  for (const token of postfix) {
    if (token.match(/[0-9.]/)) {
      operandStack.push(parseFloat(token));
    } else if (token in operators) {
      const b = operandStack.pop() as number;
      const a = operandStack.pop() as number;
      switch (token) {
        case '+':
          operandStack.push(a + b);
          break;
        case '-':
          operandStack.push(a - b);
          break;
        case '*':
          operandStack.push(a * b);
          break;
        case '/':
          operandStack.push(a / b);
          break;
        case '%':
          operandStack.push(a % b);
          break;
      }
    }
  }

  return operandStack.pop() as number;
}

// 计算表达式
export function evaluateExpression(expression: string): string{
  try {
    const tokens = tokenize(expression);
    const postfix = toPostfix(tokens);
    const result = evaluatePostfix(postfix);
    return String(result);
  } catch (error) {
    return "";
  }
}
