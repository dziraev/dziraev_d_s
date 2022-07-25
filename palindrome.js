function palindrome(str) {
	if(str.length == 0 || str == null) return false;
	if(str.length == 1) return true;
	str = str.toLowerCase();
	let newStr = '';
	const marks = ['.', ',', '!', '?', ':', ';', '…','-', '—','–',
                     '/', '\'', '\"', '(', ')', '[', ']', ' ', 'ъ', 'ь'];
	for(let i of str) {
		newStr += marks.includes(i) ? '' : i == 'ë' ? 'e' : i;
	}
	const l = Math.floor(newStr.length / 2);
	const lastInd = newStr.length - 1;
	for(let i = 0; i < l; i++) {
		if(newStr[i]!== newStr[lastInd - i]) return false;
	}
	return true;
}

// С помощью регулярок
function palindrom(str) {
	if(str.length == 0 || str == null) return false;
	if(str.length == 1) return true;
	str = str.toLowerCase()
			 .replace(/[^0-9а-щыэюяёa-z]/gi, '')
			 .replace(/ё/gi, 'е');
	for(let i = 0; i < Math.floor(str.length / 2); i++) {
		if(str[i]!== str[str.length - 1 - i]) return false;
	}
	return true;
}
console.log(palindrome('Ешь немытого ты меньше!')); //true
console.log(palindrom('Ешь немытого ты меньше!')); //true

console.log(palindrome('Мыло - голым!')); //true
console.log(palindrom('Мыло - голым!')); //true

console.log(palindrome('не палиндром!')); //false
console.log(palindrom('не палиндром!')); //false



