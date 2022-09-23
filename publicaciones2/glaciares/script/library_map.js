const getDB = (urlData) =>{
    let rawData;
    $.get({
        url: urlData,
        success: data => rawData = data,        
        async: false
    });
    return rawData;
}

let dataCapaGlobal  = getDB("db/dataCapa1.json");
let dataGlobal      = getDB("db/dataGlobal1.json");
dataCapaGlobal = dataCapaGlobal.slice(0,2)

let dataColor   = getDB("data/dataColor1.json");
let dataIcono   = getDB("data/dataIcono1.json");


