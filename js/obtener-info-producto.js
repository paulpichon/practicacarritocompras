//importamos la funcion para renderizar los cursos
import { cursosHTML } from "./cursos-html.js";

//declaramos un arreglo vacio donde se iran acumulando los cursos
let arregloCursos = [];

const obtenerInfoProducto = ( infoProducto ) => {
    //creamos un objeto con la info que necesitamos
    const infoObj = {
        imagen: infoProducto.querySelector('img').src,
        titulo: infoProducto.querySelector('h4').textContent,
        precio: infoProducto.querySelector('p.precio span').textContent,
        cantidad: 1
    }

    //agregamos el objeto al arreglo
    arregloCursos = [ ...arregloCursos, infoObj ];
    //llamamos la funcion para renderizarlos
    cursosHTML();
}

export {
    obtenerInfoProducto,
    arregloCursos
}