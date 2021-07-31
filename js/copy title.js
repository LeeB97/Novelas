'use strict';

let titulo = ".main-title";
let texto = ".text-formatting";
let etiquetas = ["DIV","SCRIPT","A","STYLE","INS","HR"];
let palabras = ["Translator:","Editor:"];


let txtTitulo = document.createElement('p');
txtTitulo.innerText = document.querySelector(titulo).innerText;

let div = document.querySelector(texto);
div.insertBefore(txtTitulo, div.firstElementChild);

if(div != undefined) {

    let len = div.children.length;
    
    for(let i = 0; i < len; ++i) {
        if(div.children[i] == undefined) continue;
        etiquetas.forEach(e => {
            if(div.children[i].tagName === e) {
                div.children[i].innerHTML = "";
                div.removeChild(div.children[i]);
                --i;
        }});
        palabras.forEach(p => {
            if(div.children[i].textContent.includes(p)) {
                div.children[i].innerHTML = "";
                div.removeChild(div.children[i]);
                --i;
        }});
    }

    let a = div.lastElementChild.lastElementChild;
    div.removeChild(div.lastElementChild);

    let p = document.createElement('p');
    p.innerText = "...";
    div.appendChild(p);

    let cat = window.localStorage.getItem('texto');

    if(cat === null) {
        window.localStorage.setItem('texto', div.innerHTML);
    } else {
        window.localStorage.setItem('texto', cat + div.innerHTML);
    }

    a.click()

} else {
    console.error("Pueba otra clase");
}
