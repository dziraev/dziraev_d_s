function vowels(str) {
    const vowels = ['а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я'];
    return str.toLowerCase().split('').filter(i => vowels.includes(i)).length;
}

