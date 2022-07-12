class Todos_Rectangulos{
    constructor(){
        this.medidas = [
            [1,2],
            [2,3],
            [20,70],
            [3,3]    
        ]
        this.rectangulos = this.medidas.map(x => new Rectangulo(x[0],x[1]))
    }
}

let data_rectangulos = new Todos_Rectangulos();