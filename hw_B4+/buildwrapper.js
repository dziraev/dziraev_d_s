function buildWrapper(tag) {
    const mnemonics = {
        "<": "&lt;",
        ">": "&gt;",
        '&': "&amp;",
        '"': "&quot;",
        "'": "&apos;",
    }; 
    const keysMnem = Object.keys(mnemonics);
    return (text) =>`<${tag}>${text.split('').reduce((acc, curr)=>
                acc+= keysMnem.includes(curr) ? mnemonics[curr] : curr, '')}</${tag}>`;
}

const wrapH1 = buildWrapper("H1");
console.log(wrapH1("СТИХИ") );

const wrapP = buildWrapper("P");
console.log(wrapP("Однажды в студёную зимнюю пору"));
console.log(wrapP("Вкусные M&M's"));