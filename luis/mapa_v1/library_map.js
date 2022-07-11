//Esta funcion toma una url publica y devuelve un objeto con los datos geograficos
function getData(urlData) {
    let rawData;
    $.get({
        url: urlData,
        /*
        error: function(xhr, statusText){
            console.log(xhr);
            console.log("Error: "+statusText);
        },
        */
        success: function (data, status) {
            rawData = data;
        },        
        async: false
    });
    if(rawData){
        return JSON.parse(rawData);
    }
    else{
        return null;
    }    
}
//Esta funcion recibe el parametro CUT_COM de la url y devuelve el codigo
function getComuna(){
    const valores = window.location.search;
    //Creamos la instancia
    const urlParams = new URLSearchParams(valores);
    //Accedemos a los valores
    let codigo_comuna = urlParams.get('CUT_COM');
    codigo_comuna = codigo_comuna?codigo_comuna:"13101"; 
    codigo_comuna = codigo_comuna.length == 5? codigo_comuna:  `0${codigo_comuna}`;
    return codigo_comuna;
}
//
class SHAPE_CAPA {
    constructor(nombre, url) {
      this.nombre = nombre;
      this.url = url;
      this.data = getData(url);
      this.shape = L.geoJson(this.data)    
    }
}