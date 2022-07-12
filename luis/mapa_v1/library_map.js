const customOptions =
        {
            'className': 'custom'
        }

//Esta funcion toma una url publica y devuelve un objeto con los datos geograficos
function getData(urlData) {
    let rawData;
    $.get({
        url: urlData,        
        //error: function(xhr, statusText){
        error: function(){    
            console.log(urlData);
        },        
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
function getStringHTML3(feature, nombreCapa) {
    let htmlString = "<b><center> " + nombreCapa + "</b> : "  + feature.properties[nombreCapa] + " </center>";
    return htmlString;
}

function highlightFeature(e){
    var layer = e.target;
    layer.setStyle({
        weight: 5,
        color: "#666",
        dashArray: '',
        fillOpacity: 0.7
    });
    info.update(layer.feature.properties)
}
function resetHighlight(e){
//    console.log("this",this);
    //console.log("e",e.sourceTarget._eventParents["45"]);
    let keysparent = Object.keys(e.sourceTarget._eventParents);
    console.log(keysparent)
    e.sourceTarget._eventParents[keysparent].resetStyle(e.target)
    //chileJS.resetStyle(e.target);
    info.update();
}
function zoomToFeature(e){
    map.fitBounds(e.target.getBounds());
}

function onEachFeature2(feature, layer){
    try {
        let htmlString = Object.keys(feature.properties).map(element => getStringHTML3(feature, element)).toString();
        htmlString = htmlString.replaceAll(",", "")
        htmlString = htmlString + 
        "</div><center><img class='banner2' src='https://raw.githubusercontent.com/Sud-Austral/mapa_glaciares/main/img/logo_DataIntelligence_normal.png' alt='Data Intelligence'/></center>";
        //console.log(lista)
        layer.bindPopup("<div class='parrafo_popup'>" + htmlString + "</div>", customOptions);

    } catch (e) {
        console.error(e);
        //layer.bindPopup("Sin Información", customOptions);
    }
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature,
    })
}


class SHAPE_CAPA {
    constructor(nombre, url) {
      this.nombre = nombre;
      this.url = url;
      this.data = getData(url);
      this.shape = L.geoJson(this.data,{onEachFeature: onEachFeature2}) //.addTo(map);  
      this.nombreCSS = `<span class="letrasControl"> ${this.nombre} </span>`  
    }
}

