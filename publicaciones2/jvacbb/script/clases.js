/*
////////////////////////////////////////////
////////////////////////////////////////////

            UTIL

////////////////////////////////////////////
////////////////////////////////////////////
*/
class UTIL {    
    //static longDescription;
    //static description = 'I square the triple of any number you provide';
    static setCapa(url,name,controlGlobalCapa) {
        $.get({
            url: url,
            error: () => {console.log("No File in " + url);
            var today2 = new Date();
            var now2 = today2.toLocaleString();
            console.log("final",name,now2);},
            success: () => console.log("Conected...")
        })
        .done(
            data => {
                if(data){
                    let final = JSON.parse(data);
                    let capa = L.geoJson(final);//.addTo(map);
                    controlGlobalCapa.setCapa(capa,name)
                    var today2 = new Date();
                    var now2 = today2.toLocaleString();
                    console.log("inicio",name,now2);
                }          
            }
        )
    }
    /*
    Capa
    Tipo
    idcapa
    url
    urlData
    url_ícono
    */
    static setCapa2(capa,controlGlobalCapa) {
        $.get({
            url: capa.urlData,
            error: () => console.log("No File in " + capa.urlData),
            success: () => console.log("Conected...")
        })
        .done(
            data => {
                if(!data){
                    return null;
                }
                capa.data = JSON.parse(data);
                let dataGlobalNivel2 = dataGlobal.filter( capaGlobal =>
                    capaGlobal.idcapa == capa.idcapa
                );
                

                let dataGlobalDescripCapaUnique = [...new Set(dataGlobalNivel2
                                            .filter(x => x.popup_0_1 != null)
                                            .sort((x,y) => {return x["posición_capa"] - y["posición_capa"]})
                                            .map(x => x.descripcion_capa)
                                            .filter(x => x)
                                            )];
                let dataGlobalPropiedadesUnique = [... new Set(dataGlobalNivel2.sort( x=> x.posicion_popup).map(x => x.Propiedad))]
                let diccionarioNombrePropiedadPopup = {}
                dataGlobalNivel2.forEach(x => diccionarioNombrePropiedadPopup[x.Propiedad] = x["descripcion_pop-up"]);
                let onEachFeatureCustom = (feature, layer) =>{
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
                ///////////////////////////////////////////////////
                ///////////////////////////////////////////////////
                ///////////////////////////////////////////////////
                dataGlobalDescripCapaUnique.sort(x => x["posición_capa"]).forEach(capaUnica =>{
                    let capaUnicaID = removeAccents(capaUnica);
                    let capaUnicaName = capaUnica;
                    capaUnica = `<span id='${capaUnicaID}'>${capaUnica}</span>`;
                    let estiloDinamico = null;
                    let dataGlobalCapas = dataGlobalNivel2.filter(x => x["descripcion_capa"] == capaUnicaName);
                    let tituloLeyenda = dataGlobalCapas[0]["titulo_leyenda"];
                    let legend = null;
                    let flag = false;
                    
                    if(tipoGeometria == "Point"){
                        let setIcon;                   
                        if(dataGlobalCapas.length == 1){                        
                            if(dataGlobalCapas[0]["Variable"] == "default"){
                                let objReferencia = dataGlobal.filter(x => x["descripcion_capa"] == capaUnicaName)[0];   
                                let jsonIconosRandom = {};
                                let jsonIconosRandom2 = {}; 
                                jsonIconosRandom[objReferencia["Propiedad"]] = getIcon(objReferencia["url_icono"]);
                                setIcon = (feature,latlng) => {
                                    return L.marker(latlng, { icon: jsonIconosRandom[objReferencia["Propiedad"]] });
                                }
                                jsonIconosRandom2[capaUnicaName] = jsonIconosRandom[objReferencia["Propiedad"]]; 
                                //this.legendas.push(new LEGENDMAP(capaUnicaID,capaUnicaName,jsonIconosRandom2,null,tituloLeyenda));  
                                legend = new LEGENDMAP(capaUnicaID,capaUnicaName,jsonIconosRandom2,null,tituloLeyenda);  
                                flag = true;
                                legend.setLegenda()
                            }
                            if(dataGlobalCapas[0]["Variable"] == "random"){
                                let objReferencia = dataGlobal.filter(x => x["descripcion_capa"] == capaUnicaName)[0];
                                let nameProperties = objReferencia["Propiedad"];
                                let paletaReferencia = objReferencia["Color"];                             
                                let iconoDBReferencia = dataIcono.filter(x => x["Paleta"] == paletaReferencia);
                                let propertiesUniques = [... new Set(capa["data"]["features"].map(x => x["properties"][nameProperties]))];
                                
                                let jsonIconosRandom = {}; 
                                let contadorIcono = 0;
                                propertiesUniques.forEach(x =>{
                                    try {
                                        jsonIconosRandom[x] = getIcon(iconoDBReferencia[contadorIcono%iconoDBReferencia.length]["Link"])
                                        contadorIcono++;
                                    } catch (error) {
                                        jsonIconosRandom[x] = getIcon(dataIcono[contadorIcono]["Link"])                                    
                                    }     
                                }); 
                                setIcon = (feature, latlng) => {                                
                                    let descripcionCapa = feature.properties[nameProperties];
                                    let myIcon = jsonIconosRandom[descripcionCapa];
                                    return L.marker(latlng, { icon: myIcon });
                                }                                
                                //this.legendas.push(new LEGENDMAP(capaUnicaID,capaUnicaName,jsonIconosRandom,null,tituloLeyenda))
                                legend = new LEGENDMAP(capaUnicaID,capaUnicaName,jsonIconosRandom,null,tituloLeyenda);
                                flag = true;
                                legend.setLegenda()
                            }
                        }
                        else{
                            let jsonColores = {};
                            let descripcionCapa;
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
                            //this.legendas.push(new LEGENDMAP(capaUnicaID,capaUnicaName,jsonColores,null,tituloLeyenda))
                            legend = new LEGENDMAP(capaUnicaID,capaUnicaName,jsonColores,null,tituloLeyenda);
                            flag = true;
                            legend.setLegenda()
                        }
                        
                        //this.jsonTotalCapas[capaUnica] = L.geoJson(capa["data"],{onEachFeature: onEachFeatureCustom,pointToLayer: setIcon});  
                        controlGlobalCapa.setCapa(L.geoJson(capa["data"],{onEachFeature: onEachFeatureCustom,pointToLayer: setIcon}),capaUnica)       
                    }
                    else{   
                        if(dataGlobalCapas[0]["Variable"] == "auxiliar"){
                            //console.log("Entramos bien",dataGlobalCapas)
                            estiloDinamico = (feature) => {
                                return {"fillOpacity":0.7,"opacity":0.75,"color":feature["properties"]["Color"]}
                            }
                            let jsonIconosRandom2 = {}
                            let propiedades = capa["data"]["features"].map(x => x["properties"])
                            let propiedadesColorClase = propiedades.map(x => {
                                let salida = {};
                                salida["Color"] = x["Color"];
                                salida["Clase Final"] = x["Clase Final"]
                                return salida;}).sort((x,y) => x["Clase Final"] > y["Clase Final"]? 1 : -1);
                            
                            
                            propiedadesColorClase.forEach( x => {
                                let nombreClaseFinal = x["Clase Final"];
                                if(!jsonIconosRandom2[nombreClaseFinal]){
                                    jsonIconosRandom2[nombreClaseFinal] = x["Color"];
                                }                                
                            });
                            
                            //let propiedadesUnicas = [... new Set(propiedadesColorClase)];
                            
                            console.log(capaUnicaName,jsonIconosRandom2,propiedadesColorClase)
                            
                            //let propiedadesUnicas = [... new Set([propiedades.map(x => {"Color":x["Color"],"Clase":x["Clase Final"]}]})])]
                            

                            //console.log("Entramos bien",capa["data"]["features"].map(x => x["properties"]))


                            legend = new LEGENDMAP(capaUnicaID,capaUnicaName,null,jsonIconosRandom2,tituloLeyenda);
                            controlGlobalCapa.setCapa(L.geoJson(capa["data"],{style:estiloDinamico,onEachFeature: onEachFeatureCustom}),capaUnica)
                            setTimeout(() => legend.setLegenda(), 5000);
                            return
                        }                    

                        if(dataGlobalCapas.length == 1){
                            //console.log("Variable",dataGlobalCapas[0]["Variable"])
                            //console.log(dataGlobalCapas)
                        

                            if(dataGlobalCapas[0]["Variable"] == "default"){
                                /* color: "#00008c",
                                opacity: 0.6,
                                fillColor: '#333333',
                                fillOpacity: 0 */
                                let objReferencia = dataGlobal.filter(x => x["descripcion_capa"] == capaUnicaName)[0];   
                                let jsonIconosRandom = {}; 
                                let jsonIconosRandom2 = {}; 
                                //jsonIconosRandom[objReferencia["Propiedad"]] = getIcon(objReferencia["url_icono"]);
                                jsonIconosRandom[objReferencia["Propiedad"]] = objReferencia["Color"];
                                estiloDinamico = () => {
                                    return {"fillOpacity":0.5,"color":jsonIconosRandom[objReferencia["Propiedad"]]}
                                }
                                jsonIconosRandom2[capaUnicaName] = jsonIconosRandom[objReferencia["Propiedad"]]; 
                                //this.legendas.push(new LEGENDMAP(capaUnicaID,capaUnicaName,null,jsonIconosRandom2,tituloLeyenda))    
                                legend = new LEGENDMAP(capaUnicaID,capaUnicaName,null,jsonIconosRandom2,tituloLeyenda);
                                flag = true;
                                legend.setLegenda()
                            }
                            if(dataGlobalCapas[0]["Variable"] == "random"){
                                let objReferencia = dataGlobal.filter(x => x["descripcion_capa"] == capaUnicaName)[0];
                                let nameProperties = objReferencia["Propiedad"];
                                let paletaReferencia = objReferencia["Color"];
                                let colorDBReferencia = dataColor.filter(x => x["Paleta"] == paletaReferencia);
                                let propertiesUniques = [... new Set(capa["data"]["features"].map(x => x["properties"][nameProperties]))];
                                let jsonColoresRandom = {}; 
                                let contadorColor = 0;                           
                                propertiesUniques.forEach(x =>{
                                    try {
                                        jsonColoresRandom[x] = colorDBReferencia[contadorColor%colorDBReferencia.length]["Color"];
                                        contadorColor++;
                                    } catch (error) {
                                        jsonColoresRandom[x] = dataColor[contadorColor]["Color"];
                                    }                                
                                });
                                estiloDinamico = (feature) => {
                                    let descripcionCapa = feature.properties[nameProperties];
                                    return {"fillOpacity":0.5,"color":jsonColoresRandom[descripcionCapa]}
                                }    
                                //this.legendas.push(new LEGENDMAP(capaUnicaID,capaUnicaName,null,jsonColoresRandom,tituloLeyenda))
                                legend = new LEGENDMAP(capaUnicaID,capaUnicaName,null,jsonColoresRandom,tituloLeyenda);
                                flag = true;
                                legend.setLegenda()
                            }
                        }
                        else{
                            let jsonColores = {};
                            let descripcionCapa;
                            dataGlobal.filter(x => x["descripcion_capa"] == capaUnicaName).forEach( x =>{
                                descripcionCapa = x["Propiedad"];
                                x.Variable = x.Variable?x.Variable:""; 
                                jsonColores[x.Variable] = x.Color
                            });
                            estiloDinamico = (feature) =>{
                                let valuePropertie = feature.properties[descripcionCapa];
                                return {"fillOpacity":0.5,"color":jsonColores[valuePropertie]}
                            }
                            //this.legendas.push(new LEGENDMAP(capaUnicaID,capaUnicaName,null,jsonColores,tituloLeyenda));
                            legend = new LEGENDMAP(capaUnicaID,capaUnicaName,null,jsonColores,tituloLeyenda)
                            flag = true;
                            legend.setLegenda()
                        }
                            //this.jsonTotalCapas[capaUnica] = L.geoJson(capa["data"],{style:estiloDinamico,onEachFeature: onEachFeatureCustom});
                            
                        controlGlobalCapa.setCapa(L.geoJson(capa["data"],{style:estiloDinamico,onEachFeature: onEachFeatureCustom}),capaUnica)  
                    }
                    //legend.setLegenda();
                    setTimeout(() => legend.setLegenda(), 5000); 
                });           
            }
        )
    }
}

class COMUNABASE{
    constructor(){
        //Mapas Bases de Diferentes Fuentes
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

        this.controlMapaBases = L.control.layers(this.mapasBases, null, {
            position: 'topright',
            collapsed:  true
        }).addTo(map);    
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
            //let htmlMinimize = `<i id="clickme" class="gg-minimize-alt"> </i>`; height="40" width="40"
            let htmlMinimize = '<img id="clickme" src="Content/img/min.png" alt="imagen minimizar"></img><img id="clickme2" src="Content/img/max.png" alt="imagen maximizar"></img>';
            div.innerHTML +=
            '<div class="legendCustom">' + 
            `<div class="contenedor container"><div class="row"> <div class="principal2 col-10"> <p class="titleLegend principal"><b>${titulo}</b></p></div><div onclick="slideToggleLegend('${idName}_slide',this);" class="sidebar2 col-2">${htmlMinimize}</div></div></div> `+
            //'<span class="desc1" style="background: #e82c2c;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>'+
            `<div id="${idName}_slide"> ${htmlString}</div>` +
            '</div>';
            return div;
        };
        $(`#${this.idName}`).parent().parent().parent().find("input").change(() => {
            let check = $(`#${this.idName}`).parent().parent().parent().find("input").prop("checked");
            check?this.legend.addTo(map):this.legend.remove();
        });        
    }
}

