function getMapasAuxiliar(){
    let diccionarioSalida = {};
    let urlBaseComuna = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/establecimientorect/01101.json`;
    //this.urlBaseComuna = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/poblacion_hex/01101.json`;
    let dataBaseComuna = getData(urlBaseComuna);
    let shapeBaseComuna = L.geoJson(dataBaseComuna,{
        style: style,
        //style:estiloDinamico,
        onEachFeature: onEachFeature            
    }).addTo(map);
    diccionarioSalida["Puntos RECT"] = shapeBaseComuna;
    ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////
    var dictColor = {0:"red",1:"blue",2:"yellow",3:"green",4:"black"}
    var estiloDinamico = (feature) =>{
        let color = feature["properties"]["Pob_0_5"];
        return {"fillOpacity":0.7,"opacity":0.75,"color":dictColor[color]}
    }
    ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////
    let urlBaseComuna2 = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/poblacion_hex/01101.json`;
    let dataBaseComuna2 = getData(urlBaseComuna2);
    let shapeBaseComuna2 = L.geoJson(dataBaseComuna2,{
        style: style,
        //style:estiloDinamico,
        onEachFeature: onEachFeature            
    }).addTo(map);
    diccionarioSalida["Hexagonos"] = shapeBaseComuna2;
    //EDUCACION
    var setIcon = (feature,latlng) => {
        let url = "https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/ICONS/ICONS/0%20universal-colorful-flat-icons/Education/1.png"
        return L.marker(latlng, { icon: getIcon(url) });
    }
    ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////
    let urlBaseComuna3 = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/educacion/Instituciones_EdSuperior_2020.json`;
    let dataBaseComuna3 = getData(urlBaseComuna3);
    let shapeBaseComuna3 = L.geoJson(dataBaseComuna3,{
        filter:x=>x.properties.COD_COMUNA == 1101 ,
        pointToLayer: setIcon,
        //style:estiloDinamico,
        onEachFeature: onEachFeature            
    }).addTo(map);
    diccionarioSalida["Educación Superior"] = shapeBaseComuna3;
    ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////
    setIcon = (feature,latlng) => {
        let url = "https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/ICONS/ICONS/0%20universal-colorful-flat-icons/Education/11.png"
        return L.marker(latlng, { icon: getIcon(url) });
    }

    let urlBaseComuna4 = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/educacion/Establecimientos_Educacionales_2021.json`;
    let dataBaseComuna4 = getData(urlBaseComuna4);
    let shapeBaseComuna4 = L.geoJson(dataBaseComuna4,{
        //filter: x => x.properties.COD_COM_RB == 1101,
        filter: x => (x.properties.MAT_MHC_RE > 0 || x.properties.MAT_MTP_RE > 0) && x.properties.COD_COM_RB == 1101,
        pointToLayer: setIcon,
        //style:estiloDinamico,
        onEachFeature: onEachFeature            
    }).addTo(map);
    diccionarioSalida["Educación Secundaria"] = shapeBaseComuna4;


    let urlBaseComuna5 = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/comuna_zonas/01101.json`;
    let dataBaseComuna5 = getData(urlBaseComuna5);
    let shapeBaseComuna5 = L.geoJson(dataBaseComuna5,{
        //style:estiloDinamico,
        onEachFeature: onEachFeature            
    }).addTo(map);
    diccionarioSalida["Zonas"] = shapeBaseComuna5;

    let urlBaseComuna6 = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/rect/puntual_aire/01101.json`;
    let dataBaseComuna6 = getData(urlBaseComuna6);
    let shapeBaseComuna6 = L.geoJson(dataBaseComuna6,{
        //style:estiloDinamico,
        onEachFeature: onEachFeature            
    }).addTo(map);
    diccionarioSalida["RECT Aire"] = shapeBaseComuna6;

    let url = "https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/rect/agua_emisiones/01101.json"
    diccionarioSalida["Agua Emisiones"] = getMapa(url);
    
    url = "https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/rect/agua_lodos_pta/01101.json"
    diccionarioSalida["Agua Lodos PTA"] = getMapa(url);
    
    url = "https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/rect/agua_riles_alcantarillado/01101.json"
    diccionarioSalida["Agua Riles Alcantarillado"] = getMapa(url);

    url = "https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/rect/puntual_aire/01101.json"
    diccionarioSalida["Puntual Aire"] = getMapa(url);

    url = "https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/rect/rnp_destinatarios/01101.json"
    diccionarioSalida["RNP Destinatarios"] = getMapa(url);

    url = "https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/rect/rnp_generacion_industrial/01101.json"
    diccionarioSalida["RNP Generacion Industrial"] = getMapa(url);

    url = "https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/rect/rp_destinatario/01101.json"
    diccionarioSalida["RP Destinatario"] = getMapa(url);

    url = "https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/rect/rp_generacion/01101.json"
    diccionarioSalida["RP Generación"] = getMapa(url);
    
    return diccionarioSalida;

}

function getMapa(url){
    let dataBase = getData(url);
    let shapeBase = L.geoJson(dataBase,{
        //style:estiloDinamico,
        onEachFeature: onEachFeature            
    }).addTo(map);
    return shapeBase;
}