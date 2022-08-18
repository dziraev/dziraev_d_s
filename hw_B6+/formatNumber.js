function formatNumber(num, format) {

    format = format.trim().split('');    //разбиваем формат на массив
    const revFormat = [...format].reverse();  //копия обратного массива

    let count = revFormat.indexOf('.') == -1 ? 0 : revFormat.indexOf('.'); //находим кол-во знаков в дробной части

    num = (Math.round(num * Math.pow(10, count)) / Math.pow(10, count))
            .toFixed(count).split('');   //округляем до кол-во знаков заданных формате после точки .###, 
                                         //затем испрользуем toFixed для добавления 0, где дробная часть меньше чем в формате
                                         // и снова сплитим
    
    if (count > 0) {                      //если есть дробная часть то форматируем с конца
        const revNum = num.reverse();    // переворачиваем num (массив символов итогового числа)
        for (let i = count+1; i < num.length; i++) {   //форматируем по шаблону(формату)
            if (revFormat[i] === ' ') {
                revNum.splice(i, 0, ' ');
            }
        }
        return revNum.reverse().join(''); //переворачиваем обратно и собираем в нормальный вид
    }

    for (let i = 0; i < format.length; i++ ) { // если дробной части нет, то форматируем с начала заданого формата, а не с конца
        if (format[i] === ' ') {
            num.splice(i, 0, ' ');
        }
        if (num.at(-1) === ' ') { //проверка, если, например, число '2', а формат # # # #, то добавились бы лишнии пробелы
            num.pop();
            break;
        }    
    }
    return num.join('');
}

console.log(formatNumber(12345.368,"# ### ###.##"));
console.log(formatNumber(2.3,"# ### ###.##"));
