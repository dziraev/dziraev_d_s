function buildWrapper(tag) {
    const replacer = (str) =>  {
        const mnemonics = {
            "<": "&lt;",
            ">": "&gt;",
            '&': "&amp;",
            '"': "&quot;",
            "'": "&apos;",
        };
        const keysMnem = Object.keys(mnemonics);
        return str.split('').reduce((acc, curr) => `${acc}${keysMnem.includes(curr) ? mnemonics[curr] : curr }`,'');
    };
    return (text, attr = {}) => {
       text = replacer(text);
       attr = Object.entries(attr).reduce((acc, [k, v]) => `${acc} ${k}='${replacer(v)}'`, '');
       return `<${tag}${attr}>${text}</${tag}>`;
    };
}



(function tests() {
    const wrapP = buildWrapper("P");
    console.group("ОЖИДАЕМ: " + "<P>Однажды в студёную зимнюю пору</P>");
    console.log("ПОЛУЧАЕМ: " + wrapP("Однажды в студёную зимнюю пору") );
    console.groupEnd();
    console.group("ОЖИДАЕМ: " + "<P lang='ru'>Однажды в студёную зимнюю пору</P>");
    console.log("ПОЛУЧАЕМ:" +  wrapP("Однажды в студёную зимнюю пору",{lang:"ru"}) );
    console.groupEnd();
    console.group("ОЖИДАЕМ: " + "<P>Однажды в &lt;студёную&gt; зимнюю пору</P>");
    console.log("ПОЛУЧАЕМ: " +  wrapP("Однажды в <студёную> зимнюю пору") );
    console.groupEnd();
    const wrapH1 = buildWrapper("H1");
    console.group("ОЖИДАЕМ: " + "<H1 align='center' title='M&amp;M&apos;s'>СТИХИ</H1>");
    console.log("ПОЛУЧАЕМ: " +  wrapH1("СТИХИ",{align:"center",title:"M&M's"}) );
})();
