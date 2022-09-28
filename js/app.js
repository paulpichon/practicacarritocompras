//variables
const listaCursos = document.querySelector('#lista-cursos');
//donde se renderizar los cursos seleccionados
const cursosCarrito = document.querySelector('#lista-carrito tbody');
//aqui se detectara cuando hagan click en borrar carrito
const carrito = document.querySelector('#carrito');
//vaciar carrito
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');
//arreglo que contendra los cursos seleccionados
let cursosSeleccionados = [];


//listeners
eventListener();

function eventListener() {
    //añadir listener a la variable que hace referencia a la lista de cursos
    listaCursos.addEventListener('click', agregarCurso);
    //borrar curso seleccionado
    carrito.addEventListener('click', borrarCurso);
    //cargar curso de storage al cargar la pagina
    document.addEventListener('DOMContentLoaded', () => {
        cursosSeleccionados = JSON.parse( localStorage.getItem('cursosStorage') );
        //renderizar
        carritoHTML();
    });
    //vaciar carrito
    btnVaciarCarrito.addEventListener('click', () => {
        //vaciar carrito
        cursosSeleccionados = [];
        //renderizar
        carritoHTML();
    });
}

//functions
//agregar cursos al carrito
function agregarCurso( e ) {
    //prevenir la accion por defecto
    e.preventDefault();
    //identificar cuando hagan click en "AGREGAR AL CARRITO"
    //console.log( e.target.classList.contains('agregar-carrito') );
    if ( e.target.classList.contains('agregar-carrito') ) {
        //html del curso seleccionado
        const cursoSeleccionado = e.target.parentElement.parentElement;
        //lo enviamos a una funcion para leer la info del curso
        leerInfoCurso( cursoSeleccionado );
    }
}
//funcion para leer la info del curso
function leerInfoCurso( cursoSeleccionado ) {
    //construimos el objeto con la info que necesitamos
    const cursoInfo = {
        imagen: cursoSeleccionado.querySelector('img').src,
        titulo: cursoSeleccionado.querySelector('h4').textContent,
        precio: cursoSeleccionado.querySelector('p.precio span').textContent,
        cantidad: 1,
        id: cursoSeleccionado.querySelector('a').getAttribute('data-id')
    }
    //actualizar cantidad de curso
    //verificar si existe el id del curso seleccinado en el arreglo
    const existe = cursosSeleccionados.some( curso => curso.id === cursoInfo.id );
    //en caso de que existe entra al IF()
    if ( existe ) {
        //con un if verificar si el id a agregar es igual a que esta en el arreglo
        const curso = cursosSeleccionados.map( curso => {
            if ( curso.id === cursoInfo.id) {
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        });
        //asignamos "curso" a el arreglo cursosSeleccionados
        cursosSeleccionados = curso;
    }else{
        //arreglo con cursos seleccionados
        cursosSeleccionados = [ ...cursosSeleccionados, cursoInfo ];   
    }
    //funcion para renderizar
    carritoHTML();
}
//borrar cursos
function borrarCurso( e ) {
    ///prevenir accion por defecto
    e.preventDefault();
    //detectar cuando hagan click en la clase
    if ( e.target.classList.contains('borrar-curso') ) {
        //id del curso a eliminar
        const cursoId = e.target.getAttribute('data-id');
        
        cursosSeleccionados = cursosSeleccionados.filter( curso => curso.id !== cursoId );
        //renderizar
        carritoHTML();
    }
}

//funcion para renderizar
function carritoHTML() {
    //limpiar el html anterior
    limpiarHTML();
    //recorrer el arreglo con un foreach
    cursosSeleccionados.forEach( curso => {
        //destructuring
        const { imagen, titulo, precio, cantidad, id } = curso;
        //constuir el html
        const row = document.createElement('tr');
        //añadir el td al tr
        row.innerHTML = `
            <td><img src="${ imagen }" alt="${ titulo }" width="100" ></td>
            <td>${ titulo }</td>        
            <td>${ precio }</td>        
            <td>${ cantidad }</td>        
            <td><a href="#" class="borrar-curso" data-id="${ id }">x</a></td>        
        `;
        //renderizar
        cursosCarrito.appendChild( row );
    });
    //sincronizar storage
    sincronizarStorage();
}
//funcion para sioncronizar el localstorage
function sincronizarStorage() {
    localStorage.setItem( 'cursosStorage', JSON.stringify( cursosSeleccionados) );
}
//limpiar el html anterior
function limpiarHTML() {
    while ( cursosCarrito.firstChild ) {
        cursosCarrito.removeChild( cursosCarrito.firstChild );
    }
}