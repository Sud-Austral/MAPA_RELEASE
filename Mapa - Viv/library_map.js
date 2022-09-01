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
//Esta funcion trae la información para los PopUp
function getStringHTML3(feature, nombreCapa) {
    let htmlString = "<b><center> " + nombreCapa + "</b> : "  + feature.properties[nombreCapa] + " </center>";
    return htmlString;
}
//Iluminación del objeto cuando se pasa sobre el
function highlightFeature(e){
    var layer = e.target;
    layer.setStyle({
        weight: 5,
        color: "#C6D9AF",
        dashArray: '',
        fillOpacity: 0.2
    });
    info.update(layer.feature.properties)
}
function resetHighlight(e){
    let keysparent = Object.keys(e.sourceTarget._eventParents);
    console.log(keysparent)
    e.sourceTarget._eventParents[keysparent].resetStyle(e.target)
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
        layer.bindPopup("<div class='parrafo_popup'>" + htmlString + "</div>", customOptions);

    } catch (e) {
        console.error(e);
    }
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature,
    })
}

function onEachFeature3(feature, layer){
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
}
/*  Iconos para los POINTS */
var iconoUno = L.icon({
    iconUrl: 'https://github.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/raw/main/AGUAS/Iconos/alfiler6.png',
    //shadowUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Coat_of_arms_of_Los_Lagos_Region%2C_Chile.svg',

    iconSize: [25, 31], // size of the icon
    //shadowSize: [50, 64], // size of the shadow
    //iconAnchor: [82.5, 120], // point of the icon which will correspond to marker's location
    //shadowAnchor: [4, 62],  // the same for the shadow
    //popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var iconoDos = L.icon({
    iconUrl: 'https://github.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/raw/main/AGUAS/Iconos/Solido1.png',
    iconSize: [25, 31], // size of the icon
});
var iconoTres = L.icon({
    iconUrl: 'https://github.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/raw/main/AGUAS/Iconos/centroB1.png',
    iconSize: [25, 31], // size of the icon
});
var iconoCuatro = L.icon({
    iconUrl: 'https://github.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/raw/main/AGUAS/Iconos/centroN7.png',
    iconSize: [25, 31], // size of the icon
});
var iconoCinco = L.icon({
    iconUrl: 'https://github.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/raw/main/AGUAS/Iconos/borde3.png',
    iconSize: [25, 31], // size of the icon
});


/* Color a los poligonos */
let colores = [ '#E59866','#D35400','#A04000','#6E2C00']
let contadorColores = 0
function EstiloAcuifero(feature){
    console.log(feature.geometry.type)    
    if(feature.geometry.type == "Polygon"){
        contadorColores++;
        return {"color":colores[contadorColores%4], "fillOpacity":1}  
    }
    if(feature.geometry.type == "MultiPolygon"){
        contadorColores++;
        return {"color":colores[contadorColores%4],"fillOpacity":1}
    }
    else{
        return {"color":"black"}
    }
}

class SHAPE_CAPA {
    constructor(nombre, url, funcionEstilo, pointToLayer) {
      this.nombre = nombre;
      this.url = url;
      this.data = getData(url);
      
      this.nombreCSS = `<span class="letrasControl"> ${this.nombre} </span>`
      if (this.data && this.data.features[0].geometry.type == "Point"){
        this.shape = L.geoJson(this.data,{style:funcionEstilo,onEachFeature: onEachFeature3, pointToLayer: pointToLayer}) //.addTo(map);  
        var markers = L.markerClusterGroup();
        markers.addLayer(this.shape);
        this.shape = markers;
      }  
      else{
        this.shape = L.geoJson(this.data,{style:funcionEstilo,onEachFeature: onEachFeature2, pointToLayer: pointToLayer}) //.addTo(map);  
      }
      
    }
}
function setIcon (feature) {
    let coordenadas = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];
    //console.log(feature.geometry.coordinates);
    return new L.marker(coordenadas, { icon: iconoUno });
}

function setIconDos (feature) {
    let coordenadas = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];
    //console.log(feature.geometry.coordinates);
    return new L.marker(coordenadas, { icon: iconoDos });
}

function setIconTres (feature) {
    let coordenadas = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];
    //console.log(feature.geometry.coordinates);
    return new L.marker(coordenadas, { icon: iconoTres });
}

function setIconCuatro (feature) {
    let coordenadas = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];
    //console.log(feature.geometry.coordinates);
    return new L.marker(coordenadas, { icon: iconoCuatro });
}
function setIconCinco (feature) {
    let coordenadas = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];
    //console.log(feature.geometry.coordinates);
    return new L.marker(coordenadas, { icon: iconoCinco });
}
