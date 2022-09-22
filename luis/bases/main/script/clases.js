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
            error: () => console.log("No File in " + url),
            success: () => console.log("Conected...")
        })
        .done(
            data => {
                if(data){
                    let final = JSON.parse(data);
                    let capa = L.geoJson(final);//.addTo(map);
                    controlGlobalCapa.setCapa(capa,name)
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
            error: () => console.log("No File in " + url),
            success: () => console.log("Conected...")
        })
        .done(
            data => {
                if(!data){
                    return null;
                }
                console.log("Bien")
                let dataGlobalNivel2 = dataGlobal.filter( capaGlobal =>
                    capaGlobal.idcapa == capa.idcapa
                );
                console.log(capa.Capa,capa.idcapa,dataGlobalNivel2)
                capa.jsonData = JSON.parse(data);
                capa.geojson = L.geoJson(capa.jsonData);//.addTo(map);
                controlGlobalCapa.setCapa(capa.geojson,capa.Capa)             
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
        this.controlGlobalCapa.addOverlay(capa,name);
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


