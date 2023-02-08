function getMapasAuxiliar(codcom){

    let codcomInt = parseInt(codcom);
    let diccionarioSalida = {};
    let url = "";
    let mapa = "";

    
    url = "https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V3/main/incendio/J1_VIIRS_C2/J1_VIIRS_C2_South_America_7d_1675776476584-1.json";
    let estiloDinamico = () => {//(feature) => {
        return {"fillOpacity":0.7,"opacity":0.75,"color":"red"}
    }
    mapa = getMapaCustomStyle(url, estiloDinamico);//getMap(url);
    diccionarioSalida["J1 VIIRS Geomatría"] = mapa;
    
    /*
    url = "https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V3/main/incendio/J1_VIIRS_C2/J1_VIIRS_C2_South_America_7d_1675776476584-3.json";
    console.log(url)
    mapa = getMap2(url);
    //diccionarioSalida["J1 VIIRS Puntos"] = mapa;
    /*    

    url = "https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V3/main/junta_vigilancia/Area_Jurisdiccion/Area_jurisdiccion_JVBB.json";
    mapa = getMap(url);
    diccionarioSalida["Área jurisdicción"] = mapa;

    url = "https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V3/main/junta_vigilancia/Comunidades/OUA_JVBB.json";
    mapa = getMap(url);
    diccionarioSalida["OUA JVBB"] = mapa;

    url = "https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V3/main/junta_vigilancia/Cuenca/Cuenca_Biobio.json";
    mapa = getMap(url);
    diccionarioSalida["Cuenca Biobio"] = mapa;

    url = "https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V3/main/junta_vigilancia/UsuariosGeneral/Consuntivos/1_c.json";
    mapa = getMap(url);
    diccionarioSalida["Consuntivos 1"] = mapa;

    url = "https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V3/main/junta_vigilancia/UsuariosGeneral/Consuntivos/2_c.json";
    mapa = getMap(url);
    diccionarioSalida["Consuntivos 2"] = mapa;

    url = "https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V3/main/junta_vigilancia/UsuariosGeneral/Consuntivos/3_c.json";
    mapa = getMap(url);
    diccionarioSalida["Consuntivos 3"] = mapa;

    url = "https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V3/main/junta_vigilancia/UsuariosGeneral/Consuntivos/4_c.json";
    mapa = getMap(url);
    diccionarioSalida["Consuntivos 4"] = mapa;

    url = "https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V3/main/junta_vigilancia/UsuariosGeneral/Consuntivos/5_c.json";
    mapa = getMap(url);
    diccionarioSalida["Consuntivos 5"] = mapa;

    url = "https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V3/main/junta_vigilancia/UsuariosGeneral/NoConsuntivos/1_nc.json";
    mapa = getMap(url);
    diccionarioSalida["No Consuntivos 1"] = mapa;

    url = "https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V3/main/junta_vigilancia/UsuariosGeneral/NoConsuntivos/2_nc.json";
    mapa = getMap(url);
    diccionarioSalida["No Consuntivos 2"] = mapa;

    url = "https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V3/main/junta_vigilancia/UsuariosGeneral/NoConsuntivos/3_nc.json";
    mapa = getMap(url);
    diccionarioSalida["No Consuntivos 3"] = mapa;

    url = "https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V3/main/junta_vigilancia/UsuariosGeneral/NoConsuntivos/4_nc.json";
    mapa = getMap(url);
    diccionarioSalida["No Consuntivos 4"] = mapa;

    url = "https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V3/main/junta_vigilancia/UsuariosGeneral/NoConsuntivos/5_nc.json";
    mapa = getMap(url);
    diccionarioSalida["No Consuntivos 5"] = mapa;
    */
    return diccionarioSalida;
}

function getMap(url){
    let dataBase = getData(url);
    let shapeBase = L.geoJson(dataBase,{
        onEachFeature: onEachFeature            
    }) //.addTo(map);
    return shapeBase;
}

function getMap2(url){
    let dataBase = getData(url); 
    dataBase["features"] = dataBase["features"].slice(0,2000)
    let shapeBase = L.geoJson(dataBase).addTo(map);
    return shapeBase;
}

function getMapa(url){
    let dataBase = getData(url);
    let shapeBase = L.geoJson(dataBase,{
        //style:estiloDinamico,
        onEachFeature: onEachFeature,
        pointToLayer: getIconoAuxiliar            
    }) //.addTo(map);
    return shapeBase;
}

function getMapa2(url){
    let dataBase = getData(url);
    let shapeBase = L.geoJson(dataBase,{
        //style:estiloDinamico,
        onEachFeature: onEachFeature,           
    }) //.addTo(map);
    return shapeBase;
}

function getMapaCustomStyle(url, estiloDinamico){
    let dataBase = getData(url);
    let shapeBase = L.geoJson(dataBase,{
        style:estiloDinamico,
        onEachFeature: onEachFeature,
        pointToLayer: getIconoAuxiliar            
    }) //.addTo(map);
    return shapeBase;
}

function getIconoAuxiliar(feature, latlng){
    //Categoria : Clase 4
    let diccionarioClase = {
        "Clase 1":"https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/AGUAS/Iconos/4_FuentesFijasContaminacion/2.svg",
        "Clase 2":"https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/AGUAS/Iconos/4_FuentesFijasContaminacion/32.svg",
        "Clase 3":"https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/AGUAS/Iconos/4_FuentesFijasContaminacion/6.svg",
        "Clase 4":"https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/AGUAS/Iconos/4_FuentesFijasContaminacion/40.svg",
        "Clase 5":"https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/AGUAS/Iconos/4_FuentesFijasContaminacion/39.svg",
    }
    let url = diccionarioClase[feature.properties["Categoria"]];
    let myIcon = getIcon(url);
    return L.marker(latlng, { icon: myIcon });
}