class Rectangulo{
    constructor(alto, ancho){
        this.alto = alto;
        this.ancho = ancho;
        this.area = this.alto * this.ancho; 
    }

    getArea(){
        return this.alto * this.ancho;
    }
}

let rectangulo1 = new Rectangulo(10,5);
let rectangulo2 = new Rectangulo(100,25);
//console.log(rectangulo1)
//console.log(rectangulo2)