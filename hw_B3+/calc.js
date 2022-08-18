function calc(exp) {

    exp = exp.replace(/\s/g, '').split('');

    let bracketOpen = 0;    //проверка на кол-во открытых/закрытых скобок
    let bracketClosed = 0;
    exp.forEach(i => i == '(' ? bracketOpen += 1 : i == ')' ? bracketClosed += 1 : null);
    if (bracketOpen !== bracketClosed) return false;

    const op = {  //операторы в порядке приоритета
        '*': (x, y) => x * y,
        '/': (x, y) => {
            if (+y === 0) throw new SyntaxError('Деление на ноль');
            return x/y;
        },
        '-': (x, y) => x - y,
        '+': (x, y) => (+x) + (+y)
    };

    function parseStr(exp) { //парсим выражение на числа и опраторы
        const arr = []; 
        let symb = ''; //текущий символ

        function addSymbol() {
            if (symb) arr.push(symb); //если уже есть какой-то символ, то добавляем в массив и обнуляем symb(символ)
            symb = '';
        }

        while (exp.length > 0) {

            if (exp[0] in op && symb !== '') { //проверка на то, чтобы был именно оператор, а не, например, отрицательное число
                addSymbol();
                arr.push(exp[0]); //если это все-таки оператор, то сразу добавляем его в массив и переходим к следующей итерации
                exp.shift();   //удаляем этот символ из выражения
                continue;    
            } else if (exp[0] === '(') { 
                addSymbol(); 
                exp.shift();
                symb = parseStr(exp); //если нашли открытую скобку, то закидываем оставшееся выражение в эту же функцию
                continue;
            } else if (exp[0] === ')') { //условие выхода
                exp.shift();
                addSymbol();
                return arr;
            }
            symb += exp[0];
            exp.shift();
        }
        addSymbol();
        return arr;
    }

    function caclExp(exp) {
        if (exp.length == 1) {
            return Array.isArray(exp[0]) ? caclExp(exp[0]) : +exp[0];
        }
        let calculate;
        for (let k in op) { //проходимся по всем операторам
            while (exp.includes(k)) { 
                let i = exp.indexOf(k); //находим индекс оператора
                let leftOperand = Array.isArray(exp[i - 1]) ? caclExp(exp[i - 1]) : exp[i - 1]; //находим операнд находящийся слева от оператора
                let rightOperand = Array.isArray(exp[i + 1]) ? caclExp(exp[i + 1]) : exp[i + 1]; //находим операнд находящийся справа от оператора
                calculate = op[k](leftOperand, rightOperand); //делаем вычисления в соответствии с найденным оператором
                exp.splice(i - 1, 3, `${calculate}`); //убираем из выражения 3 элемента(левый операнд, оператор и правый операнд) и добавляем результат
            }
        }
        return isNaN(calculate) ? null : calculate;
    }
    const arrCacl = parseStr(exp);
    console.log(arrCacl);
    return caclExp(arrCacl);
}


console.log(calc('2*(-3+1)') == eval('2*(-3+1)'));
console.log(calc('(-11*(-5)) + 23.8') == eval('(-11*(-5)) + 23.8'));


