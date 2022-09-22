let comuna = new COMUNABASE();
let controlCapa =  new ControlGlobalCapa();
let global = new MAPAGLOBAL(comuna,controlCapa);



let url = "https://raw.githubusercontent.com/Sud-Austral/mapa_insumos2/main/osm/trafico_aereo_aerodromo/13101.json";
let url2 = "https://raw.githubusercontent.com/Sud-Austral/mapa_insumos2/main/osm/templo_religioso_templo_cristiano/13101.json1";      
//UTIL.setCapa(url2,"hola",controlCapa);

/*
for (let index = 0; index < 99; index++) {
    UTIL.setCapa(url,"hola" + index,controlCapa);    
}
*/
$(".loader").fadeOut("slow");








