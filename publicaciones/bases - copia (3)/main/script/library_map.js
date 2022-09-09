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


