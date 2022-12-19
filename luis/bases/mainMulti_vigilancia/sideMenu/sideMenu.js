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