//variables
//carrito
const carrito = document.querySelector('#carrito');
//contenedor de cursos seleccionados
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
//boton para vaciar el carrito
const vaciarCarritoBTN = document.querySelector('#vaciar-carrito');
//lista de los cursos disponibles
const listaCursos = document.querySelector('#lista-cursos');
//contenedor de articulos seleccionados
let articulosComprados = [];

//cargar los event listeners
cargarEventListeners();

function cargarEventListeners() { 
    //añadir un eventlistener a listaCursos para detecar cuando presionen "AGREGAR AL CARRITO"
    listaCursos.addEventListener('click', agregarCurso);
    //eliminar un curso del carrito
    carrito.addEventListener('click', eliminarCursoCarrito);
    //vaciar el carrito
    vaciarCarritoBTN.addEventListener('click', () => {
        //vaciar el arreglo
        articulosComprados = [];
        //limpiar el html
        limpiarHTML();

    });
}

//funciones
function agregarCurso( e ) {
    //prevenir el refresco de la pagina al presionar sobre un enlace
    e.preventDefault();
    //detectar las clases del elemento que se esta hacienco click
    //console.log( e.target.classList.contains('agregar-carrito') );//true o false
    if ( e.target.classList.contains('agregar-carrito') ) {
        //crear el html del curso seleccionado
        //console.log( e.target.parentElement.parentElement ) 
        const cursoSeleccionado = e.target.parentElement.parentElement;

        //mandar a funcion leerDatosCuros
        leerDatosCuros( cursoSeleccionado );

    }

}

//eliminar el curso del contenedor carrito
function eliminarCursoCarrito( e ) {
    //console.log( e.target.classList.contains('borrar-curso') );
    //detectar cuando hagan click en el boton para eliminar el curso
    if ( e.target.classList.contains('borrar-curso') ) {
        //console.log(e.target.getAttribute('data-id') );
        //identificamos el id del curso dentro del carrito
        const cursoId = e.target.getAttribute('data-id');
        //creamos una copia del arreglo con filter() para poder quitar  el curso a eliminar
        //y lo asignamos a articulosComprados
        articulosComprados = articulosComprados.filter( curso => curso.id !== cursoId );
        //console.log( articulosComprados );

        //luego llamamos carritoHTML() para renderizar el nuevo arreglo con los cursos eliminados
        carritoHTML();
 
    }

}

//leer los datos del curso
function leerDatosCuros( cursoSeleccionado ) {
    //console.log( cursoSeleccionado );
    //creamos una variable con la informacion que necitamos del curso
    const infoCurso = {
        imagen: cursoSeleccionado.querySelector('img').src,
        titulo: cursoSeleccionado.querySelector('h4').textContent,
        precio: cursoSeleccionado.querySelector('p.precio span').textContent,
        id: cursoSeleccionado.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    
    //verificar si hay un curso repetido en el carrito o es nuevo con .some()
    //comparamos el id del arreglo con el del infoCurso para saber si ya existe en el arreglo articulosComprados
    const existe = articulosComprados.some( curso => curso.id === infoCurso.id );
    
    if (existe) {
        //se actualiza la cantidad
        //recorremos el arreglo con map() para crear una copia del arreglo original
        const curso = articulosComprados.map( curso => {
            //con el IF() verificamos si el id del arreglo articulosComprados
            //es igual al que esta siendo agregado
            if ( curso.id === infoCurso.id ) {
                //se incrementa la cnatidad
                curso.cantidad++;
                //se regresa el arreglo actualizado
                return curso;

            }else {
                //se regresa el arreglo curso sin duplicados
                return curso;
            }
        });
        //se asigna a articulosComprados el valor de curso con el nuevo arreglo actualizado
        articulosComprados = [ ...curso ];

    }else {
        //console.log( infoCurso );
        //lo añadimos al arreglo
        articulosComprados = [ ...articulosComprados, infoCurso ]
        //console.log( articulosComprados );
    }

    //mandar al carritHTML para renderizarlo
    carritoHTML();

}

//renderizar el arreglo en html
function carritoHTML() {
    //limpiar el html de los cursos anteriores
    limpiarHTML();

    //recorrer el arreglo
    articulosComprados.forEach( curso => {
        //para cada curso creamos un elemento html <tr></tr>    
        const row = document.createElement('tr');
        //unimos el row con el html
        row.innerHTML = `
            <td> <img src=" ${ curso.imagen } " alt="${ curso.titulo }" width="100"/> </td>
            <td>${ curso.titulo }</td>
            <td>${ curso.precio }</td>
            <td>${ curso.cantidad }</td>
            <td><a href="#" class="borrar-curso" data-id="${ curso.id }" >x</a></td>
        `;
        
        //renderizamos el row en el html con appendChild()
        contenedorCarrito.appendChild( row );

    });

}

//limpiar html de cursos anteriores
function limpiarHTML() {
    //mientras haya un elemento dentro del contenedorCarrito
    while ( contenedorCarrito.firstChild ) {
        //eliminar los elementos del carrito
        contenedorCarrito.removeChild( contenedorCarrito.firstChild );
    }
}

