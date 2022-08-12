const codigo_comuna = getComuna();
let map = L.map("mapid").setView([-33.458725187656356, -70.66008634501547],10);
class CAPAS_AGUA{
    constructor(cod_com){
        cod_com = cod_com? cod_com:codigo_comuna;
        var urlGitHub = "https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/";
        this.capas_ref = [
            ["Red Hidrica",
            `${urlGitHub}AGUAS_V2/red_hidrica/${cod_com}.json`],
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
            `${urlGitHub}AGUAS_V2/acuifero/${cod_com}.json`,EstiloAcuifero],
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
            ["Zonas Homogéneas",
            `${urlGitHub}AGUAS_V2/zonas_homogeneas/${cod_com}.json`],
            ["Red calidad Agua",
            `${urlGitHub}AGUAS_V2/calidad_de_aguas/${cod_com}.json`],
            ["Estaciones Glaciologicas",
            `${urlGitHub}AGUAS_V2/estaciones_glaciologicas/${cod_com}.json`],
            ["Fluviometrica",
            `${urlGitHub}AGUAS_V2/fluviometricas/${cod_com}.json`],            
            ["Glaciar",
            `${urlGitHub}AGUAS_V2/glaciar/${cod_com}.json`],
            ["Lagos y embalses",
            `${urlGitHub}AGUAS_V2/lago_embalse/${cod_com}.json`],
            ["Meteorologicas",
            `${urlGitHub}AGUAS_V2/meteorologica/${cod_com}.json`],
            ["Niveles de Pozos",
            `${urlGitHub}AGUAS_V2/niveles_de_pozos/${cod_com}.json`],
            ["Rutas de Nieve",
            `${urlGitHub}AGUAS_V2/rutas_de_nieve/${cod_com}.json`],
            ["Sedimentometricas",
            `${urlGitHub}AGUAS_V2/sedimentometricas/${cod_com}.json`],
            ["AR ZP mayo 2022",
            `${urlGitHub}AGUAS_V2/ar_zp_mayo2022/${cod_com}.json`],
            ["Declaraciones de Agotamiento",
            `${urlGitHub}AGUAS_V2/declaraciones_de_agotamiento/${cod_com}.json`],
            ["Acuiferos Protegidos I_II_XV",
            `${urlGitHub}AGUAS_V2/acuiferos_protegidos_I_II_XV/${cod_com}.json`],
            ["Acuiferos Protegidos I_II_XV",
            `${urlGitHub}AGUAS_V2/acuiferos_protegidos_I_II_XV/${cod_com}.json`],
            ["Vegas protegidas",
            `${urlGitHub}AGUAS_V2/vegas_protegidas_I_II_XV_sep2010/${cod_com}.json`],
        ]
        //Pausa
        this.overlayMaps = {};
        this.capas = this.capas_ref.map(x => //function(x){
            {
                let shape_capa;
                try {
                    shape_capa = new SHAPE_CAPA2(x[0],x[1],x[2]);
                } catch (error) {
                    shape_capa = new SHAPE_CAPA2(x[0],x[1]);
                }
                //Pausa
                if(shape_capa.data){
                    this.overlayMaps[shape_capa.nombreCSS] = shape_capa.shape;
                }
                //{"Acuifero":shape_acuifero}
                //
                return shape_capa;
            }
        );
        
    }
}

let capasData = new CAPAS_AGUA(codigo_comuna);




// Construye la url a partir del CUT_COM
let urlBase = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/chile_comunas/${codigo_comuna}.json`;
//console.log(urlBase)
//Se lee la comuna deseada
//const chile = getData("https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/Chile/Comunas_Chile_2020_GCS.json");
const chile = getData(urlBase)
//chile.features= chile.features.filter (x=>x.properties.CUT_COM == "09201")
//let comunas_filtro = ["09101","09102","09103","09104","09201","09202","09203","09204","10301","10302","10303","10304"];
//chile.features = chile.features.filter(x => comunas_filtro.indexOf(x.properties.CUT_COM)> -1);
// coordenadas y luego de la coma el zoom inicial que queremos.



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

