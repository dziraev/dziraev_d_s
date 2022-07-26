function recurPal(str) {
	if(str.length == 0 || str == null) return false;
	str = str.toLowerCase();
	const marks = ['.', ',', '!', '?', ':', ';', '…','-', '—','–', '/', 
					'\'', '\"', '(', ')', '[', ']', ' ', 'ъ', 'ь'];
	let newStr = '';
	for(let i of str) {
		newStr += marks.includes(i) ? '' : i == 'ë' ? 'e' : i;
	}
	if(newStr.length == 1) return true;
	if(newStr.length == 2) return newStr[0] === newStr[1];
	if(newStr[0] === newStr[newStr.length - 1]) return recurPal(newStr.slice(1, -1));
	return false;
}
//Из-за того, что по условию надо игнорировать некоторые символы/буквы, 
//при рекурсии приходится заново проделовать замены 

// С помощью регулярок
function recPal(str) {
	if(str.length == 0 || str == null) return false;
	str = str.toLowerCase()
			 .replace(/[^0-9а-щыэюяёa-z]/gi, '')
			 .replace(/ё/gi, 'е');
	if(str.length == 1) return true;
	if(str.length == 2) return str[0] === str[1];
	if(str[0] === str[str.length - 1]) return recPal(str.slice(1, -1)); 
	return false;
}

console.log(recurPal('Молоко делили ледоколом.')); //true
console.log(recPal('Молоко делили ледоколом.')); //true

console.log(recurPal('193111111323111111391')); //true
console.log(recPal('193111111323111111391')); //true

console.log(recurPal('false')); //false
console.log(recPal('false')); //false



