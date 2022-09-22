//Mapa de Leaflet
let map = L.map("mapid",{
    minZoom: 0,
    maxZoom: 18,
    zoomSnap: 0,
    zoomDelta: 0.25
}).setView([-33.458725187656356, -70.66008634501547],10);

$(window).ready(function() {
    //$(".loader").fadeOut("slow");
    $("#comunaID").parent().parent().parent().parent().parent().parent().css( "background", "black");  
});

function getLayerMapBox(id){
    const base = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: id,
        tileSize: 512,
        zoomOffset: -1
    });
    return base;
}

function getMapaBase(){
    const objetos = {
        "Mapa claro":               getLayerMapBox("mapbox/streets-v11"),
        "Mapa Oscuro":              getLayerMapBox("mapbox/dark-v9"),
        "Mapa Satelital":           getLayerMapBox("mapbox/satellite-streets-v9"),
        "Mapa Gris":                getLayerMapBox("mapbox/light-v10"),
        "Navegación Diario":        getLayerMapBox("mapbox/navigation-day-v1"),
        "Navegación nocturna":      getLayerMapBox("mapbox/navigation-night-v1"),
        "HEREv3_satelliteDay":      L.tileLayer.provider('HEREv3.normalDayCustom', {apiKey: 'SjU6SSxb2QKvye8tQtgvPnCmX-TbmwtTtJol3gz57iI'}),
        "HEREv3_pedestrianNight":   L.tileLayer.provider('HEREv3.pedestrianNight', {apiKey: 'SjU6SSxb2QKvye8tQtgvPnCmX-TbmwtTtJol3gz57iI'}),
        "HEREv3_pedestrianDay":     L.tileLayer.provider('HEREv3.pedestrianDay', {apiKey: 'SjU6SSxb2QKvye8tQtgvPnCmX-TbmwtTtJol3gz57iI'}),
        "HEREv3_reduceDay":         L.tileLayer.provider('HEREv3.reducedDay', {apiKey: 'SjU6SSxb2QKvye8tQtgvPnCmX-TbmwtTtJol3gz57iI'}),
        "HEREv3_normalNight":       L.tileLayer.provider('HEREv3.normalNight', {apiKey: 'SjU6SSxb2QKvye8tQtgvPnCmX-TbmwtTtJol3gz57iI'}),
        "HEREv3_normalDayMobile":   L.tileLayer.provider('HEREv3.normalDayMobile', {apiKey: 'SjU6SSxb2QKvye8tQtgvPnCmX-TbmwtTtJol3gz57iI'}),
        "HEREv3_normalDayGrey":     L.tileLayer.provider('HEREv3.normalDayGrey', {apiKey: 'SjU6SSxb2QKvye8tQtgvPnCmX-TbmwtTtJol3gz57iI'})
    }
    return objetos;
}

const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replaceAll(" ","")
    .replaceAll(":","")
    .replace(/[^a-zA-Z0-9 ]/g, "");
} 

iconosDB = iconosDB.map( x =>{
    x.replaceAll("https://github","https://raw.githubusercontent")
    .replaceAll("/DATA_MAPA_PUBLIC_V2/raw","/DATA_MAPA_PUBLIC_V2")});

function getIcon(url){
    url = url?url:"https://github.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/raw/main/svg/default.png";
    let myIcon;
    if(url.split(".")[1] == "svg"){
        myIcon = L.icon({
            iconUrl: url,
            iconSize:  [50,50]   //[25, 25] // width and height of the image in pixels
            });
    }
    else{
        myIcon = L.icon({
            iconUrl: url,
            iconSize:  [25,25]   //[25, 25] // width and height of the image in pixels
            });
    }
    return myIcon;
}

/*
this.controlTotalCapas2 = L.control.layers(null, this.jsonTotalCapas, {
    position: 'topright',
    collapsed:  true
}).addTo(map);

addOverlay( <ILayer> layer, <String> name )
*/