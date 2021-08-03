function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
    function isNumber(n) {
        return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
    }

    let exprArr = expr.replace(/([(-)])(?=[(-)])/ig, "$1 ").replace(/(\d+)(?=[(-/])/ig, "$1 ").replace(/([(-/])(?=\d+)/ig, "$1 ").trim().replace(/\s{2,}/g, ' ').split(' ').filter(Boolean);

    let leftBracketsArr = exprArr.filter(item => item === '(');
    let rightBracketArr = exprArr.filter(item => item === ')');
    if (leftBracketsArr.length !== rightBracketArr.length) {
        throw ("ExpressionError: Brackets must be paired");
    }
    if (leftBracketsArr.length === 0 && rightBracketArr.length === 0) {

        exprArr.push(')');
        exprArr.unshift('(');
    }

    while (exprArr.length !== 0) {

        let i; // end
        let j; // start

        function formSubArr(array) {
            let exprSubArr = array;
            let resArr = [];
            i = 0;
            while (exprSubArr[i] !== ')') {
                resArr.push(exprSubArr[i]);
                i++
            }
            let subArr = [];
            j = resArr.length - 1;
            while (resArr[j] !== '(') {
                subArr.push(resArr[j]);
                j--;
            }
            exprArr.splice(j, i - j + 1); //вырезаем скобку
            return subArr.reverse();
        }
        function calculateSubArr(array) {
            function calculateAddSub(array) {
                let arr = array.reverse();
                let valsArr = [];
                let opsArr = [];
                for (let i = 0; i < arr.length; i++) {
                    if (isNumber(+arr[i])) valsArr.push(+arr[i]); else opsArr.push(arr[i]);
                }
                let lengthOps = opsArr.length;
                while (lengthOps) {
                    let op = opsArr.pop();
                    let vals1;
                    let vals2;
                    if (op === '-') {
                        vals1 = valsArr.pop();
                        vals2 = valsArr.pop();
                        valsArr.push(vals1 - vals2);
                    }
                    if (op === '+') {
                        vals1 = valsArr.pop();
                        vals2 = valsArr.pop();
                        valsArr.push(vals1 + vals2);
                    }
                    lengthOps--;
                }
                return String(valsArr[0]); //строка с ответом на скобк
            }

            let subSub = [];
            let arr = array.reverse();
            let valsArr = [];
            let opsArr = [];

            for (let i = 0; i < arr.length; i++) {
                if (isNumber(+arr[i])) valsArr.push(+arr[i]); else opsArr.push(arr[i]);
            }
            let lengthOps = opsArr.length;
            while (lengthOps) {
                let op = opsArr.pop();
                let vals1;
                let vals2;
                if (op === '/') {
                    vals1 = valsArr.pop();
                    vals2 = valsArr.pop();
                    if (vals2 === 0) {
                        throw("TypeError: Division by zero.");
                    }
                    valsArr.push(vals1 / vals2);
                }
                if (op === '*') {
                    vals1 = valsArr.pop();
                    vals2 = valsArr.pop();
                    valsArr.push(vals1 * vals2);
                }
                if (op === '-' || op === '+') {
                    subSub.push(valsArr.pop());
                    subSub.push(op);
                }
                lengthOps--;
            }
            subSub.push(valsArr.pop());

            return calculateAddSub(subSub);
        }

        let subResult = calculateSubArr(formSubArr(exprArr));
        exprArr.splice(j, 0, subResult);
        let leftBrackets = exprArr.filter(item => item === '(');
        let rightBracket = exprArr.filter(item => item === ')');
        if (leftBrackets.length === 0 && rightBracket.length === 0) {
            break
        }

    }

    let result = calculateSubArr(exprArr);

    return +parseFloat(result).toFixed(4);
}

module.exports = {
    expressionCalculator
}