const codigo_comuna = getComuna();

class CAPAS_AGUA{
    constructor(cod_com){
        cod_com = cod_com?cod_com:codigo_comuna;
        var urlGitHub = "https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/";
        this.capas_ref = [
            ["Ruta Hidrologica Lineas",
            `${urlGitHub}AGUAS_V2/ruta_hidrologico_linea/${cod_com}.json`],
            ["Ruta Hidrologica",
            `${urlGitHub}AGUAS_V2/ruta_hidrologico_shape/${cod_com}.json`],
            ["Cuerpo de Agua",
            `${urlGitHub}AGUAS/CUERPOS/cuerpos_agua_${cod_com}.geojson`],
            ["Derecho de Agua",
            `${urlGitHub}AGUAS_V2/derecho_agua/${cod_com}.json`],
            ["Estación Fluvial",
            `${urlGitHub}AGUAS_V2/estacion_fluviometrica/${cod_com}.json`],
            ["Estación Glaciar",
            `${urlGitHub}AGUAS_V2/estacion_glaciar/${cod_com}.json`],
            ["Acuífero",
            `${urlGitHub}AGUAS_V2/acuifero/${cod_com}.json`],
            ["Junta de Vigilancia",
            `${urlGitHub}AGUAS_V2/junta_vigilancia/${cod_com}.json`],
            ["Calidad de Agua",
            `${urlGitHub}AGUAS_V2/indice_calidad_agua/${cod_com}.json`],
            ["BH8 Escorrentia",
            `${urlGitHub}AGUAS_V2/escorrentia/${cod_com}.json`],
            ["BH87 Evaporacion de tanque",
            `${urlGitHub}AGUAS_V2/evaporacion_de_tanque/${cod_com}.json`],
            ["BH87 Evapotranspiracion real",
            `${urlGitHub}AGUAS_V2/evapotranspiracion_real/${cod_com}.json`],
            ["BH87 Evapotranspiracion real zona riego",
            `${urlGitHub}AGUAS_V2/evapotranspiracion_real_zona_riego/${cod_com}.json`],
            ["BH87 Isotermas",
            `${urlGitHub}AGUAS_V2/isotermas/${cod_com}.json`],
            ["BH87 Isoyetas",
            `${urlGitHub}AGUAS_V2/isoyetas/${cod_com}.json`],
            ["Datos de pozos",
            `${urlGitHub}AGUAS_V2/datos_de_pozos/${cod_com}.json`],
            ["Datos hidrográficos",
            `${urlGitHub}AGUAS_V2/datos_hidrogeograficos/${cod_com}.json`],
            ["Geología",
            `${urlGitHub}AGUAS_V2/geologia/${cod_com}.json`],
            ["Información hidrogeologica general",
            `${urlGitHub}AGUAS_V2/informacion_hidrogeologica_general/${cod_com}.json`],
            ["Perfiles Hidrogeologicos Esquematicos",
            `${urlGitHub}AGUAS_V2/perfiles_hidrogeologicos_esquematicos/${cod_com}.json`],
            ["Productividad de Pozos",
            `${urlGitHub}AGUAS_V2/productividad_de_pozos/${cod_com}.json`],
            ["Precipitaciones Máximas Diarias",
            `${urlGitHub}AGUAS_V2/precipitaciones_maximas_diarias/${cod_com}.json`],
        ]
        this.overlayMaps = {};
        this.capas = this.capas_ref.map(x => //function(x){
            {
                let shape_capa = new SHAPE_CAPA(x[0],x[1]);
                if(shape_capa.data){
                    this.overlayMaps[shape_capa.nombre] = shape_capa.shape;
                }
                return shape_capa;
            }
            //console.log(x[0],x[1])
            //let shape_object = new SHAPE_CAPA(x[0],x[1])
        );

    }
}

