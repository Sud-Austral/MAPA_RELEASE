function getMapasAuxiliar(codcom){
    let codcomInt = parseInt(codcom);
    let diccionarioSalida = {};
    let urlBaseComuna = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/establecimientorect/${codcom}.json`;
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
    let urlBaseComuna2 = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/poblacion_hex/${codcom}.json`;
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
        filter:x=>x.properties.COD_COMUNA == codcomInt ,
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
        filter: x => (x.properties.MAT_MHC_RE > 0 || x.properties.MAT_MTP_RE > 0) && x.properties.COD_COM_RB == codcomInt,
        pointToLayer: setIcon,
        //style:estiloDinamico,
        onEachFeature: onEachFeature            
    }).addTo(map);
    diccionarioSalida["Educación Secundaria"] = shapeBaseComuna4;


    let urlBaseComuna5 = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/comuna_zonas/${codcom}.json`;
    let dataBaseComuna5 = getData(urlBaseComuna5);
    let shapeBaseComuna5 = L.geoJson(dataBaseComuna5,{
        //style: style,
        onEachFeature: onEachFeature            
    }).addTo(map);
    diccionarioSalida["Zonas"] = shapeBaseComuna5;

    let urlBaseComuna6 = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/rect/puntual_aire/${codcom}.json`;
    let dataBaseComuna6 = getData(urlBaseComuna6);
    let shapeBaseComuna6 = L.geoJson(dataBaseComuna6,{
        //style:estiloDinamico,
        onEachFeature: onEachFeature,
        pointToLayer: getIconoAuxiliar             
    }).addTo(map);


    diccionarioSalida["RECT Aire"] = shapeBaseComuna6;

    

    let url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/rect/agua_emisiones/${codcom}.json`
    diccionarioSalida["Agua Emisiones"] = getMapa(url);

    let diccionarioEstilo = {
                                "Clase 1":"blue",
                                "Clase 2":"#04f0f6",
                                "Clase 3":"green",
                                "Clase 4":"#FFD881",
                                "Clase 5":"#FD8D3C",
                                "Clase 6":"red",
                                }
    let customEstilo = (feature) => {
        let valorPropiedad =feature["properties"]["Clasificación"]
        let color = diccionarioEstilo[valorPropiedad];
        return {"fillOpacity":0.7,"opacity":0.75,"color":color}
    }


    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/proyeccion_poblacion/01/${codcom}.json`
    diccionarioSalida["Proyección Edad 1 Custom"] = getMapaCustomStyle(url,customEstilo);


    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/proyeccion_poblacion/02/${codcom}.json`
    diccionarioSalida["Proyección Edad 2"] = getMapaCustomStyle(url,customEstilo);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/proyeccion_poblacion/03/${codcom}.json`
    diccionarioSalida["Proyección Edad 3"] = getMapaCustomStyle(url,customEstilo);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/proyeccion_poblacion/04/${codcom}.json`
    diccionarioSalida["Proyección Edad 4"] = getMapaCustomStyle(url,customEstilo);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/proyeccion_poblacion/05/${codcom}.json`
    diccionarioSalida["Proyección Edad 5"] = getMapaCustomStyle(url,customEstilo);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/proyeccion_poblacion/06/${codcom}.json`
    diccionarioSalida["Proyección Edad 6"] = getMapaCustomStyle(url,customEstilo);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/proyeccion_poblacion/07/${codcom}.json`
    diccionarioSalida["Proyección Edad 7"] = getMapaCustomStyle(url,customEstilo);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/proyeccion_poblacion/08/${codcom}.json`
    diccionarioSalida["Proyección Edad 8"] = getMapaCustomStyle(url,customEstilo);
    

    
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/rect/agua_lodos_pta/${codcom}.json`
    diccionarioSalida["Agua Lodos PTA"] = getMapa(url);
    
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/rect/agua_riles_alcantarillado/${codcom}.json`
    diccionarioSalida["Agua Riles Alcantarillado"] = getMapa(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/rect/puntual_aire/${codcom}.json`
    diccionarioSalida["Puntual Aire"] = getMapa(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/rect/rnp_destinatarios/${codcom}.json`
    diccionarioSalida["RNP Destinatarios"] = getMapa(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/rect/rnp_generacion_industrial/${codcom}.json`
    diccionarioSalida["RNP Generacion Industrial"] = getMapa(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/rect/rp_destinatario/${codcom}.json`
    diccionarioSalida["RP Destinatario"] = getMapa(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/rect/rp_generacion/${codcom}.json`
    diccionarioSalida["RP Generación"] = getMapa(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii1/${codcom}.json`
    diccionarioSalida["SII test"] = getMapa2(url);

    //SII2
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii2/actividadesartsticasentretenimientoyrecreativas/${codcom}.json` 
    diccionarioSalida["SII 2 Actividades Artísticas, Entretenimiento y Recreativas"] = getMapa2(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii2/actividadesdealojamientoyserviciodecomidas/${codcom}.json` 
    diccionarioSalida["SII 2 Actividades de Alojamiento y Servicio de Comidas"] = getMapa2(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii2/actividadesdeatenciondelasaludyasistenciasocial/${codcom}.json` 
    diccionarioSalida["SII 2 Actividades de Atencion de la Salud y Asistencia Social"] = getMapa2(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii2/actividadesdeserviciosadministrativosydeapoyo/${codcom}.json` 
    diccionarioSalida["SII 2 Actividades de Servicios Administrativos y de Apoyo"] = getMapa2(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii2/actividadesfinancierasydeseguros/${codcom}.json` 
    diccionarioSalida["SII 2 Actividades Financieras y de Seguros"] = getMapa2(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii2/actividadesinmobiliarias/${codcom}.json` 
    diccionarioSalida["SII 2 Actividades Inmobiliarias"] = getMapa2(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii2/actividadesprofesionalescientficasytcnicas/${codcom}.json` 
    diccionarioSalida["SII 2 Actividades Profesionales, Científicas y Técnicas"] = getMapa2(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii2/administracionpblicaydefensaseguridadsocial/${codcom}.json` 
    diccionarioSalida["SII 2 Administracion Pública y Defensa; Seguridad Social"] = getMapa2(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii2/agriculturaganaderasilviculturaypesca/${codcom}.json` 
    diccionarioSalida["SII 2 Agricultura, Ganadería, Silvicultura y Pesca"] = getMapa2(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii2/comercioalpormayorymenorreparaciondevehculos/${codcom}.json` 
    diccionarioSalida["SII 2 Comercio al por Mayor y Menor; Reparacion de Vehículos"] = getMapa2(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii2/construccin/${codcom}.json` 
    diccionarioSalida["SII 2 Construcción"] = getMapa2(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii2/enseanza/${codcom}.json` 
    diccionarioSalida["SII 2 Enseñanza"] = getMapa2(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii2/explotacindeminasycanteras/${codcom}.json` 
    diccionarioSalida["SII 2 Explotación de Minas y Canteras"] = getMapa2(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii2/industriamanufacturera/${codcom}.json` 
    diccionarioSalida["SII 2 Industria Manufacturera"] = getMapa2(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii2/informacinycomunicaciones/${codcom}.json` 
    diccionarioSalida["SII 2 Información y Comunicaciones"] = getMapa2(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii2/otrasactividadesdeservicios/${codcom}.json` 
    diccionarioSalida["SII 2 Otras Actividades de Servicios"] = getMapa2(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii2/suministrodeaguaaguasresidualesdesechosydescontaminacin/${codcom}.json` 
    diccionarioSalida["SII 2 Suministro de Agua; Aguas Residuales, Desechos y Descontaminación"] = getMapa2(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii2/suministrodeelectricidadgasvaporyaireacondicionado/${codcom}.json` 
    diccionarioSalida["SII 2 Suministro de Electricidad, Gas, Vapor y Aire Acondicionado"] = getMapa2(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii2/transporteyalmacenamiento/${codcom}.json` 
    diccionarioSalida["SII 2 Transporte y Almacenamiento"] = getMapa2(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii2/valorpordefecto/${codcom}.json` 
    diccionarioSalida["SII 2 Valor por Defecto"] = getMapa2(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii2/actividadesdeorganizacionesyorganosextraterritoriales/${codcom}.json` 
    diccionarioSalida["SII 2 Actividades de Organizaciones y Organos Extraterritoriales"] = getMapa2(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii2/actividadesdeloshogarescomoempleadores/${codcom}.json` 
    diccionarioSalida["SII 2 Actividades de los Hogares como Empleadores"] = getMapa2(url);
    //SII2

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii3/actividadesdeserviciosadministrativosydeapoyo/${codcom}.json` 
    diccionarioSalida["SII 3 Actividades de Servicios Administrativos y de Apoyo"] = getMapa2(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii3/comercioalpormayorymenorreparaciondevehculos/${codcom}.json` 
    diccionarioSalida["SII 3 Comercio al por Mayor y Menor; Reparacion de Vehículos"] = getMapa2(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii3/construccin/${codcom}.json` 
    diccionarioSalida["SII 3 Construcción"] = getMapa2(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii3/enseanza/${codcom}.json` 
    diccionarioSalida["SII 3 Enseñanza"] = getMapa2(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii3/explotacindeminasycanteras/${codcom}.json` 
    diccionarioSalida["SII 3 Explotación de Minas y Canteras"] = getMapa2(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii3/industriamanufacturera/${codcom}.json` 
    diccionarioSalida["SII 3 Industria Manufacturera"] = getMapa2(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii3/otrasactividadesdeservicios/${codcom}.json` 
    diccionarioSalida["SII 3 Otras Actividades de Servicios"] = getMapa2(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii3/transporteyalmacenamiento/${codcom}.json` 
    diccionarioSalida["SII 3 Transporte y Almacenamiento"] = getMapa2(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii3/actividadesinmobiliarias/${codcom}.json` 
    diccionarioSalida["SII 3 Actividades Inmobiliarias"] = getMapa2(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii3/actividadesprofesionalescientficasytcnicas/${codcom}.json` 
    diccionarioSalida["SII 3 Actividades Profesionales, Científicas y Técnicas"] = getMapa2(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii3/suministrodeaguaaguasresidualesdesechosydescontaminacin/${codcom}.json` 
    diccionarioSalida["SII 3 Suministro de Agua; Aguas Residuales, Desechos y Descontaminación"] = getMapa2(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii3/suministrodeelectricidadgasvaporyaireacondicionado/${codcom}.json` 
    diccionarioSalida["SII 3 Suministro de Electricidad, Gas, Vapor y Aire Acondicionado"] = getMapa2(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii3/actividadesdeatenciondelasaludyasistenciasocial/${codcom}.json` 
    diccionarioSalida["SII 3 Actividades de Atencion de la Salud y Asistencia Social"] = getMapa2(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii3/actividadesfinancierasydeseguros/${codcom}.json` 
    diccionarioSalida["SII 3 Actividades Financieras y de Seguros"] = getMapa2(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii3/agriculturaganaderasilviculturaypesca/${codcom}.json` 
    diccionarioSalida["SII 3 Agricultura, Ganadería, Silvicultura y Pesca"] = getMapa2(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii3/actividadesartsticasentretenimientoyrecreativas/${codcom}.json` 
    diccionarioSalida["SII 3 Actividades Artísticas, Entretenimiento y Recreativas"] = getMapa2(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii3/administracionpblicaydefensaseguridadsocial/${codcom}.json` 
    diccionarioSalida["SII 3 Administracion Pública y Defensa; Seguridad Social"] = getMapa2(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii3/actividadesdealojamientoyserviciodecomidas/${codcom}.json` 
    diccionarioSalida["SII 3 Actividades de Alojamiento y Servicio de Comidas"] = getMapa2(url);

    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii3/informacinycomunicaciones/${codcom}.json` 
    diccionarioSalida["SII 3 Información y Comunicaciones"] = getMapa2(url);





    //Parte 4

        //1 10
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/actividadesdealojamientoyserviciodecomidas/10/${codcom}.json` 
    diccionarioSalida["SII 4-10-Actividades de Alojamiento y Servicio de Comidas "] = getMapa2(url);

    //2 11
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/actividadesdealojamientoyserviciodecomidas/11/${codcom}.json` 
    diccionarioSalida["SII 4-11-Actividades de Alojamiento y Servicio de Comidas "] = getMapa2(url);

    //3 12
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/actividadesdealojamientoyserviciodecomidas/12/${codcom}.json` 
    diccionarioSalida["SII 4-12-Actividades de Alojamiento y Servicio de Comidas "] = getMapa2(url);

    //4 13
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/actividadesdealojamientoyserviciodecomidas/13/${codcom}.json` 
    diccionarioSalida["SII 4-13-Actividades de Alojamiento y Servicio de Comidas "] = getMapa2(url);

    //1 10
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/actividadesdeatenciondelasaludyasistenciasocial/10/${codcom}.json` 
    diccionarioSalida["SII 4-10-Actividades de Atencion de la Salud y Asistencia Social "] = getMapa2(url);

    //2 11
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/actividadesdeatenciondelasaludyasistenciasocial/11/${codcom}.json` 
    diccionarioSalida["SII 4-11-Actividades de Atencion de la Salud y Asistencia Social "] = getMapa2(url);

    //3 12
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/actividadesdeatenciondelasaludyasistenciasocial/12/${codcom}.json` 
    diccionarioSalida["SII 4-12-Actividades de Atencion de la Salud y Asistencia Social "] = getMapa2(url);

    //4 13
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/actividadesdeatenciondelasaludyasistenciasocial/13/${codcom}.json` 
    diccionarioSalida["SII 4-13-Actividades de Atencion de la Salud y Asistencia Social "] = getMapa2(url);

    //1 10
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/actividadesdeserviciosadministrativosydeapoyo/10/${codcom}.json` 
    diccionarioSalida["SII 4-10-Actividades de Servicios Administrativos y de Apoyo "] = getMapa2(url);

    //2 11
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/actividadesdeserviciosadministrativosydeapoyo/11/${codcom}.json` 
    diccionarioSalida["SII 4-11-Actividades de Servicios Administrativos y de Apoyo "] = getMapa2(url);

    //3 12
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/actividadesdeserviciosadministrativosydeapoyo/12/${codcom}.json` 
    diccionarioSalida["SII 4-12-Actividades de Servicios Administrativos y de Apoyo "] = getMapa2(url);

    //4 13
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/actividadesdeserviciosadministrativosydeapoyo/13/${codcom}.json` 
    diccionarioSalida["SII 4-13-Actividades de Servicios Administrativos y de Apoyo "] = getMapa2(url);

    //1 10
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/actividadesfinancierasydeseguros/10/${codcom}.json` 
    diccionarioSalida["SII 4-10-Actividades Financieras y de Seguros "] = getMapa2(url);

    //2 11
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/actividadesfinancierasydeseguros/11/${codcom}.json` 
    diccionarioSalida["SII 4-11-Actividades Financieras y de Seguros "] = getMapa2(url);

    //3 12
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/actividadesfinancierasydeseguros/12/${codcom}.json` 
    diccionarioSalida["SII 4-12-Actividades Financieras y de Seguros "] = getMapa2(url);

    //4 13
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/actividadesfinancierasydeseguros/13/${codcom}.json` 
    diccionarioSalida["SII 4-13-Actividades Financieras y de Seguros "] = getMapa2(url);

    //1 10
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/actividadesinmobiliarias/10/${codcom}.json` 
    diccionarioSalida["SII 4-10-Actividades Inmobiliarias "] = getMapa2(url);

    //2 11
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/actividadesinmobiliarias/11/${codcom}.json` 
    diccionarioSalida["SII 4-11-Actividades Inmobiliarias "] = getMapa2(url);

    //3 12
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/actividadesinmobiliarias/12/${codcom}.json` 
    diccionarioSalida["SII 4-12-Actividades Inmobiliarias "] = getMapa2(url);

    //4 13
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/actividadesinmobiliarias/13/${codcom}.json` 
    diccionarioSalida["SII 4-13-Actividades Inmobiliarias "] = getMapa2(url);

    //1 10
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/actividadesprofesionalescientficasytcnicas/10/${codcom}.json` 
    diccionarioSalida["SII 4-10-Actividades Profesionales, Científicas y Técnicas "] = getMapa2(url);

    //2 11
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/actividadesprofesionalescientficasytcnicas/11/${codcom}.json` 
    diccionarioSalida["SII 4-11-Actividades Profesionales, Científicas y Técnicas "] = getMapa2(url);

    //3 12
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/actividadesprofesionalescientficasytcnicas/12/${codcom}.json` 
    diccionarioSalida["SII 4-12-Actividades Profesionales, Científicas y Técnicas "] = getMapa2(url);

    //4 13
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/actividadesprofesionalescientficasytcnicas/13/${codcom}.json` 
    diccionarioSalida["SII 4-13-Actividades Profesionales, Científicas y Técnicas "] = getMapa2(url);

    //1 10
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/agriculturaganaderasilviculturaypesca/10/${codcom}.json` 
    diccionarioSalida["SII 4-10-Agricultura, Ganadería, Silvicultura y Pesca "] = getMapa2(url);

    //2 11
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/agriculturaganaderasilviculturaypesca/11/${codcom}.json` 
    diccionarioSalida["SII 4-11-Agricultura, Ganadería, Silvicultura y Pesca "] = getMapa2(url);

    //3 12
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/agriculturaganaderasilviculturaypesca/12/${codcom}.json` 
    diccionarioSalida["SII 4-12-Agricultura, Ganadería, Silvicultura y Pesca "] = getMapa2(url);

    //4 13
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/agriculturaganaderasilviculturaypesca/13/${codcom}.json` 
    diccionarioSalida["SII 4-13-Agricultura, Ganadería, Silvicultura y Pesca "] = getMapa2(url);

    //1 10
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/comercioalpormayorymenorreparaciondevehculos/10/${codcom}.json` 
    diccionarioSalida["SII 4-10-Comercio al por Mayor y Menor; Reparacion de Vehículos "] = getMapa2(url);

    //2 11
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/comercioalpormayorymenorreparaciondevehculos/11/${codcom}.json` 
    diccionarioSalida["SII 4-11-Comercio al por Mayor y Menor; Reparacion de Vehículos "] = getMapa2(url);

    //3 12
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/comercioalpormayorymenorreparaciondevehculos/12/${codcom}.json` 
    diccionarioSalida["SII 4-12-Comercio al por Mayor y Menor; Reparacion de Vehículos "] = getMapa2(url);

    //4 13
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/comercioalpormayorymenorreparaciondevehculos/13/${codcom}.json` 
    diccionarioSalida["SII 4-13-Comercio al por Mayor y Menor; Reparacion de Vehículos "] = getMapa2(url);

    //1 10
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/construccin/10/${codcom}.json` 
    diccionarioSalida["SII 4-10-Construcción "] = getMapa2(url);

    //2 11
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/construccin/11/${codcom}.json` 
    diccionarioSalida["SII 4-11-Construcción "] = getMapa2(url);

    //3 12
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/construccin/12/${codcom}.json` 
    diccionarioSalida["SII 4-12-Construcción "] = getMapa2(url);

    //4 13
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/construccin/13/${codcom}.json` 
    diccionarioSalida["SII 4-13-Construcción "] = getMapa2(url);

    //1 10
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/enseanza/10/${codcom}.json` 
    diccionarioSalida["SII 4-10-Enseñanza "] = getMapa2(url);

    //2 11
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/enseanza/11/${codcom}.json` 
    diccionarioSalida["SII 4-11-Enseñanza "] = getMapa2(url);

    //3 12
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/enseanza/12/${codcom}.json` 
    diccionarioSalida["SII 4-12-Enseñanza "] = getMapa2(url);

    //4 13
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/enseanza/13/${codcom}.json` 
    diccionarioSalida["SII 4-13-Enseñanza "] = getMapa2(url);

    //1 10
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/explotacindeminasycanteras/10/${codcom}.json` 
    diccionarioSalida["SII 4-10-Explotación de Minas y Canteras "] = getMapa2(url);

    //2 11
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/explotacindeminasycanteras/11/${codcom}.json` 
    diccionarioSalida["SII 4-11-Explotación de Minas y Canteras "] = getMapa2(url);

    //3 12
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/explotacindeminasycanteras/12/${codcom}.json` 
    diccionarioSalida["SII 4-12-Explotación de Minas y Canteras "] = getMapa2(url);

    //4 13
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/explotacindeminasycanteras/13/${codcom}.json` 
    diccionarioSalida["SII 4-13-Explotación de Minas y Canteras "] = getMapa2(url);

    //1 10
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/industriamanufacturera/10/${codcom}.json` 
    diccionarioSalida["SII 4-10-Industria Manufacturera "] = getMapa2(url);

    //2 11
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/industriamanufacturera/11/${codcom}.json` 
    diccionarioSalida["SII 4-11-Industria Manufacturera "] = getMapa2(url);

    //3 12
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/industriamanufacturera/12/${codcom}.json` 
    diccionarioSalida["SII 4-12-Industria Manufacturera "] = getMapa2(url);

    //4 13
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/industriamanufacturera/13/${codcom}.json` 
    diccionarioSalida["SII 4-13-Industria Manufacturera "] = getMapa2(url);

    //1 10
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/otrasactividadesdeservicios/10/${codcom}.json` 
    diccionarioSalida["SII 4-10-Otras Actividades de Servicios "] = getMapa2(url);

    //2 11
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/otrasactividadesdeservicios/11/${codcom}.json` 
    diccionarioSalida["SII 4-11-Otras Actividades de Servicios "] = getMapa2(url);

    //3 12
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/otrasactividadesdeservicios/12/${codcom}.json` 
    diccionarioSalida["SII 4-12-Otras Actividades de Servicios "] = getMapa2(url);

    //4 13
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/otrasactividadesdeservicios/13/${codcom}.json` 
    diccionarioSalida["SII 4-13-Otras Actividades de Servicios "] = getMapa2(url);

    //1 10
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/transporteyalmacenamiento/10/${codcom}.json` 
    diccionarioSalida["SII 4-10-Transporte y Almacenamiento "] = getMapa2(url);

    //2 11
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/transporteyalmacenamiento/11/${codcom}.json` 
    diccionarioSalida["SII 4-11-Transporte y Almacenamiento "] = getMapa2(url);

    //3 12
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/transporteyalmacenamiento/12/${codcom}.json` 
    diccionarioSalida["SII 4-12-Transporte y Almacenamiento "] = getMapa2(url);

    //4 13
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/transporteyalmacenamiento/13/${codcom}.json` 
    diccionarioSalida["SII 4-13-Transporte y Almacenamiento "] = getMapa2(url);

    //1 10
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/suministrodeelectricidadgasvaporyaireacondicionado/10/${codcom}.json` 
    diccionarioSalida["SII 4-10-Suministro de Electricidad, Gas, Vapor y Aire Acondicionado "] = getMapa2(url);

    //2 11
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/suministrodeelectricidadgasvaporyaireacondicionado/11/${codcom}.json` 
    diccionarioSalida["SII 4-11-Suministro de Electricidad, Gas, Vapor y Aire Acondicionado "] = getMapa2(url);

    //3 12
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/suministrodeelectricidadgasvaporyaireacondicionado/12/${codcom}.json` 
    diccionarioSalida["SII 4-12-Suministro de Electricidad, Gas, Vapor y Aire Acondicionado "] = getMapa2(url);

    //4 13
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/suministrodeelectricidadgasvaporyaireacondicionado/13/${codcom}.json` 
    diccionarioSalida["SII 4-13-Suministro de Electricidad, Gas, Vapor y Aire Acondicionado "] = getMapa2(url);

    //1 10
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/actividadesartsticasentretenimientoyrecreativas/10/${codcom}.json` 
    diccionarioSalida["SII 4-10-Actividades Artísticas, Entretenimiento y Recreativas "] = getMapa2(url);

    //2 11
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/actividadesartsticasentretenimientoyrecreativas/11/${codcom}.json` 
    diccionarioSalida["SII 4-11-Actividades Artísticas, Entretenimiento y Recreativas "] = getMapa2(url);

    //3 12
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/actividadesartsticasentretenimientoyrecreativas/12/${codcom}.json` 
    diccionarioSalida["SII 4-12-Actividades Artísticas, Entretenimiento y Recreativas "] = getMapa2(url);

    //4 13
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/actividadesartsticasentretenimientoyrecreativas/13/${codcom}.json` 
    diccionarioSalida["SII 4-13-Actividades Artísticas, Entretenimiento y Recreativas "] = getMapa2(url);

    //1 10
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/informacinycomunicaciones/10/${codcom}.json` 
    diccionarioSalida["SII 4-10-Información y Comunicaciones "] = getMapa2(url);

    //2 11
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/informacinycomunicaciones/11/${codcom}.json` 
    diccionarioSalida["SII 4-11-Información y Comunicaciones "] = getMapa2(url);

    //3 12
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/informacinycomunicaciones/12/${codcom}.json` 
    diccionarioSalida["SII 4-12-Información y Comunicaciones "] = getMapa2(url);

    //4 13
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/informacinycomunicaciones/13/${codcom}.json` 
    diccionarioSalida["SII 4-13-Información y Comunicaciones "] = getMapa2(url);

    //1 10
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/suministrodeaguaaguasresidualesdesechosydescontaminacin/10/${codcom}.json` 
    diccionarioSalida["SII 4-10-Suministro de Agua; Aguas Residuales, Desechos y Descontaminación "] = getMapa2(url);

    //2 11
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/suministrodeaguaaguasresidualesdesechosydescontaminacin/11/${codcom}.json` 
    diccionarioSalida["SII 4-11-Suministro de Agua; Aguas Residuales, Desechos y Descontaminación "] = getMapa2(url);

    //3 12
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/suministrodeaguaaguasresidualesdesechosydescontaminacin/12/${codcom}.json` 
    diccionarioSalida["SII 4-12-Suministro de Agua; Aguas Residuales, Desechos y Descontaminación "] = getMapa2(url);

    //4 13
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/suministrodeaguaaguasresidualesdesechosydescontaminacin/13/${codcom}.json` 
    diccionarioSalida["SII 4-13-Suministro de Agua; Aguas Residuales, Desechos y Descontaminación "] = getMapa2(url);

    //1 10
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/administracionpblicaydefensaseguridadsocial/10/${codcom}.json` 
    diccionarioSalida["SII 4-10-Administracion Pública y Defensa; Seguridad Social "] = getMapa2(url);

    //2 11
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/administracionpblicaydefensaseguridadsocial/11/${codcom}.json` 
    diccionarioSalida["SII 4-11-Administracion Pública y Defensa; Seguridad Social "] = getMapa2(url);

    //3 12
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/administracionpblicaydefensaseguridadsocial/12/${codcom}.json` 
    diccionarioSalida["SII 4-12-Administracion Pública y Defensa; Seguridad Social "] = getMapa2(url);

    //4 13
    url = `https://raw.githubusercontent.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/main/sii/sii4/administracionpblicaydefensaseguridadsocial/13/${codcom}.json` 
    diccionarioSalida["SII 4-13-Administracion Pública y Defensa; Seguridad Social "] = getMapa2(url);
    return diccionarioSalida;

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