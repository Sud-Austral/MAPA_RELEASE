var leyendasGlobal = []

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function slideToggleSideMenu(contenido) {
    $("#" + contenido).slideToggle( "slow", function() {
        // Animation complete.
    });
}

function cargar(){
    $(".loader").show();
    setTimeout(() => {
        $(".loader").fadeOut("slow");
    }, 2000); 


}


function checkComuna(inputObject, comuna){
    //cargar();
    let objeto = $(inputObject);
    


    if(objeto.is(":checked")){
        $("#div-input-capas input").each((x,y)=> {
            let objeto = $(y);
            let capaNombre = objeto.attr("value");
            let capaID = "#"+objeto.attr("value") + comuna;
            if(objeto.is(":checked")){
                //console.log(capaNombre)
                //$(".loader").show();
                //console.log(capaNombre,comuna)
                general.activateCapa(capaNombre,comuna);
                //$(capaID).trigger("click")
            }
        });
    }
    else{
        $("#div-input-capas input").each((x,y)=> {
            let objeto = $(y);
            if(objeto.is(":checked")){
                //console.log()
                let capaID = "#"+objeto.attr("value") + comuna;
                console.log(capaID)
                $(capaID).trigger("click")
            }
        });
    }
}

function checkCapa(inputObject, capa){
    //cargar();
    let objeto = $(inputObject);
    if(objeto.is(":checked")){
        $("#div-input-comunas input").each((x,y)=> {
            let objeto = $(y);
            let capaID = "#"+ capa + objeto.attr("value");
            if(objeto.is(":checked")){
                general.activateCapa(capa,objeto.attr("value"));
                //$(capaID).trigger("click")
            }
        })
    }
    else{
        $("#div-input-comunas input").each((x,y)=> {
            let objeto = $(y);
            if(objeto.is(":checked")){
                let capaID = "#"+ capa + objeto.attr("value");
                $(capaID).trigger("click")
            }
        });
    }
    console.log(leyendasGlobal)
    leyendasGlobal.forEach(x => {
        x.remove();
        console.log(x);
    });
    leyendasGlobal = [];
    setTimeout(() => {
        //console.log("acumulador",acumuladorGlobal);
        let acumuladoSimple = acumuladorGlobal.map(
            x => x["data"]["features"].map(
                y => y["properties"]
            )
        ).reduce( (x,y)=> x.concat(y));
        let variable = acumuladorGlobal.map(
            x => x["propiedad"]
        )
        variable = [...new Set(variable)]
        console.log("variables",variable)
        variable.forEach(
            variableUnica =>{
                let unicos = acumuladoSimple.map(
                    x => x[variableUnica]
                )
                unicos = [...new Set(unicos)]
                let findDescripcion = acumuladorGlobal.filter(x => x["propiedad"] == variableUnica)[0]["descripcion"];
                
                let objReferencia = dataGlobal.filter(x => x["descripcion_capa"] == findDescripcion)[0];
                
                let nameProperties = objReferencia["Propiedad"];
                let paletaReferencia = objReferencia["Color"];
                let colorDBReferencia = dataColor.filter(x => x["Paleta"] == paletaReferencia);

                //console.log(variableUnica)
                
                let jsonColoresRandom = {}; 
                let contadorColor = 0; 
                var legend = L.control({position: 'bottomright'});
                let htmlString = ""
                unicos.forEach(
                    x =>{
                        jsonColoresRandom[x] = colorDBReferencia[contadorColor%colorDBReferencia.length]["Color"];
                        contadorColor++;
                        htmlString = htmlString + `<span> Color: ${jsonColoresRandom[x]} - Valor: ${x}</span>`
                    });
                //console.log("Simple",unicos)
                //console.log(jsonColoresRandom,variableUnica);
                
                legend.onAdd = function (map) {
                    var div = L.DomUtil.create('div', 'info legend');
                    div.innerHTML = htmlString;
                    return div;
                };
                
                leyendasGlobal.push(legend)
                legend.addTo(map);
                console.log("Deberia haber leyenda")
            }
        )
        //console.log("Simple",variable,acumuladoSimple[0][variable])
        /*
        let unicos = acumuladoSimple.map(
            x => x[variable]
        )
        print(unicos)
        unicos = [...new Set(unicos)]
        console.log("Simple",unicos)
        */
    }, 5000);
}



// LZW-compress a string
function lzw_encode(s) {
    var dict = {};
    var data = (s + "").split("");
    var out = [];
    var currChar;
    var phrase = data[0];
    var code = 256;
    for (var i=1; i<data.length; i++) {
        currChar=data[i];
        if (dict[phrase + currChar] != null) {
            phrase += currChar;
        }
        else {
            out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
            dict[phrase + currChar] = code;
            code++;
            phrase=currChar;
        }
    }
    out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
    for (var i=0; i<out.length; i++) {
        out[i] = String.fromCharCode(out[i]);
    }
    return out.join("");
}

// Decompress an LZW-encoded string
function lzw_decode(s) {
    var dict = {};
    var data = (s + "").split("");
    var currChar = data[0];
    var oldPhrase = currChar;
    var out = [currChar];
    var code = 256;
    var phrase;
    for (var i=1; i<data.length; i++) {
        var currCode = data[i].charCodeAt(0);
        if (currCode < 256) {
            phrase = data[i];
        }
        else {
           phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
        }
        out.push(phrase);
        currChar = phrase.charAt(0);
        dict[code] = oldPhrase + currChar;
        code++;
        oldPhrase = phrase;
    }
    return out.join("");
}


function marcar_comunas(){
    //alert("Hola")
    $("#div-input-comunas input").each((x,y)=> {
        let objeto = $(y);
        if(!objeto.is(":checked")){
            //let capaID = "#"+ capa + objeto.attr("value");
            //$(capaID).trigger("click")
            $(objeto).trigger("click")
            console.log(objeto)
        }
    });
}

/*

$($(".leaflet-control-layers-list")[0])
*/
let flagBotonComunas = true;

function marcarTodoComuna(mismoBoton){
    flagBotonComunas?$(mismoBoton).text("Mostrar comunas"):$(mismoBoton).text("Ocultar comunas");
    let listaComuna = $($(".leaflet-control-layers-list")[0])
    listaComuna.find("input").each((x,y) =>{
        let boton = $(y);
        if(boton.is(":checked") == flagBotonComunas){
            boton.trigger("click");
        }
    });
    flagBotonComunas = !flagBotonComunas;
}