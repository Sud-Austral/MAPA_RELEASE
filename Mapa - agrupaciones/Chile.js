//console.log(producto);
const cuerposagua = getData("https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/AGUAS/CUERPOS/cuerpos_agua_09201.geojson");


//PopUp automatico

function getStringHTML2(feature, nombreCapa) {
    let htmlString = "<b><center> " + nombreCapa + "</b> : "  + feature.properties[nombreCapa] + " </center>";
    return htmlString;
}
/*function popup(feature,layer){
   
}*/

//Agregar interracion del puntero con la capa RESALTA EL OBJETO
function highlightFeature(e){
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: "#666",
        dashArray: '',
        fillOpacity: 0.1
    });

    info.update(layer.feature.properties)
}

//Configurar los cambios de resaltado y zoom de la capa

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
function onEachFeature(feature, layer){
    try {
        let htmlString = Object.keys(feature.properties).map(element => getStringHTML2(feature, element)).toString();
        htmlString = htmlString.replaceAll(",", "")
        htmlString = htmlString + 
        "</div><center><img class='banner2' src='https://raw.githubusercontent.com/Sud-Austral/mapa_glaciares/main/img/logo_DataIntelligence_normal.png' alt='Data Intelligence'/></center>";
        //console.log(lista)
        layer.bindPopup("<div class='parrafo_popup'>" + htmlString + "</div>", customOptions);

    } catch (e) {
        console.error(error);
        //layer.bindPopup("Sin Información", customOptions);

    }
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature,
    })
}

// Agregar capa en formato GeoJason
//L.geoJson(cuerposagua).addTo(map);
var chileJS = L.geoJson(chile,{
    onEachFeature: onEachFeature
}).addTo(map);

var cuerposaguaJS2 = L.geoJson(cuerposagua,{
    onEachFeature: onEachFeature
}) //.addTo(map);

let nombreComuna = chile["features"][0]["properties"]["COMUNA"]; 
nombreComuna = `<span id="comunaID"> ${nombreComuna} </span>`;
// Aquí se agregan las capas al menu
var overlayMapsRegiones = {            
   //"Cuerpos de agua": cuerposaguaJS2,
   //nombreComuna : chileJS
};
overlayMapsRegiones[nombreComuna] = chileJS;
        
       
var capas_base = {"Mapa claro":base, "Mapa Oscuro":base2, "Mapa Satelital":base3}
//var capas_base = {'<span class="letrasControl"> Mapa claro </span>':base, "Mapa Oscuro":base2, "Mapa Satelital":base3}
//capasData.overlayMaps

var capaRegiones3 = L.control.layers(null, overlayMapsRegiones, {
    position: 'topleft', // 'topleft', 'bottomleft', 'bottomright'
    collapsed: false // true
}).addTo(map);

 // Para centrar en el objeto que uno quiera. Las 4
 map.fitBounds(chileJS.getBounds());
 let zoom = map.getZoom();
 let zoomMin = 10
 map.setZoom(zoom > zoomMin ? zoomMin : zoom);


//$(".leaflet-control-layers-selector").addClass( "form-check-input" );
$("#comunaID").parent().parent().addClass( "test" );
//$("#comunaID").parent().parent().addClass("comunaID");
$("#comunaID").parent().parent().parent().parent().parent().parent().css( "background", "black");

$(window).ready(function() {
    let capasData = new CAPAS_AGUA(codigo_comuna);
    var capaRegiones2 = L.control.layers(capas_base, capasData.overlayMaps, {
        position: 'topright', // 'topleft', 'bottomleft', 'bottomright'
        collapsed:  true
    }).addTo(map);
    $(".loader").fadeOut("slow");
});
