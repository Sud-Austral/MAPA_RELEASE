const codigo_comuna = getComuna();
let map = L.map("mapid").setView([-33.458725187656356, -70.66008634501547],10);
class CAPAS_AGUA{
    constructor(cod_com){
        cod_com = cod_com? cod_com:codigo_comuna;
        //https://raw.githubusercontent.com/Sud-Austral/mapa_insumos/main/OSM/
        var urlGitHub = "https://raw.githubusercontent.com/Sud-Austral/mapa_insumos/main/OSM/";
        this.capas_ref = [
            ["Flujo de agua",
            `${urlGitHub}OSM_flujos_de_agua/${cod_com}.json`],
            //["8 Capas",
            //`${urlGitHub}OSM_poligonos_8_capas/${cod_com}.json`],
            ["Edificios",
            `${urlGitHub}OSM_poligonos_edificios/${cod_com}.json`],
            //["6 Capas",
            //`${urlGitHub}OSM_puntos_6_capas/${cod_com}.json`],
            ["Red Ferrocarril",
            `${urlGitHub}OSM_red_ferrocarril/${cod_com}.json`],
            ["Red vial",
            `${urlGitHub}OSM_red_vial/${cod_com}.json`],            
        ]
        //Pausa
        this.overlayMaps = {};
        this.capas = this.capas_ref.map(x => //function(x){
            {
                let shape_capa;
                try {
                    shape_capa = new SHAPE_CAPA(x[0],x[1],x[2]);
                } catch (error) {
                    shape_capa = new SHAPE_CAPA(x[0],x[1]);
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
var urlGitHub = "https://raw.githubusercontent.com/Sud-Austral/mapa_insumos/main/OSM/";
//Aqui 8 Capas
let data_capas = getData(`${urlGitHub}OSM_poligonos_8_capas/${codigo_comuna}.json`);
let codigo8capas = data_capas["features"].map(x => x["properties"]["Clase_sp"]);
const dataArr = new Set(codigo8capas);
let codigo8capasUnique = [...dataArr];
codigo8capasUnique = codigo8capasUnique;
codigo8capasUnique.sort().forEach(x => {
        let data_filtrado = Object.assign({} , data_capas);//data_capas;
        data_filtrado["features"] = data_filtrado["features"].filter(y =>
                y["properties"]["Clase_sp"] == x
            );
        //console.log("Codigo",x,"Cantidad",data_filtrado["features"].length)
        if(data_filtrado["features"].length > 0){
            let shape_8capas = L.geoJson(data_filtrado);
            capasData["overlayMaps"][`${x}`] = shape_8capas;
        }        
    });
//Aqui 6 capas
let data_capas2 = getData(`${urlGitHub}OSM_puntos_6_capas/${codigo_comuna}.json`);
let codigo6capas = data_capas2["features"].map(x => x["properties"]["Clase_sp"]);
const dataArr2 = new Set(codigo6capas);
let codigo6capasUnique = [...dataArr2];
codigo6capasUnique = codigo6capasUnique;
codigo6capasUnique.sort().forEach(x => {
        let data_filtrado = Object.assign({} , data_capas2);//data_capas;
        data_filtrado["features"] = data_filtrado["features"].filter(y =>
                y["properties"]["Clase_sp"] == x
            );
        //console.log("Codigo",x,"Cantidad",data_filtrado["features"].length)
        if(data_filtrado["features"].length > 0){
            let shape_6capas = L.geoJson(data_filtrado,{onEachFeature: onEachFeature2});
            capasData["overlayMaps"][`${x}`] = shape_6capas;
        }        
    });



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

