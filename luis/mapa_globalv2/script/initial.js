//Mapa de Leaflet
let map = L.map("mapid").setView([-33.458725187656356, -70.66008634501547],10);
//dataGlobal = dataGlobal.filter(x => x["descripcion_capa"] == "Derechos Agua: Uso");
//https://github                .com/Sud-Austral/DATA_MAPA_PUBLIC_V2/raw/main/AGUAS/Iconos/solido1.png
//https://raw.githubusercontent .com/Sud-Austral/DATA_MAPA_PUBLIC_V2    /main/AGUAS/Iconos/Solido1.png

iconosDB = iconosDB.map( x => 
    x.replaceAll("https://github","https://raw.githubusercontent")
    .replaceAll("/DATA_MAPA_PUBLIC_V2/raw","/DATA_MAPA_PUBLIC_V2"));

function getIcon(url){
    /*
    if(!url){
        console.log("url",url);
    }
    */
    let myIcon = L.icon({
        iconUrl: url,
        iconSize:     [25, 25] // width and height of the image in pixels
        });
    return myIcon;
}

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
        //console.log("capaData",this.dataGlobalNivel1)
        this.ContadorColores = 0;
        this.ContadorIconos = 0;
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
            //console.log(capa,capa["data"]["features"][0]["geometry"]["type"])
            let tipoGeometria = capa["data"]["features"][0]["geometry"]["type"];
            //console.log(tipoGeometria)
            dataGlobalDescripCapaUnique.sort(x => x["posición_capa"]).forEach(capaUnica =>{
                let estiloDinamico = null;
                let dataGlobalCapas = dataGlobalNivel2.filter(x => x["descripcion_capa"] == capaUnica);
                if(tipoGeometria == "Point"){
                    let setIcon = (feature, latlng) => {
                        let myIcon =  getIcon("https://github.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/raw/main/AGUAS/icono/gotaazules08.png");
                        return L.marker(latlng, { icon: myIcon });
                    }
                    
                    if(dataGlobalCapas.length == 1){
                        if(dataGlobalCapas[0]["Variable"] == "default"){
                            console.log("punto default")    
                        }
                        if(dataGlobalCapas[0]["Variable"] == "random"){
                            console.log("punto random")
                            let nameProperties = dataGlobal.filter(x => x["descripcion_capa"] == capaUnica)[0]["Propiedad"];
                            let propertiesUniques = [... new Set(capa["data"]["features"].map(x => x["properties"][nameProperties]))];
                            let jsonIconosRandom = {}; 
                            propertiesUniques.forEach(x =>{
                                this.ContadorIconos++;
                                jsonIconosRandom[x] = getIcon(iconosDB[this.ContadorIconos%iconosDB.length]);
                            });                          
                            setIcon = (feature, latlng) => {
                                
                                let descripcionCapa = feature.properties[nameProperties];
                                let myIcon = jsonIconosRandom[descripcionCapa];
                                return L.marker(latlng, { icon: myIcon });
                            }
                        }
                    }
                    else{
                        console.log("aki")
                        let jsonColores = {};
                        let descripcionCapa;
                        dataGlobal.filter(x => x["descripcion_capa"] == capaUnica).forEach( x =>{
                            descripcionCapa = x["Propiedad"];
                            x.Variable = x.Variable?x.Variable:"";
                            jsonColores[x.Variable] = x.url_icono
                        });   
                        //jsonColores[null] = "https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/AGUAS/Iconos/Solido1.png";
                        console.log(capaUnica,jsonColores)  
                        //console.log("datos",capa["data"])  
                        //console.log("filtro",dataGlobal.filter(x => x["descripcion_capa"] == capaUnica))                 
                        setIcon = (feature, latlng) =>{
                            let valorCapa = feature.properties[descripcionCapa];
                            let myIcon;
                            try {
                                myIcon = getIcon(jsonColores[valorCapa]); 
                                return L.marker(latlng, { icon: myIcon });   
                            } catch (error) {
                                myIcon = getIcon("https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/AGUAS/Iconos/Solido1.png");
                                return L.marker(latlng, { icon: myIcon });
                            }
                        }
                        funciontest = setIcon; 
                    }                    
                    this.jsonTotalCapas[capaUnica] = L.geoJson(capa["data"],{onEachFeature: onEachFeatureCustom,pointToLayer: setIcon});
                }
                else{
                    if(dataGlobalCapas.length == 1){
                        if(dataGlobalCapas[0]["Variable"] == "default"){
                            console.log("poligono default")    
                        }
                        if(dataGlobalCapas[0]["Variable"] == "random"){
                            let nameProperties = dataGlobal.filter(x => x["descripcion_capa"] == capaUnica)[0]["Propiedad"];
                            let propertiesUniques = [... new Set(capa["data"]["features"].map(x => x["properties"][nameProperties]))];
                            let jsonColoresRandom = {};                            
                            propertiesUniques.forEach(x =>{
                                this.ContadorColores++;
                                jsonColoresRandom[x] = "#" + coloresDB[this.ContadorColores%coloresDB.length]
                                });
                            estiloDinamico = (feature) => {
                                let descripcionCapa = feature.properties[nameProperties];
                                return {"color":jsonColoresRandom[descripcionCapa]}
                            }
                        }
                    }
                    else{
                        //console.log("Mira aka",capaUnica)
                        //console.log(dataGlobal)
                        //console.log(dataGlobal.filter(x => x["descripcion_capa"] == capaUnica))
                        let jsonColores = {};
                        let descripcionCapa;
                        dataGlobal.filter(x => x["descripcion_capa"] == capaUnica).forEach( x =>{
                            descripcionCapa = x["Propiedad"];
                            x.Variable = x.Variable?x.Variable:""; 
                            jsonColores[x.Variable] = x.Color
                        });
                        //console.log(jsonColores)
                        estiloDinamico = (feature) =>{
                            //console.log(feature.properties)
                            let valuePropertie = feature.properties[descripcionCapa];
                            //console.log(valuePropertie)
                            return {"color":jsonColores[valuePropertie]}
                        }
                        //console.log(capaUnica)
                    }
                        this.jsonTotalCapas[capaUnica] = L.geoJson(capa["data"],{style:estiloDinamico,onEachFeature: onEachFeatureCustom});
                    }
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
let detalle = new MAPAGLOBAL(comunaBase); 