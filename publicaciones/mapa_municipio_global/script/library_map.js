const getDB = (urlData) =>{
    let rawData;
    $.get({
        url: urlData,
        success: data => rawData = data,        
        async: false
    });
    return rawData;
}
console.log("hola")
let dataCapaGlobal  = getDB("db/dataCapa1.json");
let dataGlobal      = getDB("db/dataGlobal1.json");
console.log(dataGlobal,dataCapaGlobal)

