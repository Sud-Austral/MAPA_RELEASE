//let comuna = new COMUNABASE();
//let controlCapa =  new ControlGlobalCapa();
//let global = new MAPAGLOBAL(comuna,controlCapa);

/*
let mapaBase = new MapBase();
let controlCapa =  new ControlGlobalCapa();

let controlComuna = controlGlobalCapa = L.control.layers(null, this.jsonComuna, {
    position: 'topleft', // 'topleft', 'bottomleft', 'bottomright'
    collapsed: true // true
}).addTo(map);

["13101","13102",//"13103","13104","13105","13106","13107","13108",
//"13109","13110","13111","13112","13113","13114","13115","13116",
//"13117","13118","13119","13120","13121","13122","13123","13124"
].map(x => {
   let comuna = new COMUNABASE(x,controlComuna);   
   let global = new MAPAGLOBAL(comuna,controlCapa);
   return [comuna,global]
})
*/

let general = new MultiMap();
general.renderComuna();
general.renderCapa();


//general.hideControl()


//let url = "https://raw.githubusercontent.com/Sud-Austral/mapa_insumos2/main/osm/trafico_aereo_aerodromo/13101.json";
//let url2 = "https://raw.githubusercontent.com/Sud-Austral/mapa_insumos/main/uso_suelo/catastro/13101.json1";      
//UTIL.setCapa(url2,"hola",controlCapa);

/*
for (let index = 0; index < 999; index++) {
    var today = new Date();
 
    // obtener la fecha y la hora
    var now = today.toLocaleString();
    console.log("inicio",index,now);
    UTIL.setCapa(url2,"hola" + index,controlCapa); 
      
}
*/


//$("#span_mapa").parent().css("width","50%");









