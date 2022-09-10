//variables
//lista de cursos
const listaCursos = document.querySelector('#lista-cursos');
//lista carrito tbody
const listaCarrito = document.querySelector('#lista-carrito tbody');
//borrar curso
const BTNBorrarCurso = document.querySelector('#carrito');
//vaciar el carrito
const vaciarCarrito = document.querySelector('#vaciar-carrito');
//creamos un arreglo vacio para ir llenandolo con los cursos seleccionados
let cursosSeleccionados = [];


//listeners
//eventlisteners
eventListeners();

function eventListeners() {
    //listener para cuando hagan click en algun curso
    listaCursos.addEventListener('click', agregarCurso);
    //local storage
    document.addEventListener('DOMContentLoaded', () => {
        //si la primera vez que se crea el local storage no hay ningun curso en el carrito marcara un error
        //por ello se le pone || []
        cursosSeleccionados = JSON.parse( localStorage.getItem('carritocompras')) || [];
        //console.log( cursosSeleccionados );
        //llamamos funcion para renderizarlo
        carritoHTML();
    });
    //borrar curso de carrito
    BTNBorrarCurso.addEventListener('click', borrarCurso);
    //vaciar carrito
    vaciarCarrito.addEventListener('click', () => {
        cursosSeleccionados = [];
        //renderizamos
        carritoHTML();
    })
}

//funciones
//funcion para gregar curso
function agregarCurso( e ) {
    //prevenir accion por defecto
    e.preventDefault();
    //verificar si presionan "AGREGAR AL CARRITO"
    //console.log( e.target.classList.contains('agregar-carrito') );
    if ( e.target.classList.contains('agregar-carrito') ) {
        //seleccionamos el html del curso que presiono
        //console.log( e.target.parentElement.parentElement );
        const cursoSeleccionado = e.target.parentElement.parentElement;
        //lo mandamos a una funcion para que puedan se r leidos sus datos y construir un objeto con esos datos
        leerDatosCursos( cursoSeleccionado );
    }
}
//funcion para leer datos del curso selessionado 
function leerDatosCursos( cursoSeleccionado ) {
    //construir objeto con los datos que necesitamos
    const infoCurso = {
        imagen: cursoSeleccionado.querySelector('img').src,
        titulo: cursoSeleccionado.querySelector('h4').textContent,
        precio: cursoSeleccionado.querySelector('p.precio span').textContent,
        cantidad: 1,
        id: cursoSeleccionado.querySelector('a').getAttribute('data-id')
    }
    //actualizar la cantidad
    //verificar si el curso existe en el arreglo
    const existe = cursosSeleccionados.some( curso => curso.id === infoCurso.id );
    //console.log( existe );
    //si existe
    if ( existe ) {
        //recorrer el arreglo para verificar que curso ya existe agregado
        const curso = cursosSeleccionados.map( curso => {
            //verificar por id
            if ( curso.id === infoCurso.id ) {
                //actualizar cantidad
                curso.cantidad++;
                //regresamos el curso la cantidad actualizada
                return curso;
            }else{
                //retornamos el arreglo
                return curso;
            }
        });
        //asignamos el valor de la constante curso al arreglo cursosSeleccionados
        cursosSeleccionados = curso;
    }else {
        //console.log( infoCurso );
        //agregamos el arreglo vacio y lo asignamos asi mismo
        //usamos el spread operator para llenar el arreglo
        cursosSeleccionados = [ ...cursosSeleccionados, infoCurso ];
    }
    //funcion para renderizar los cursos en el carrito
    carritoHTML();
}
//fucnion para borrar curso
function borrarCurso( e ) {
    e.preventDefault();

    if ( e.target.classList.contains('borrar-curso')) {
        //id curso a leiminar
        //console.log( e.target.getAttribute('data-id') );
        const cursoId = e.target.getAttribute('data-id');
        //usamos filter para eliminar del arreglo el id seleccionado
        cursosSeleccionados = cursosSeleccionados.filter( curso => curso.id !== cursoId);
        //console.log( cursosSeleccionados );
        //renderizar
        carritoHTML();
    }
}

//funcion para renderizar los cursos en el carrito
function carritoHTML() {
    //limpiar carrito html
    limpiarHTML();
    //recorrer el arreglo con foreach()
    cursosSeleccionados.forEach( curso => {
        //destructuring
        const { cantidad, id, imagen, precio, titulo } = curso;
        //construir el html del curso
        const row = document.createElement('tr');
        //introducir info
        row.innerHTML = `
            <td><img src="${ imagen }" width="100" ></td>
            <td>${ titulo }</td>
            <td>${ precio }</td>
            <td>${ cantidad }</td>
            <td><a href="#" class="borrar-curso" data-id="${ id }">x</a></td>
        `;
        //renderizar en el carrito 
        listaCarrito.appendChild( row );
    });
    //sincronizar el local storage
    sincronizarLocalStorage();
}
//sincronizar el local storage
function sincronizarLocalStorage() {
    //local storage
    localStorage.setItem('carritocompras', JSON.stringify( cursosSeleccionados ));
}
//limpiar html anterior
function limpiarHTML() {
    while ( listaCarrito.firstChild ) {
        listaCarrito.removeChild( listaCarrito.firstChild );
    }
}