let capasData = new CAPAS_AGUA(codigo_comuna);
 /*
    "2 Glaciar": getShape("https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/AGUAS/GLACIAR/IPG2022_geograficas.json",
        map,
        true,
        "COMUNA",
        "ANGOL"),
    "25 Precipitaciones Máximas Diarias": getShape("https://raw.githubusercontent.com/lmonsalve22/DATA_MAPA_PUBLIC_V2/main/AGUAS/PUBLICACIONES/precipitacion_max_diaria/precipitaciones_maximas_Diarias.json",
        map,
        true,
        "CUT_COM",
        9201),
    "26 Zonas Homogéneas.": getShape("https://raw.githubusercontent.com/lmonsalve22/DATA_MAPA_PUBLIC_V2/main/AGUAS/PUBLICACIONES/precipitacion_max_diaria/zonas_homogeneas.json",
        map,
        true,
        "CUT_COM",
        9201),
    //https://raw.githubusercontent.com/lmonsalve22/DATA_MAPA_PUBLIC_V2/main/AGUAS/RED_HIDROMETRIA/Calidad_de_Aguas.json
    "27 Calidad Agua": getShape("https://raw.githubusercontent.com/lmonsalve22/DATA_MAPA_PUBLIC_V2/main/AGUAS/RED_HIDROMETRIA/Calidad_de_Aguas.json",
        map,
        true,
        "CUT_COM",
        9201),
    "28 Estaciones Glaciologicas": getShape("https://raw.githubusercontent.com/lmonsalve22/DATA_MAPA_PUBLIC_V2/main/AGUAS/RED_HIDROMETRIA/Estaciones_Glaciologicas.json",
        map,
        true,
        "CUT_COM",
        9201),
    "29 Fluviometrica": getShape("https://raw.githubusercontent.com/lmonsalve22/DATA_MAPA_PUBLIC_V2/main/AGUAS/RED_HIDROMETRIA/Fluviometricas.json",
        map,
        true,
        "CUT_COM",
        9201),
    "30 Lagos y embalses": getShape("https://raw.githubusercontent.com/lmonsalve22/DATA_MAPA_PUBLIC_V2/main/AGUAS/RED_HIDROMETRIA/Lagos_y_Embalses.json",
        map,
        true,
        "CUT_COM",
        9201),
    "31 Meteorologicas": getShape("https://raw.githubusercontent.com/lmonsalve22/DATA_MAPA_PUBLIC_V2/main/AGUAS/RED_HIDROMETRIA/Meteorologicas.json",
        map,
        true,
        "CUT_COM",
        9201),
    "32 Niveles de Pozos": getShape("https://raw.githubusercontent.com/lmonsalve22/DATA_MAPA_PUBLIC_V2/main/AGUAS/RED_HIDROMETRIA/Niveles_de_Pozos.json",
        map,
        true,
        "CUT_COM",
        9201),
    "33 Rutas de Nieve": getShape("https://raw.githubusercontent.com/lmonsalve22/DATA_MAPA_PUBLIC_V2/main/AGUAS/RED_HIDROMETRIA/Rutas_de_Nieve.json",
        map,
        true,
        "CUT_COM",
        9201),
    "34 Sedimentometricas": getShape("https://raw.githubusercontent.com/lmonsalve22/DATA_MAPA_PUBLIC_V2/main/AGUAS/RED_HIDROMETRIA/Sedimentometricas.json",
        map,
        true,
        "CUT_COM",
        9201),
    "35 AR ZP mayo 2022": getShape("https://raw.githubusercontent.com/lmonsalve22/DATA_MAPA_PUBLIC_V2/main/AGUAS/RESTRICCION/AR_ZP_mayo2022.json",
        map,
        true,
        "CUT_COM",
        9201),
    "36 Declaraciones de Agotamiento": getShape("https://raw.githubusercontent.com/lmonsalve22/DATA_MAPA_PUBLIC_V2/main/AGUAS/RESTRICCION/Declaraciones_de_Agotamiento.json",
        map,
        true,
        "CUT_COM",
        9201),
    "37 Acuiferos Protegidos I_II_XV": getShape("https://raw.githubusercontent.com/lmonsalve22/DATA_MAPA_PUBLIC_V2/main/AGUAS/RESTRICCION/acuiferos_protegidos_I_II_XV.json",
        map,
        true,
        "CUT_COM",
        9201),
    "38 Datos de Pozos": getShape("https://raw.githubusercontent.com/lmonsalve22/DATA_MAPA_PUBLIC_V2/main/AGUAS/RESTRICCION/datos_de_pozos.json",
        map,
        true,
        "CUT_COM",
        9201),
    "39 Datos hidrogeograficos 2": getShape("https://raw.githubusercontent.com/lmonsalve22/DATA_MAPA_PUBLIC_V2/main/AGUAS/RESTRICCION/datos_hidrogeograficos.json",
        map,
        true,
        "CUT_COM",
        9201),
    "40 Geologia 2": getShape("https://raw.githubusercontent.com/lmonsalve22/DATA_MAPA_PUBLIC_V2/main/AGUAS/RESTRICCION/geologia.json",
        map,
        true,
        "CUT_COM",
        9201),
    "41 Restricción Información Hidrogeologica General": getShape("https://raw.githubusercontent.com/lmonsalve22/DATA_MAPA_PUBLIC_V2/main/AGUAS/RESTRICCION/informacion_hidrogeologica_general.json",
        map,
        true,
        "CUT_COM",
        9201),
    "42 Perfiles hidrogeologicos esquematicos": getShape("https://raw.githubusercontent.com/lmonsalve22/DATA_MAPA_PUBLIC_V2/main/AGUAS/RESTRICCION/perfiles_hidrogeologicos_esquematicos.json",
        map,
        true,
        "CUT_COM",
        9201),
    "43 Productividad de pozos": getShape("https://raw.githubusercontent.com/lmonsalve22/DATA_MAPA_PUBLIC_V2/main/AGUAS/RESTRICCION/productividad_de_pozos.json",
        map,
        true,
        "CUT_COM",
        9201),
    "44 Vegas protegidas": getShape("https://raw.githubusercontent.com/lmonsalve22/DATA_MAPA_PUBLIC_V2/main/AGUAS/RESTRICCION/vegas_protegidas_I_II_XV_sep2010.json",
        map,
        true,
        "CUT_COM",
        9201)
*/




// Construye la url a partir del CUT_COM
let urlBase = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/chile_comunas/${codigo_comuna}.json`;
//console.log(urlBase)
//Se lee la comuna deseada
//const chile = getData("https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/Chile/Comunas_Chile_2020_GCS.json");
const chile = getData(urlBase)
//chile.features= chile.features.filter (x=>x.properties.CUT_COM == "09201")
let comunas_filtro = ["09101","09102","09103","09104","09201","09202","09203","09204","10301","10302","10303","10304"];
//chile.features = chile.features.filter(x => comunas_filtro.indexOf(x.properties.CUT_COM)> -1);
// coordenadas y luego de la coma el zoom inicial que queremos.

let map = L.map("mapid").setView([-33.458725187656356, -70.66008634501547],10);

//El mapa a utilizar y los valores correspondientes a este.
var base = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,    
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

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