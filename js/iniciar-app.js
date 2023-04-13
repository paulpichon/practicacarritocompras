import { agregarProductoCarrito } from "./agregar-producto-carrito.js";

export const iniciarApp = () => {
    //constantes
    //lista de cursos
    const listaCursos = document.querySelector('#lista-cursos');
    //agregar un listener a lista cursos
    listaCursos.addEventListener('click', agregarProductoCarrito);
}