class ControlGlobalCapa{
    constructor(){
        this.controlGlobalCapa = L.control.layers(null, null, {
            position: 'topright',
            collapsed:  true
        }).addTo(map);
    }

    setCapa(capa,name){
        //addOverlay( <ILayer> layer, <String> name )
        try {
            this.controlGlobalCapa.addOverlay(capa,name);
        } catch (error) {
            console.log("Eror")
            
        }
        
    }
}

class MAPAGLOBAL{
    constructor(comunaBase,controlGlobalCapa){          
        //let comunaBase = new COMUNABASE();    
        this.jsonTotalCapas = {};
        //https:// github.com                 /Sud-Austral/mapa_insumos/tree/main/comunas_capas/shapes_por_comuna/APR_SSC_COM_CGS/?CUT_COM=00000.json
        //https:// raw.githubusercontent.com  /Sud-Austral/mapa_insumos     /main/comunas_capas/shapes_por_comuna/APR_SSC_COM_CGS/13101.json
        dataCapaGlobal = dataCapaGlobal.map(capa => {
            //console.log(capa)
            capa["url"] = capa["url"]
                .replaceAll("github.com","raw.githubusercontent.com")
                .replaceAll("tree","");
            return capa;
        });

        this.dataGlobalNivel1 = dataCapaGlobal.map(capa => {
            capa["urlData"] = `${capa.url.split("?")[0]}${comunaBase.codigo_comuna}.json`;
            try {
                //capa["data"] = getData(capa["urlData"]);
                //console.log(capa)
                /*
                Capa
                Tipo
                idcapa
                url
                urlData
                url_ícono
                */
                UTIL.setCapa2(capa,controlGlobalCapa); 
            } catch (error) {
                //console.log("Revisa " + capa["urlData"]);
                //capa["data"] = null;
                console.log("Error")
            }            
            return capa;
        }).filter( capa =>
            capa["data"] != null
        );
    }
}


