// coordenadas y luego de la coma el zoom inicial que queremos.
let map = L.map("map1").setView([-33.458725187656356, -70.66008634501547],10);

//El mapa a utilizar y los valores correspondientes a este.
var base = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

//PopUp automatico
const customOptions =
        {
            'className': 'custom'
        }
function getStringHTML2(feature, nombreCapa) {
    let htmlString = "<b><center> " + nombreCapa + "</b> : "  + feature.properties[nombreCapa] + " </center>";
    return htmlString;
}
/*function popup(feature,layer){
   
}*/


//Simplificar el feature tomando solo la variable SUPERFICIE.
//map aplica la funcion a todos los elementos
let SUPERFICIE = chile.features.map(x => x.properties.SUPERFICIE);
let maximo = SUPERFICIE.reduce((x,y) => Math.max(x,y));
let minimo = SUPERFICIE.reduce((x,y) => Math.min(x,y));

let intervalo = (maximo - minimo)/5;
//Color de acuerdo al Intervalo
function getColor(d){
    return d < minimo + 1*intervalo ? '#F6DDCC' :
           d < minimo + 2*intervalo ? '#E59866' :
           d < minimo + 3*intervalo ? '#D35400' :
           d < minimo + 4*intervalo ? '#A04000' :
           d > minimo + 4*intervalo ? '#6E2C00':
                                       '#884EA0';

}

//funcion para mostrar la simbologia (rango de color)
function style(feature){
    console.log(feature.properties.SUPERFICIE);
    return{
        fillColor: getColor(feature.properties.SUPERFICIE),
        weight: 2,
        Opacity: 0.3,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    }
}

//Agregar interracion del puntero con la capa RESALTA EL OBJETO
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

//Configurar los cambios de resaltado y zoom de la capa
var chileJS;

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
    style: style,
    onEachFeature: onEachFeature
    
}).addTo(map);

var cuerposaguaJS2 = L.geoJson(cuerposagua,{
    onEachFeature: onEachFeature
}).addTo(map);

// Aquí se agregan las capas al menu
var overlayMapsRegiones = {            
   "Cuerpos de agua": cuerposaguaJS2,
   "Comunas 09": chileJS
};

        // MAPA BASE 2
        var base2 = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox/dark-v9',
            tileSize: 512,
            zoomOffset: -1
        });

        // MAPA BASE 3
        var base3 = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox/satellite-streets-v9',
            tileSize: 512,
            zoomOffset: -1
        });
        //Funcion para los botones inferiores, cambiar mapa
        $(document).ready(function() {
            $('.op1').on('click', function(){
                base2.remove();
                base3.remove();
                base.addTo(map);
            });
            $('.op2').on('click', function(){
                base.remove();
                base3.remove();
                base2.addTo(map);
            });
            $('.op3').on('click', function(){
                base.remove();
                base2.remove();
                base3.remove();
                base3.addTo(map);
            });
        });
        
        var capas_base = {"Mapa claro":base, "Mapa Oscuro":base2, "Mapa Satelital":base3}

        var capaRegiones2 = L.control.layers(capas_base, overlayMapsRegiones, {
            position: 'topright', // 'topleft', 'bottomleft', 'bottomright'
            collapsed: false // true
        }).addTo(map);


 // Para centrar en el objeto que uno quiera. Las 4
 map.fitBounds(chileJS.getBounds());
 let zoom = map.getZoom();
 let zoomMin = 10
 map.setZoom(zoom > zoomMin ? zoomMin : zoom);