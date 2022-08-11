//Mapa de Leaflet
let map = L.map("mapid").setView([-33.458725187656356, -70.66008634501547],10);

function getMapaBase(){
    const base = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,    
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
    });
    // MAPA BASE 2
    const base2 = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/dark-v9',
        tileSize: 512,
        zoomOffset: -1
    });
    // MAPA BASE 3
    const base3 = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/satellite-streets-v9',
        tileSize: 512,
        zoomOffset: -1
    });
    return {"Mapa claro":base, "Mapa Oscuro":base2, "Mapa Satelital":base3};
}

class COMUNABASE{
    constructor(){
        //Mapas Bases de MapBox
        this.mapasBases = getMapaBase();
        //Set Primer mapas base al mapa Leaflet
        this.mapasBases["Mapa claro"].addTo(map);
        //Obtener Comuna
        this.codigo_comuna = getComuna();
        //URL de los datos de Comuna
        this.urlBaseComuna = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/chile_comunas/${this.codigo_comuna}.json`;
        //Get Data de Comuna
        this.dataBaseComuna = getData(this.urlBaseComuna);
        //Get Shape de Comuna
        this.shapeBaseComuna = L.geoJson(this.dataBaseComuna,{
            style: style,
            onEachFeature: onEachFeature            
        }).addTo(map);
        let nombreComuna = this.dataBaseComuna["features"][0]["properties"]["COMUNA"];
        nombreComuna = `<span id="comunaID"> ${nombreComuna} </span>`.toString();
        this.jsonComuna = {};
        this.jsonComuna[nombreComuna] = this.shapeBaseComuna;
        this.controlComunaBase = L.control.layers(null, this.jsonComuna, {
            position: 'topleft', // 'topleft', 'bottomleft', 'bottomright'
            collapsed: false // true
        }).addTo(map);
        map.fitBounds(this.shapeBaseComuna.getBounds());
        let zoom = map.getZoom();
        let zoomMin = 10
        map.setZoom(zoom > zoomMin ? zoomMin : zoom);
    }
}

class MAPAGLOBAL{
    constructor(comunaBase){          
        //let comunaBase = new COMUNABASE();    
        this.jsonTotalCapas = {};
        this.dataGlobalNivel1 = dataCapaGlobal.map(capa => {
            capa["urlData"] = `${capa.url.split("?")[0]}${comunaBase.codigo_comuna}.json`;
            capa["data"] = getData(capa["urlData"]);
            return capa;
        }).filter( capa =>
            capa["data"] != null
        );
        this.n = 0;
        this.dataGlobalNivel1.forEach(capa =>{
            let dataGlobalNivel2 = dataGlobal.filter( capaGlobal =>
                capaGlobal.idcapa == capa.idcapa
            );
            let dataGlobalDescripCapaUnique = [...new Set(dataGlobalNivel2
                                    .sort((x,y) => {return x["posición_capa"] - y["posición_capa"]})
                                    .map(x => x.descripcion_capa)
                                    .filter(x => x))];
            let dataGlobalPropiedadesUnique = [... new Set(dataGlobalNivel2.sort( x=> x.posicion_popup).map(x => x.Propiedad))]
            //console.log(dataGlobalPropiedadesUnique)
            let diccionarioNombrePropiedadPopup = {}
            dataGlobalNivel2.forEach(x => diccionarioNombrePropiedadPopup[x.Propiedad] = x["descripcion_pop-up"]);
            function onEachFeatureCustom(feature, layer){
                let htmlString = dataGlobalPropiedadesUnique.map(element => getStringHTML4(feature, element,diccionarioNombrePropiedadPopup[element])).toString();
                htmlString = htmlString.replaceAll(",", "")
                htmlString = htmlString + 
                "</div><center><img class='banner2' src='https://raw.githubusercontent.com/Sud-Austral/mapa_glaciares/main/img/logo_DataIntelligence_normal.png' alt='Data Intelligence'/></center>";
                layer.bindPopup("<div class='parrafo_popup'>" + htmlString + "</div>", customOptions);                
                layer.on({
                    mouseover: highlightFeature,
                    mouseout: resetHighlight,
                    click: zoomToFeature,
                })
            }
            
            dataGlobalDescripCapaUnique.sort(x => x["posición_capa"]).forEach(capaUnica =>{
                let estiloDinamico = null;
                let dataGlobalCapas = dataGlobalNivel2.filter(x => x["descripcion_capa"] == capaUnica);
                if(dataGlobalCapas.length == 1){
                    if(dataGlobalCapas[0]["Variable"] == "default"){
                        console.log("default")    
                    }
                    if(dataGlobalCapas[0]["Variable"] == "random"){
                        console.log(capaUnica,"random") 
                        estiloDinamico = (feature) => {
                            this.n++;
                            return {"color": "#" + coloresDB[this.n%coloresDB.length]}
                        }    
                    }
                }
                else{
                    console.log("Mira aka",capaUnica)
                    //console.log(dataGlobal)
                    //console.log(dataGlobal.filter(x => x["descripcion_capa"] == capaUnica))
                    let jsonColores = {};
                    let descripcionCapa;
                    dataGlobal.filter(x => x["descripcion_capa"] == capaUnica).forEach( x =>{
                        descripcionCapa = x["Propiedad"];
                        jsonColores[x.Variable] = x.Color
                    });
                    //console.log(jsonColores)
                    estiloDinamico = (feature) =>{
                        console.log(feature.properties)
                        let valuePropertie = feature.properties[descripcionCapa];
                        return {"color":jsonColores[valuePropertie]}
                    }
                    //console.log(capaUnica)
                }
                this.jsonTotalCapas[capaUnica] = L.geoJson(capa["data"],{style:estiloDinamico,onEachFeature: onEachFeatureCustom});
            });
        });        
        this.controlTotalCapas = L.control.layers(comunaBase.mapasBases, this.jsonTotalCapas, {
            position: 'topright',
            collapsed:  true
        }).addTo(map);
        
    }
}

//let detalle = new MAPAGLOBAL();
let comunaBase = new COMUNABASE();