function trim(str) {
    let ind1;
    for(let i = 0; i < str.length; i++) {
        if(str[i] !== ' ') {
            ind1 = i;
            break;
        }
    }
    if(ind1 == undefined) return null;
    if(str.length == 1) return str;
    let ind2;
    for(let i = str.length - 1; i > 0 ; i--) {
        if(str[i] !== ' '){
            ind2 = i;
            break;
        }
    }
    return '(!)'.repeat(ind1) + str.substring(ind1, ind2 + 1) + '(!)'.repeat(str.length - 1 - ind2);
}
