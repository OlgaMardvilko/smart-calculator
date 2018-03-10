class SmartCalculator {
  constructor(initialValue) {
    this.expression = [];
    this.expression.push(initialValue);
  }

  static getPriority(signs) {
    switch(signs) {
      case '^':
        return 3;
      case '*':
      case '/':
        return 2;
      case '+':
      case '-':
        return 1;
      default:
        return 0;
    }
  }
  
  get sortingStation() {
    let res = [];
    let operators = [];
    let priority;

    for(let i = 0; i < this.expression.length; i++) {
      priority = SmartCalculator.getPriority(this.expression[i]);
      if(!priority) { 
        res.push(this.expression[i]);
      } else { 
        let firstOper = operators.pop();
        if(priority > SmartCalculator.getPriority(firstOper) || priority == 3) {
          if(firstOper) { operators.push(firstOper); }
          operators.push(this.expression[i]);
        } else {
          res.push(firstOper);
          let temp;
          while((temp = operators.pop())) {
            if(SmartCalculator.getPriority(temp) >= priority) {
              res.push(temp);
            } else {
              operators.push(temp);
              break;
            }
          }
          operators.push(this.expression[i]);
        }
      }
    }
    while((priority = operators.pop())) {
      res.push(priority);
    }
    return res;
  }

  сalculator() {
    let sortExpression = this.sortingStation;
    let numbers = [];
    let result;
    for(let i = 0; i < sortExpression.length; i++) {
      if(!SmartCalculator.getPriority(sortExpression[i])) {
        numbers.push(sortExpression[i]);
      } else {
        let number2 = numbers.pop();
        let number1 = numbers.pop();
        switch(sortExpression[i]) {
          case '^':
            result = Math.pow(number1, number2);
            break;
          case '*':
            result = number1 * number2;
            break;
          case '/':
            result = Math.floor(number1 / number2);
            break;
          case '+':
            result = number1 + number2;
            break;
          case '-' :
            result = number1 - number2;
            break;
        }
        numbers.push(result);
        
      }
    }
    return result;
  }

  add(number) {
    this.expression.push('+');
    this.expression.push(number);
    return this;
  }
  
  subtract(number) {
    this.expression.push('-');
    this.expression.push(number);
    return this;
  }

  multiply(number) {
    this.expression.push('*');
    this.expression.push(number);
    return this;
  }

  devide(number) {
    this.expression.push('/');
    this.expression.push(number);
    return this;
  }

  pow(number) {
    this.expression.push('^');
    this.expression.push(number);
    return this;
  }

  valueOf() {
    return this.сalculator();
  }
}

module.exports = SmartCalculator;
