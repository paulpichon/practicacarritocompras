import { obtenerInfoProducto } from "./obtener-info-producto.js";

export const agregarProductoCarrito = ( e ) => {
    e.preventDefault();
    //verificar que hagan click en el boton de agregar al carrito
    if ( e.target.classList.contains('agregar-carrito') ) {
        //info del producto
        const infoProducto = e.target.parentElement.parentElement;
        //mandamos el info producto a otra funcion
        obtenerInfoProducto( infoProducto );
    }
    
}