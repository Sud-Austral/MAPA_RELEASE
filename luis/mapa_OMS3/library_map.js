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
    codigo_comuna = parseInt(codigo_comuna);
    return `${codigo_comuna}`;
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
let colores = [ '#E59866','#D35400','#A04000','#6E2C00'] //,'#884EA0']
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
    //console.log(feature)

}

class SHAPE_CAPA {
    constructor(nombre, url, funcionEstilo) {
      this.nombre = nombre;
      this.url = url;
      this.data = getData(url);
      if(this.data){
        console.log("paso",this.data)
        this.data["features"] = this.data["features"].slice(0,200);
      }
       
      //this.data["features"] = this.data["features"].slice(0,10);
      
      this.shape = L.geoJson(this.data,{style:funcionEstilo,onEachFeature: onEachFeature2}) //.addTo(map);  
      this.nombreCSS = `<span class="letrasControl"> ${this.nombre} </span>`  
    }
}

