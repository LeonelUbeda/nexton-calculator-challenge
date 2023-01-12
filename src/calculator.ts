function isNumber(char: any) {
  return !isNaN(parseFloat(char)) && isFinite(char);
}

function isOperator(char: string) {
  return ["+", "-", "*", "/"].indexOf(char) !== -1;
}

function operatorPriority(char: string) {
  switch (char) {
    case "+":
    case "-":
      return 1;
    case "*":
    case "/":
      return 2;
    default:
      return 0;
  }
}

function execute(op: string, left: number, right: number) {
  switch (op) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "*":
      return left * right;
    case "/":
      return left / right;
    default:
      return NaN;
  }
}

export function calculator(expression: string) {
  let operands: number[] = [];
  let operators: string[] = [];

  const popOperatorAndOperands = () => {
    let op = operators.pop();
    let right = operands.pop();
    let left = operands.pop();
    return { op, right, left };
  };

  for (let i = 0; i < expression.length; i++) {
    let char = expression[i];

    // skip if empty
    if (char === " ") continue;

    // get whole number and add it to operands stack
    if (isNumber(char)) {
      let value = char;
      while (isNumber(expression[i + 1])) {
        value += expression[i + 1];
        i++;
      }
      operands.push(parseFloat(value));
      continue;
    }

    // if initial parentesis, add it to operators stack, later will be removed when final parentesis found
    if (char === "(") {
      operators.push(char);
      continue;
    }

    if (isOperator(char)) {
      // if the top of operators stack has more or equal priority than current, then calculate
      // examples:
      // top stack | current
      //     *     |   *
      //     +     |   +

      //this will not be valid because we need to multiply with the next number first in order to execute sum
      // top stack | current
      //     +     |   *

      while (
        operators.length &&
        operatorPriority(operators[operators.length - 1]) >=
          operatorPriority(char)
      ) {
        const { op, right, left } = popOperatorAndOperands();
        operands.push(execute(op as string, left as number, right as number));
      }
      operators.push(char);
      continue;
    }

    // if end parentesis then we have to calculate until we reach the initial parentesis
    if (char === ")") {
      while (operators.length && operators[operators.length - 1] !== "(") {
        const { op, right, left } = popOperatorAndOperands();
        operands.push(execute(op as string, left as number, right as number));
      }
      // if no operators or not initial parentesis, invalidate
      if (!operators.length || operators[operators.length - 1] !== "(") {
        throw new Error("Bad");
      }
      // Pop initial parentesis
      operators.pop();
      continue;
    }
  }

  // Execute the remaining operators
  while (operators.length) {
    const { op, right, left } = popOperatorAndOperands();
    operands.push(execute(op as string, left as number, right as number));
  }

  // Final result should be at the top of operands stack, and only that
  if (operands.length !== 1) {
    throw new Error("Bad");
  }
  return operands[0];
}
