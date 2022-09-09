//Mapa de Leaflet
let map = L.map("mapid",{
    minZoom: 0,
    maxZoom: 18,
    zoomSnap: 0,
    zoomDelta: 0.25
}).setView([-33.458725187656356, -70.66008634501547],10);
function slideToggleLegend(idLegenda) {
    //alert( "clicked " +idLegenda);
    $( "#" + idLegenda ).slideToggle( "slow", function() {
        // Animation complete.
    });
  }
//"Capa":"datos_de_pozos"
//"idcapa":26
//dataGlobal = dataGlobal.filter(x => x["idcapa"] == 10);
//https://github                .com/Sud-Austral/DATA_MAPA_PUBLIC_V2/raw/main/AGUAS/Iconos/solido1.png
//https://raw.githubusercontent .com/Sud-Austral/DATA_MAPA_PUBLIC_V2    /main/AGUAS/Iconos/Solido1.png

iconosDB = iconosDB.map( x =>{
    x.replaceAll("https://github","https://raw.githubusercontent")
    .replaceAll("/DATA_MAPA_PUBLIC_V2/raw","/DATA_MAPA_PUBLIC_V2")});

const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replaceAll(" ","")
    .replaceAll(":","")
    .replace(/[^a-zA-Z ]/g, "");
    } 

function getIcon(url){
    url = url?url:"https://github.com/Sud-Austral/DATA_MAPA_PUBLIC_V2/raw/main/svg/default.png";
    let myIcon;
    if(url.split(".")[1] == "svg"){
        myIcon = L.icon({
            iconUrl: url,
            iconSize:  [50,50]   //[25, 25] // width and height of the image in pixels
            });
    }
    else{
        myIcon = L.icon({
            iconUrl: url,
            iconSize:  [25,25]   //[25, 25] // width and height of the image in pixels
            });
    }
    return myIcon;
}

function getLayerMapBox(id){
    const base = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: id,
        tileSize: 512,
        zoomOffset: -1
    });
    return base;
}

