function vowelsFilter(str) {
    const vowels = ['а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я'];
    return str.toLowerCase().split('').filter(i => vowels.includes(i)).length;
}

function vowelsFor(str) {
    const vowels = ['а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я'];
    let count = 0;
    str.toLowerCase().split('').forEach(i => ~vowels.indexOf(i) ? count++ : null);
    return count;
}

function vowelsReduce(str) {
    const vowels = ['а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я'];
    return str.toLowerCase().split('').reduce((acc, curr) => acc + vowels.includes(curr), 0);
}

const vowelsReg = (str) => str.match(/[аеёиоуыэюя]/gi).length;


const stroka = 'В этой строке семь гласных';

console.log(vowelsFilter(stroka));
console.log(vowelsReduce(stroka));
console.log(vowelsFor(stroka));
console.log(vowelsReg(stroka));