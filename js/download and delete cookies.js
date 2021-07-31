/* cambiar etiqueta
var element = document.getElementById("93");
element.outerHTML = element.outerHTML.replace(/wns/g,"lmn");
*/
//descargar archivo
function descargar(nombre, datos){
    var dataStr = "data:text/plain;charset=utf-8," + datos;
    var a = document.createElement('a');
    a.setAttribute("href",     dataStr);
    a.setAttribute("download", nombre + ".html");
    //document.body.appendChild(a); // para firefox
    a.click();
    a.remove();
}
// input.select();
// document.execCommand('copy');
// descargar("aaaaa", window.localStorage.getItem('texto'));
function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}