function getMapaBase(){

    let todo = L.TileLayer.Provider.providers;
    
    const HEREv3_normalDay =L.tileLayer.provider('HEREv3.normalDay', {apiKey: 'SjU6SSxb2QKvye8tQtgvPnCmX-TbmwtTtJol3gz57iI'});
    const HEREv3_terrainDay =L.tileLayer.provider('HEREv3.terrainDay', {
        apiKey: 'SjU6SSxb2QKvye8tQtgvPnCmX-TbmwtTtJol3gz57iI'
    });
    const HEREv3_normalDayCustom             = L.tileLayer.provider('HEREv3.normalDayCustom', {apiKey: 'SjU6SSxb2QKvye8tQtgvPnCmX-TbmwtTtJol3gz57iI'});
    const HEREv3_normalDayGrey               = L.tileLayer.provider('HEREv3.normalDayGrey', {apiKey: 'SjU6SSxb2QKvye8tQtgvPnCmX-TbmwtTtJol3gz57iI'});
    const HEREv3_normalDayMobile             = L.tileLayer.provider('HEREv3.normalDayMobile', {apiKey: 'SjU6SSxb2QKvye8tQtgvPnCmX-TbmwtTtJol3gz57iI'});
    const HEREv3_normalDayGreyMobile         = L.tileLayer.provider('HEREv3.normalDayGreyMobile', {apiKey: 'SjU6SSxb2QKvye8tQtgvPnCmX-TbmwtTtJol3gz57iI'});
    const HEREv3_normalDayTransit            = L.tileLayer.provider('HEREv3.normalDayTransit', {apiKey: 'SjU6SSxb2QKvye8tQtgvPnCmX-TbmwtTtJol3gz57iI'});
    const HEREv3_normalDayTransitMobile      = L.tileLayer.provider('HEREv3.normalDayTransitMobile', {apiKey: 'SjU6SSxb2QKvye8tQtgvPnCmX-TbmwtTtJol3gz57iI'});
    const HEREv3_normalNight                 = L.tileLayer.provider('HEREv3.normalNight', {apiKey: 'SjU6SSxb2QKvye8tQtgvPnCmX-TbmwtTtJol3gz57iI'});
    const HEREv3_normalNightMobile           = L.tileLayer.provider('HEREv3.normalNightMobile', {apiKey: 'SjU6SSxb2QKvye8tQtgvPnCmX-TbmwtTtJol3gz57iI'});
    const HEREv3_normalNightGrey             = L.tileLayer.provider('HEREv3.normalNightGrey', {apiKey: 'SjU6SSxb2QKvye8tQtgvPnCmX-TbmwtTtJol3gz57iI'});
    const HEREv3_normalNightGreyMobile       = L.tileLayer.provider('HEREv3.normalNightGreyMobile', {apiKey: 'SjU6SSxb2QKvye8tQtgvPnCmX-TbmwtTtJol3gz57iI'});
    const HEREv3_normalNightTransit          = L.tileLayer.provider('HEREv3.normalNightTransit', {apiKey: 'SjU6SSxb2QKvye8tQtgvPnCmX-TbmwtTtJol3gz57iI'});
    const HEREv3_normalNightTransitMobile    = L.tileLayer.provider('HEREv3.normalNightTransitMobile', {apiKey: 'SjU6SSxb2QKvye8tQtgvPnCmX-TbmwtTtJol3gz57iI'});
    const HEREv3_reducedDay                  = L.tileLayer.provider('HEREv3.reducedDay', {apiKey: 'SjU6SSxb2QKvye8tQtgvPnCmX-TbmwtTtJol3gz57iI'});
    const HEREv3_reducedNight                = L.tileLayer.provider('HEREv3.reducedNight', {apiKey: 'SjU6SSxb2QKvye8tQtgvPnCmX-TbmwtTtJol3gz57iI'});
    const HEREv3_basicMap                    = L.tileLayer.provider('HEREv3.basicMap', {apiKey: 'SjU6SSxb2QKvye8tQtgvPnCmX-TbmwtTtJol3gz57iI'});
    const HEREv3_mapLabels                   = L.tileLayer.provider('HEREv3.mapLabels', {apiKey: 'SjU6SSxb2QKvye8tQtgvPnCmX-TbmwtTtJol3gz57iI'});
    //const HEREv3_trafficFlow                 = L.tileLayer.provider('HEREv3.trafficFlow', {apiKey: 'SjU6SSxb2QKvye8tQtgvPnCmX-TbmwtTtJol3gz57iI'});
    const HEREv3_carnavDayGrey               = L.tileLayer.provider('HEREv3.carnavDayGrey', {apiKey: 'SjU6SSxb2QKvye8tQtgvPnCmX-TbmwtTtJol3gz57iI'});
    const HEREv3_hybridDay                   = L.tileLayer.provider('HEREv3.hybridDay', {apiKey: 'SjU6SSxb2QKvye8tQtgvPnCmX-TbmwtTtJol3gz57iI'});
    const HEREv3_hybridDayMobile             = L.tileLayer.provider('HEREv3.hybridDayMobile', {apiKey: 'SjU6SSxb2QKvye8tQtgvPnCmX-TbmwtTtJol3gz57iI'});
    const HEREv3_hybridDayTransit            = L.tileLayer.provider('HEREv3.hybridDayTransit', {apiKey: 'SjU6SSxb2QKvye8tQtgvPnCmX-TbmwtTtJol3gz57iI'});
    const HEREv3_hybridDayGrey               = L.tileLayer.provider('HEREv3.hybridDayGrey', {apiKey: 'SjU6SSxb2QKvye8tQtgvPnCmX-TbmwtTtJol3gz57iI'});
    const HEREv3_pedestrianDay               = L.tileLayer.provider('HEREv3.pedestrianDay', {apiKey: 'SjU6SSxb2QKvye8tQtgvPnCmX-TbmwtTtJol3gz57iI'});
    const HEREv3_pedestrianNight             = L.tileLayer.provider('HEREv3.pedestrianNight', {apiKey: 'SjU6SSxb2QKvye8tQtgvPnCmX-TbmwtTtJol3gz57iI'});
    const HEREv3_satelliteDay                = L.tileLayer.provider('HEREv3.satelliteDay', {apiKey: 'SjU6SSxb2QKvye8tQtgvPnCmX-TbmwtTtJol3gz57iI'});
    const HEREv3_terrainDayMobile            = L.tileLayer.provider('HEREv3.terrainDayMobile', {apiKey: 'SjU6SSxb2QKvye8tQtgvPnCmX-TbmwtTtJol3gz57iI'});

    const OpenStreetMap_German_Style = L.tileLayer.provider('OpenStreetMap.DE');
    const OpenStreetMap_H_O_T= L.tileLayer.provider('OpenStreetMap.HOT');
    
    //const OpenStreetMap_Mapnik = L.tileLayer.provider('OpenStreetMap.Mapnik');
    //const OpenStreetMap_H_O_T= L.tileLayer.provider('OpenStreetMap.HOT');
    
    
    
    const Thunderforest_OpenCycleMap= L.tileLayer.provider('Thunderforest.OpenCycleMap');
    const Thunderforest_Transport= L.tileLayer.provider('Thunderforest.Transport');
    //const Thunderforest_Landscape= L.tileLayer.provider('Thunderforest.Landscape');
    const Stamen_Toner= L.tileLayer.provider('Stamen.Toner');
    const Stamen_Terrain= L.tileLayer.provider('Stamen.Terrain');
    const Stamen_Watercolor= L.tileLayer.provider('Stamen.Watercolor');
    const Jawg_Streets= L.tileLayer.provider('Jawg.Streets');
    const Jawg_Terrain= L.tileLayer.provider('Jawg.Terrain');
    const Esri_WorldStreetMap= L.tileLayer.provider('Esri.WorldStreetMap');
    const Esri_DeLorme= L.tileLayer.provider('Esri.DeLorme');
    const Esri_WorldTopoMap= L.tileLayer.provider('Esri.WorldTopoMap');
    const Esri_WorldImagery= L.tileLayer.provider('Esri.WorldImagery');
    const Esri_WorldTerrain= L.tileLayer.provider('Esri.WorldTerrain');
    const Esri_WorldShadedRelief= L.tileLayer.provider('Esri.WorldShadedRelief');
    const Esri_WorldPhysical= L.tileLayer.provider('Esri.WorldPhysical');
    const Esri_OceanBasemap= L.tileLayer.provider('Esri.OceanBasemap');
    const Esri_NatGeoWorldMap= L.tileLayer.provider('Esri.NatGeoWorldMap');
    const Esri_WorldGrayCanvas= L.tileLayer.provider('Esri.WorldGrayCanvas');
    const Geoportail_France_Maps= L.tileLayer.provider('GeoportailFrance');
    const Geoportail_France_Orthos= L.tileLayer.provider('GeoportailFrance.orthos');
    const USGS_USTopo= L.tileLayer.provider('USGS.USTopo');
    const USGS_USImagery= L.tileLayer.provider('USGS.USImagery');
    const USGS_USImageryTopo= L.tileLayer.provider('USGS.USImageryTopo');
    const OpenSeaMap= L.tileLayer.provider('OpenSeaMap');
    const OpenWeatherMap_Clouds= L.tileLayer.provider('OpenWeatherMap.Clouds');
    const OpenWeatherMap_CloudsClassic= L.tileLayer.provider('OpenWeatherMap.CloudsClassic');
    const OpenWeatherMap_Precipitation= L.tileLayer.provider('OpenWeatherMap.Precipitation');
    const OpenWeatherMap_PrecipitationClassic= L.tileLayer.provider('OpenWeatherMap.PrecipitationClassic');
    const OpenWeatherMap_Rain= L.tileLayer.provider('OpenWeatherMap.Rain');
    const OpenWeatherMap_RainClassic= L.tileLayer.provider('OpenWeatherMap.RainClassic');
    const OpenWeatherMap_Pressure= L.tileLayer.provider('OpenWeatherMap.Pressure');
    const OpenWeatherMap_PressureContour= L.tileLayer.provider('OpenWeatherMap.PressureContour');
    const OpenWeatherMap_Wind= L.tileLayer.provider('OpenWeatherMap.Wind');
    const OpenWeatherMap_Temperature= L.tileLayer.provider('OpenWeatherMap.Temperature');
    const OpenWeatherMap_Snow= L.tileLayer.provider('OpenWeatherMap.Snow');
    const Geoportail_France_Parcels= L.tileLayer.provider('GeoportailFrance.parcels');
    const Waymarked_Trails_Hiking= L.tileLayer.provider('WaymarkedTrails.hiking');
    const Waymarked_Trails_Cycling= L.tileLayer.provider('WaymarkedTrails.cycling');
    const Waymarked_Trails_MTB= L.tileLayer.provider('WaymarkedTrails.mtb');
    const Waymarked_Trails_Ski_Slopes= L.tileLayer.provider('WaymarkedTrails.slopes');
    const Waymarked_Trails_Riding= L.tileLayer.provider('WaymarkedTrails.riding');
    const Waymarked_Trails_Skating= L.tileLayer.provider('WaymarkedTrails.skating');
        
    
    
    
    const base8 = L.tileLayer.provider('Stamen.Watercolor');
    const base4 = getLayerMapBox("mapbox/light-v10");
    const base5 = getLayerMapBox("mapbox/satellite-v9");
    const base6 = getLayerMapBox("mapbox/navigation-day-v1");
    const base7 = getLayerMapBox("mapbox/navigation-night-v1");

    const base = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,    
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        
        //id:"mapbox/light-v10",
        /*
        mapbox/light-v10
        mapbox/dark-v10
        mapbox/satellite-streets-v11
        mapbox/navigation-day-v1
        mapbox/navigation-night-v1
        */
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
    let salidaFinal = {"Mapa claro":base, "Mapa Oscuro":base2, "Mapa Satelital":base3,
            "Gris":base4,"Satelite sin calles":base5,"Navegación Diario":base6,"Navegación nocturna":base7,
            "HEREv3_normalDay":HEREv3_normalDay,
            "HEREv3_terrainDay":HEREv3_terrainDay,
            "HEREv3_normalDayCustom"             :HEREv3_normalDayCustom,
            "HEREv3_normalDayGrey"               :HEREv3_normalDayGrey,
            "HEREv3_normalDayMobile"             :HEREv3_normalDayMobile,
            "HEREv3_normalDayGreyMobile"         :HEREv3_normalDayGreyMobile,
            "HEREv3_normalDayTransit"            :HEREv3_normalDayTransit,
            "HEREv3_normalDayTransitMobile"      :HEREv3_normalDayTransitMobile,
            "HEREv3_normalNight"                 :HEREv3_normalNight,
            "HEREv3_normalNightMobile"           :HEREv3_normalNightMobile,
            "HEREv3_normalNightGrey"             :HEREv3_normalNightGrey,
            "HEREv3_normalNightGreyMobile"       :HEREv3_normalNightGreyMobile,
            "HEREv3_normalNightTransit"          :HEREv3_normalNightTransit,
            "HEREv3_normalNightTransitMobile"    :HEREv3_normalNightTransitMobile,
            "HEREv3_reducedDay"                  :HEREv3_reducedDay,
            "HEREv3_reducedNight"                :HEREv3_reducedNight,
            "HEREv3_basicMap"                    :HEREv3_basicMap,
            "HEREv3_mapLabels"                   :HEREv3_mapLabels,
            //"HEREv3_trafficFlow"                 :HEREv3_trafficFlow,
            "HEREv3_carnavDayGrey"               :HEREv3_carnavDayGrey,
            "HEREv3_hybridDay"                   :HEREv3_hybridDay,
            "HEREv3_hybridDayMobile"             :HEREv3_hybridDayMobile,
            "HEREv3_hybridDayTransit"            :HEREv3_hybridDayTransit,
            "HEREv3_hybridDayGrey"               :HEREv3_hybridDayGrey,
            "HEREv3_pedestrianDay"               :HEREv3_pedestrianDay,
            "HEREv3_pedestrianNight"             :HEREv3_pedestrianNight,
            "HEREv3_satelliteDay"                :HEREv3_satelliteDay,
            "HEREv3_terrainDayMobile"            :HEREv3_terrainDayMobile}
        /*    
        "HEREv3_normalDay":HEREv3_normalDay,
        "HEREv3_terrainDay":HEREv3_terrainDay,
        "HEREv3_normalDayCustom"             :HEREv3_normalDayCustom,
        "HEREv3_normalDayGrey"               :HEREv3_normalDayGrey,
        "HEREv3_normalDayMobile"             :HEREv3_normalDayMobile,
        "HEREv3_normalDayGreyMobile"         :HEREv3_normalDayGreyMobile,
        "HEREv3_normalDayTransit"            :HEREv3_normalDayTransit,
        "HEREv3_normalDayTransitMobile"      :HEREv3_normalDayTransitMobile,
        "HEREv3_normalNight"                 :HEREv3_normalNight,
        "HEREv3_normalNightMobile"           :HEREv3_normalNightMobile,
        "HEREv3_normalNightGrey"             :HEREv3_normalNightGrey,
        "HEREv3_normalNightGreyMobile"       :HEREv3_normalNightGreyMobile,
        "HEREv3_normalNightTransit"          :HEREv3_normalNightTransit,
        "HEREv3_normalNightTransitMobile"    :HEREv3_normalNightTransitMobile,
        "HEREv3_reducedDay"                  :HEREv3_reducedDay,
        "HEREv3_reducedNight"                :HEREv3_reducedNight,
        "HEREv3_basicMap"                    :HEREv3_basicMap,
        "HEREv3_mapLabels"                   :HEREv3_mapLabels,
        //"HEREv3_trafficFlow"                 :HEREv3_trafficFlow,
        "HEREv3_carnavDayGrey"               :HEREv3_carnavDayGrey,
        "HEREv3_hybridDay"                   :HEREv3_hybridDay,
        "HEREv3_hybridDayMobile"             :HEREv3_hybridDayMobile,
        "HEREv3_hybridDayTransit"            :HEREv3_hybridDayTransit,
        "HEREv3_hybridDayGrey"               :HEREv3_hybridDayGrey,
        "HEREv3_pedestrianDay"               :HEREv3_pedestrianDay,
        "HEREv3_pedestrianNight"             :HEREv3_pedestrianNight,
        "HEREv3_satelliteDay"                :HEREv3_satelliteDay,
        "HEREv3_terrainDayMobile"            :HEREv3_terrainDayMobile,
        "Base ejemplo":base8,
        "OpenStreetMap_German_Style"             :OpenStreetMap_German_Style, 
        "OpenStreetMap_H_O_T"                    :OpenStreetMap_H_O_T,
        "Thunderforest_OpenCycleMap"             :Thunderforest_OpenCycleMap,
        "Thunderforest_Transport"                :Thunderforest_Transport,
        //"Thunderforest_Landscap"                 :Thunderforest_Landscap,
        "Stamen_Toner"                           :Stamen_Toner,
        "Stamen_Terrain"                         :Stamen_Terrain,
        "Stamen_Watercolor"                      :Stamen_Watercolor,
        //"Jawg_Streets"                           :Jawg_Streets, 
        //"Jawg_Terrain"                           :Jawg_Terrain, 
        "Esri_WorldStreetMap"                    :Esri_WorldStreetMap,
        "Esri_DeLorme"                           :Esri_DeLorme,
        "Esri_WorldTopoMap"                      :Esri_WorldTopoMap, 
        "Esri_WorldImagery"                      :Esri_WorldImagery, 
        "Esri_WorldTerrain"                      :Esri_WorldTerrain, 
        "Esri_WorldShadedRelief"                 :Esri_WorldShadedRelief, 
        "Esri_WorldPhysical"                     :Esri_WorldPhysical, 
        "Esri_OceanBasemap"                      :Esri_OceanBasemap, 
        "Esri_NatGeoWorldMap"                    :Esri_NatGeoWorldMap,
        "Esri_WorldGrayCanvas"                   :Esri_WorldGrayCanvas,      
        "Geoportail_France_Maps"                 :Geoportail_France_Maps,
        "Geoportail_France_Orthos"               :Geoportail_France_Orthos, 
        "USGS_USTopo"                            :USGS_USTopo, 
        "USGS_USImagery"                         :USGS_USImagery, 
        "USGS_USImageryTopo"                     :USGS_USImageryTopo, 
        "OpenSeaMap"                             :OpenSeaMap, 
        "OpenWeatherMap_Clouds"                  :OpenWeatherMap_Clouds, 
        "OpenWeatherMap_CloudsClassic"           :OpenWeatherMap_CloudsClassic, 
        "OpenWeatherMap_Precipitation"           :OpenWeatherMap_Precipitation, 
        "OpenWeatherMap_PrecipitationClassic"    :OpenWeatherMap_PrecipitationClassic,
        "OpenWeatherMap_Rain"                    :OpenWeatherMap_Rain, 
        "OpenWeatherMap_RainClassic"             :OpenWeatherMap_RainClassic, 
        "OpenWeatherMap_Pressure"                :OpenWeatherMap_Pressure,
        "OpenWeatherMap_PressureContour"         :OpenWeatherMap_PressureContour, 
        "OpenWeatherMap_Wind"                    :OpenWeatherMap_Wind, 
        "OpenWeatherMap_Temperature"             :OpenWeatherMap_Temperature, 
        "OpenWeatherMap_Snow"                    :OpenWeatherMap_Snow,
        "Geoportail_France_Parcels"              :Geoportail_France_Parcels, 
        "Waymarked_Trails_Hiking"                :Waymarked_Trails_Hiking, 
        "Waymarked_Trails_Cycling"               :Waymarked_Trails_Cycling, 
        "Waymarked_Trails_MTB"                   :Waymarked_Trails_MTB, 
        "Waymarked_Trails_Ski_Slopes"            :Waymarked_Trails_Ski_Slopes, 
        "Waymarked_Trails_Riding"                :Waymarked_Trails_Riding, 
        "Waymarked_Trails_Skating"               :Waymarked_Trails_Skating };
        */
       //
        Object.keys(todo).forEach( x => {            
            if(todo[x]["options"]["apiKey"]){
                //console.log(x,todo[x]["options"]["apiKey"],todo[x]["options"]["apikey"])
                return null;
            }
            if(todo[x]["options"]["apikey"]){
                //console.log(x,todo[x]["options"]["apiKey"],todo[x]["options"]["apikey"])
                return null;
            }
            if(todo[x]["options"]["accessToken"]){
                return null;
            }
            if(todo[x]["options"]["key"]){
                return null;
            }
            if(todo[x]["options"]["subscriptionKey"]){
                return null;
            }
            console.log(x,todo[x])
            //console.log("Principal",todo[x])
            //console.log("Base",x);
            if(todo[x]["variants"]){
                Object.keys(todo[x]["variants"]).forEach(j =>{ 
                    let name = `${x}.${j}`;
                    salidaFinal[name] = L.tileLayer.provider(name);   
            })}
            else{
                //console.log("Problemas",x,todo[x])
                salidaFinal[x] = L.tileLayer.provider(x);
            }
        });
            /*
            console.log(todo[x]["options"]["apiKey"])
            console.log("Base",x);
            if(todo[x]["variants"]){
                Object.keys(todo[x]["variants"]).forEach(x =>{ console.log("Variable",x)

            })}
            */
            //console.log(todo[x]["variants"] )
        
        return salidaFinal;
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
        //console.log("SetLEgenda")
        //console.log(nombre);
        //console.log(1,dicAux)
        //console.log(2,dicAux2)
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
        this.controlTotalCapas = L.control.layers(comunaBase.mapasBases, null, {
            position: 'topright',
            collapsed:  true
        }).addTo(map);    
    }
}

//let detalle = new MAPAGLOBAL();
let comunaBase = new COMUNABASE();
let detalle = new MAPAGLOBAL(comunaBase); 


//let bandera = true;







