//let comuna = new COMUNABASE();
//let controlCapa =  new ControlGlobalCapa();
//let global = new MAPAGLOBAL(comuna,controlCapa);
let mapaBase = new MapBase();


["13101"].map(x => {
    let comuna = new COMUNABASE(x);
    let controlCapa =  new ControlGlobalCapa();
    let global = new MAPAGLOBAL(comuna,controlCapa);
    return [comuna,global]
})



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









