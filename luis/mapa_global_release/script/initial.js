//Mapa de Leaflet
let map = L.map("mapid").setView([-33.458725187656356, -70.66008634501547],10);
function slideToggleLegend(idLegenda) {
    //alert( "clicked " +idLegenda);
    $( "#" + idLegenda ).slideToggle( "slow", function() {
        // Animation complete.
    });
  }
//"Capa":"datos_de_pozos"
//"idcapa":26
//dataGlobal = dataGlobal.filter(x => x["idcapa"] == 8);
//https://github                .com/Sud-Austral/DATA_MAPA_PUBLIC_V2/raw/main/AGUAS/Iconos/solido1.png
//https://raw.githubusercontent .com/Sud-Austral/DATA_MAPA_PUBLIC_V2    /main/AGUAS/Iconos/Solido1.png

iconosDB = iconosDB.map( x => 
    x.replaceAll("https://github","https://raw.githubusercontent")
    .replaceAll("/DATA_MAPA_PUBLIC_V2/raw","/DATA_MAPA_PUBLIC_V2"));

const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replaceAll(" ","")
    .replaceAll(":","")
    .replace(/[^a-zA-Z ]/g, "");
    } 

function getIcon(url){
    url = url?url:"https://github.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/raw/main/svg/default.png";
    let myIcon = L.icon({
        iconUrl: url,
        iconSize:  [25,25]   //[25, 25] // width and height of the image in pixels
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

class LEGENDMAP{

    iconDefault = "https://github.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/raw/main/svg/default.png";

    constructor(idName, Nombre,dictIcono,dictColor,titulo){
        this.Nombre = Nombre;
        this.idName = idName;
        this.legend = L.control({ position: 'bottomleft' });
        this.dictIcono = dictIcono;
        this.dictColor = dictColor;
        this.titulo = titulo;
    }

    setLegenda(){
        let titulo = this.titulo;
        let nombre = this.Nombre;
        let dicAux = this.dictIcono;
        let dicAux2 = this.dictColor;
        let idName = this.idName;
        console.log("SetLEgenda")
        console.log(nombre);
        console.log(1,dicAux)
        console.log(2,dicAux2)
        this.legend.onAdd = function () {
            var div = L.DomUtil.create('div', 'legend');
            let htmlString = "";
            //console.log(dicAux)
            if(dicAux){
                Object.keys(dicAux).forEach(x => {
                    try {
                        //let url = dicAux[x]?dicAux[x]['options']['iconUrl']:iconDefault;
                        let url = dicAux[x]?dicAux[x]['options']?dicAux[x]['options']['iconUrl']:dicAux[x]:iconDefault;
                        x = x != ""?x:"Sin Información";
                        let htmlAux = `<span><img src="${url}" alt="Girl in a jacket" width="20" height="20"> ${x}</span><br>`
                        htmlString = htmlString + htmlAux;    
                    } catch (error) {
                        console.log("Error en Diccionario Icono setLegenda");
                    }                    
                });
            }
            if(dicAux2){
                Object.keys(dicAux2).forEach(x => {
                    try {
                        let color = dicAux2[x];
                        x = x != ""?x:"Sin Información";
                        //let htmlAux = `<span><img src="${dicAux2[x]['options']['iconUrl']}" alt="Girl in a jacket" width="20" height="20"> ${x}</span><br>`
                        let htmlAux = `<div class="contenedor"><div class="sidebar"><span class="desc1" style='background: ${color};'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div><div class="principal"><span>  ${x} </span></div></div>`;
                        htmlString = htmlString + htmlAux;  
                    } catch (error) {
                        console.log("Error en Diccionario Color setLegenda");
                    }                    
                });
            }
            let htmlMinimize = `<i id="clickme" class="gg-minimize-alt"> </i>`;
            div.innerHTML +=
            '<div class="legendCustom">' + 
            `<div class="contenedor"><div class="principal2"> <p class="titleLegend principal"><b>${titulo}</b></p></div><div onclick="slideToggleLegend('${idName}_slide')" class="sidebar2">${htmlMinimize}</div></div> `+
            //'<span class="desc1" style="background: #e82c2c;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>'+
            `<div id="${idName}_slide"> ${htmlString}</div>` +
            '</div>';
            return div;
        };
        $(`#${this.idName}`).parent().parent().parent().find("input").change(() => {
            let check = $(`#${this.idName}`).parent().parent().parent().find("input").prop("checked");
            check?this.legend.addTo(map):this.legend.remove();
        });
        /*
        $("#clickme").on( "click", function() {
                alert("Hola");

        */
        
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
        //
        this.legendas = []
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
            let tipoGeometria = capa["data"]["features"][0]["geometry"]["type"];
            dataGlobalDescripCapaUnique.sort(x => x["posición_capa"]).forEach(capaUnica =>{
                let capaUnicaID = removeAccents(capaUnica);
                let capaUnicaName = capaUnica;
                capaUnica = `<span id='${capaUnicaID}'>${capaUnica}</span>`;
                let estiloDinamico = null;
                let dataGlobalCapas = dataGlobalNivel2.filter(x => x["descripcion_capa"] == capaUnicaName);
                let tituloLeyenda = dataGlobalCapas[0]["titulo_leyenda"];
                
                //console.log(capaUnicaName,"***********",tipoGeometria,"***********",dataGlobalCapas[0]["Variable"])                
                if(tipoGeometria == "Point"){
                    let setIcon;                     
                    /*
                    = (feature, latlng) =>{
                        let myIcon = L.Icon.Default;
                        return L.marker(latlng, { icon: myIcon });
                    }
                    /*
                    = (feature, latlng) => {
                        let urlImage = "https://github.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/raw/main/svg/icono_svg.svg";
                        let myIcon =  getIcon(urlImage);
                        return L.marker(latlng, { icon: myIcon });
                    }
                    */
                   
                    if(dataGlobalCapas.length == 1){                        
                        if(dataGlobalCapas[0]["Variable"] == "default"){
                            console.log("punto default")  
                            console.log(dataGlobalCapas)
                            this.legendas.push(new LEGENDMAP(capaUnicaID,capaUnicaName));  
                        }
                        if(dataGlobalCapas[0]["Variable"] == "random"){
                            
                            //let nameProperties = dataGlobal.filter(x => x["descripcion_capa"] == capaUnica)[0]["Propiedad"];
                            //capaUnicaName
                            let nameProperties = dataGlobal.filter(x => x["descripcion_capa"] == capaUnicaName)[0]["Propiedad"];
                            
                            
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
                            
                            this.legendas.push(new LEGENDMAP(capaUnicaID,capaUnicaName,jsonIconosRandom,null,tituloLeyenda))
                        }
                    }
                    else{
                        //console.log(capaUnicaName,"no random")
                        let jsonColores = {};
                        let descripcionCapa;
                        //capaUnicaName
                        //dataGlobal.filter(x => x["descripcion_capa"] == capaUnica).forEach( x =>{
                        dataGlobal.filter(x => x["descripcion_capa"] == capaUnicaName).forEach( x =>{
                            descripcionCapa = x["Propiedad"];
                            x.Variable = x.Variable?x.Variable:"";
                            jsonColores[x.Variable] = x.url_icono
                        });   
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
                        //console.log("json",jsonColores)
                        this.legendas.push(new LEGENDMAP(capaUnicaID,capaUnicaName,jsonColores,null,tituloLeyenda))
                    }  
                    
                    var markers = L.markerClusterGroup();
                    let shapeAux = L.geoJson(capa["data"],{onEachFeature: onEachFeatureCustom,pointToLayer: setIcon});
                    markers.addLayer(shapeAux);                 
                    this.jsonTotalCapas[capaUnica] = markers;                    
                    /*
                    this.jsonTotalCapas[capaUnica] = L.geoJson(capa["data"],{onEachFeature: onEachFeatureCustom,pointToLayer: setIcon});
                    */
                }
                else{
                    if(dataGlobalCapas.length == 1){
                        if(dataGlobalCapas[0]["Variable"] == "default"){
                            console.log("poligono default");
                            this.legendas.push(new LEGENDMAP(capaUnicaID,capaUnicaName))    
                        }
                        if(dataGlobalCapas[0]["Variable"] == "random"){
                            //let paletaNombre = dataGlobalCapas[0]["Paleta"]; 
                            //let nameProperties = dataGlobal.filter(x => x["descripcion_capa"] == capaUnica)[0]["Propiedad"];
                            //capaUnicaName
                            let nameProperties = dataGlobal.filter(x => x["descripcion_capa"] == capaUnicaName)[0]["Propiedad"];
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
                            this.legendas.push(new LEGENDMAP(capaUnicaID,capaUnicaName,null,jsonColoresRandom,tituloLeyenda))
                        }
                    }
                    else{
                        //console.log("Mira aka",capaUnica)
                        //console.log(dataGlobal)
                        //console.log(dataGlobal.filter(x => x["descripcion_capa"] == capaUnica))
                        let jsonColores = {};
                        let descripcionCapa;
                        dataGlobal.filter(x => x["descripcion_capa"] == capaUnicaName).forEach( x =>{
                            descripcionCapa = x["Propiedad"];
                            x.Variable = x.Variable?x.Variable:""; 
                            jsonColores[x.Variable] = x.Color
                        });
                        //console.log(jsonColores)
                        estiloDinamico = (feature) =>{
                            let valuePropertie = feature.properties[descripcionCapa];
                            return {"color":jsonColores[valuePropertie]}
                        }
                        this.legendas.push(new LEGENDMAP(capaUnicaID,capaUnicaName,null,jsonColores,tituloLeyenda));
                        }
                        this.jsonTotalCapas[capaUnica] = L.geoJson(capa["data"],{style:estiloDinamico,onEachFeature: onEachFeatureCustom});
                }
            });
        });        
        this.controlTotalCapas = L.control.layers(comunaBase.mapasBases, this.jsonTotalCapas, {
            position: 'topright',
            collapsed:  true
        }).addTo(map);  
        //detalle.legendas.forEach(x =>{
        this.legendas.forEach(x => x.setLegenda());      
    }
}

//let detalle = new MAPAGLOBAL();
let comunaBase = new COMUNABASE();
let detalle = new MAPAGLOBAL(comunaBase); 

let bandera = true;


/*
detalle.legendas.forEach(x =>{
    console.log(x);
    //x.setLegenda()
    $(x.idName).parent().parent().click(() => {
        console.log("Hola mundo")
    //console.log($("#AcuiferosTipodeLimitacion").parent().parent().html())
        if(bandera){
            x.legend.addTo(map);
        }
        else{
            x.legend.remove();
        }
        bandera = !bandera;
    });
});

/*
var legend = L.control({ position: 'bottomleft' });

legend.onAdd = function () {
    var div = L.DomUtil.create('div', 'legend');

    if(typeVar == 1){
        div.innerHTML +=
        '<div>' +
        '<p class="titleLegend"><b> Hola wena wena</b></p>' +
        '<span class="desc1" style="background: #e82c2c;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>'+
        '</div>';

        return div;
    };
}

//legend.addTo(map);

var legend2 = L.control({ position: 'bottomleft' });

legend2.onAdd = function () {
    var div = L.DomUtil.create('div', 'legend');

    if(typeVar == 1){
        div.innerHTML +=
        '<div>' +
        '<p class="titleLegend"><b> Hola wena wena</b></p>' +
        '<span class="desc1" style="background: #e82c2c;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>'+
        '</div>';

        return div;
    };
}

//legend2.addTo(map);


$("#AcuiferosTipodeLimitacion").parent().parent().click(() => {
console.log("Hola mundo")
console.log($("#AcuiferosTipodeLimitacion").parent().parent().html())
if(bandera){
    legend.addTo(map);
}
else{
    legend.remove();
}
bandera = !bandera;
});
*/


