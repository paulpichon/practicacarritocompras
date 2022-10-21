//variables
const listaCursos = document.querySelector('#lista-cursos');
//variable que hace referencia a donde se mostraran los curso en el carrito
const listaCarrito = document.querySelector('#lista-carrito');
//borrar curso
const carrito = document.querySelector('#carrito');
//vaciar carrito
const vaciarCarrito = document.querySelector('#vaciar-carrito');
//arreglo vacio donde se almacenaran los cursos agregados
let cursosSeleccinados = [];

//listeners
eventListeners();
function eventListeners() {
    //agrecar cursos
    listaCursos.addEventListener('click', agregarCurso);
    //listener a carrito
    carrito.addEventListener('click', borrarCurso);
    //vaciar carrito
    vaciarCarrito.addEventListener('click', () => {
        cursosSeleccinados = [];
        cursoHTML();
    });
    //recuperar los cursos en storage
    document.addEventListener('DOMContentLoaded', () => {
        cursosSeleccinados = JSON.parse( localStorage.getItem('carritoStorage') ) || [];
        //RENDERIZAR
        cursoHTML();
    });
}
//funciones
//funcion para gregar curso
function agregarCurso( e ) {
    //prevenir la accion por defecto
    e.preventDefault();
    //console.log(e.target.classList.contains('agregar-carrito') );
    //verificar que hagan click en el boton de agregar cursos
    if ( e.target.classList.contains('agregar-carrito') ) {
        //seleccionar el html del curso seleccionado
        const cursoSeleccionado = e.target.parentElement.parentElement;
        //lo mandamos a la funcion que leera la info del html
        leerInfoCurso( cursoSeleccionado );
    }
}
//funcion para leer la informacion del curso seleccionado
function leerInfoCurso( cursoSeleccionado ) {
    //construimos un objeto con la informacion del cursos seleccionado
    const cursoInfo = {
        imagen: cursoSeleccionado.querySelector('img').src,
        titulo: cursoSeleccionado.querySelector('h4').textContent,
        precio: cursoSeleccionado.querySelector('p.precio span').textContent,
        cantidad : 1,
        id: cursoSeleccionado.querySelector('a').getAttribute('data-id')
    }
    //aumentar cantidad en caso de presionar el mismo curso
    const existe = cursosSeleccinados.some( curso => curso.id === cursoInfo.id );
    //en caso de que existe
    if ( existe ) {
        const curso = cursosSeleccinados.map( curso => {
            if ( curso.id === cursoInfo.id ) {
                //aumentar la cantidad
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        });
        //asignamos el nuevo valor curso a cursosSeleccinados
        cursosSeleccinados = curso;
    }else {
        //de lo contrario solo se agrega normalmente
        //arreglo cursosSeleccinados
        cursosSeleccinados = [ ...cursosSeleccinados, cursoInfo ];
    }

    
    //mandar a funcion para renderizar los cursos en el carrito
    cursoHTML();
}
///algo aqui
//funcion para renderizar los cursos
function cursoHTML() {
    //limipar el html anterior
    limpiarHTML();
    //con un foreach recorremos el arreglo
    cursosSeleccinados.forEach( curso => {
        //destructuring
        const { cantidad, id, imagen, precio, titulo } = curso;
        //construir el html
        const row = document.createElement('tr');
        //innertext
        row.innerHTML = `
            <td><img src="${ imagen }" width="100" ></td>
            <td>${ titulo }</td>
            <td>${ precio }</td>
            <td>${ cantidad }</td>
            <td><a class="borrar-curso" target="#" data-id="${ id }" >x</a></td>
        `;
        //renderizar
        listaCarrito.appendChild( row );
    });
    //sincronizar el storage
    sincronizarStorage();
}
//borrar curso
function borrarCurso( e ) {
    //console.log( e.target.classList.contains('borrar-curso') );
    if ( e.target.classList.contains('borrar-curso') ) {
        const idCurso = e.target.getAttribute('data-id');
        cursosSeleccinados = cursosSeleccinados.filter( curso => curso.id !== idCurso );
        //renderizamos
        cursoHTML();
    }
}
//funcion para sincrnizar el local storage
function sincronizarStorage() {
    localStorage.setItem( 'carritoStorage', JSON.stringify( cursosSeleccinados ) );
}
//limpiar el html anterior
function limpiarHTML() {
    while( listaCarrito.firstChild ) {
        listaCarrito.removeChild( listaCarrito.firstChild );
    }
}