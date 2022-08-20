//variables
const listaCursos = document.querySelector('#lista-cursos');
//cursos agregados en el carrito
const listaCarrito = document.querySelector('#lista-carrito');
//eliminar curso
const carrito = document.querySelector('#carrito');
//vaciar carrito
const vaciarCarrito = document.querySelector('#vaciar-carrito');
//array donde se iran agregando los cursos agregados
let cursosSeleccionados = [];

//eventlisteners
eventListeners();
function eventListeners() {
    //detectar cuando hagan click en los cursos
    listaCursos.addEventListener('click', agregarCursos);
    //borrar un curso
    carrito.addEventListener('click', borrarCurso);
    //vaciar carrito
    vaciarCarrito.addEventListener('click', () => {
        //vaciar carrito
        cursosSeleccionados = [];
        //renderizar
        carritoHTML();
    });
}



//funciones
//agregar cursos
function agregarCursos( e ) {
    e.preventDefault();
    //console.log( e.target.classList.contains('agregar-carrito') );
    //detectar cuando hagan click en "AGREGAR AL CARRITO"
    if ( e.target.classList.contains('agregar-carrito') ) {
        //html del curso seleccionado
        const cursoSeleccionado = e.target.parentElement.parentElement;
        //lo mandamos a una funcion para leer los datos
        leerDatos( cursoSeleccionado );
    }
}
//crear un objeto con la info que necesitamos a partir de la funcion agregarCursos()
function leerDatos( cursoSeleccionado ) {
    //construir objeto
    const infoCurso = {
        imagen: cursoSeleccionado.querySelector('img').src,
        titulo: cursoSeleccionado.querySelector('h4').textContent,
        precio: cursoSeleccionado.querySelector('p.precio span').textContent,
        id: cursoSeleccionado.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    //verificar si se vuelve agregar el mismo curso usando el metodo some()
    const existe = cursosSeleccionados.some( curso => curso.id === infoCurso.id );
    
    //si existe
    if ( existe ) {
        //recorrer el array cursosSeleccionados
        const curso = cursosSeleccionados.map( curso => {
            //verificar el mismo id curso
            if ( curso.id === infoCurso.id ) {
                //actualizar cantidad
                curso.cantidad++;
                //retonar curso con la cantidad actualizada
                return curso; 
            }else{
                //retornar curso
                return curso;
            }
        })

        //asignamos el valor de curso a cursosSeleccionados
        cursosSeleccionados = [ ...curso ];

    }else{
        //console.log( infoCurso );
        cursosSeleccionados = [ ...cursosSeleccionados, infoCurso ];
    }

    //console.log( cursosSeleccionados );
    //renderizar en el html
    carritoHTML();
}
//borrar curso
function borrarCurso( e ) {

    //console.log( e.target.classList.contains('borrar-curso') );
    if ( e.target.classList.contains('borrar-curso') ) {
        //console.log( e.target.getAttribute('data-id') );
        const cursoId = e.target.getAttribute('data-id');
        
        //filtrar
        cursosSeleccionados = cursosSeleccionados.filter( curso => curso.id !== cursoId );

        //renderizamos
        carritoHTML();
    }
}
//renderizar en el carrito html
function carritoHTML() {
    //limpiar HTML anterior
    limpiarHTML();
    //iterar para poder mostrar en el carrito
    cursosSeleccionados.forEach(curso => {
        //destructuring
        const { cantidad, id, imagen, precio, titulo } = curso;
        
        //crear un elemento html
        const row = document.createElement('tr');
        //
        row.innerHTML = `
            <td><img src="${ imagen }" width="100"> </td>
            <td>${ titulo }</td>
            <td>${ precio }</td>
            <td>${ cantidad }</td>
            <td><a class="borrar-curso" data-id="${ id }">x</a></td>
        `;
        //renderizar en el html
        listaCarrito.appendChild( row );
    });
}
//limpiar html
function limpiarHTML() {
    while ( listaCarrito.firstChild ) {
        listaCarrito.removeChild( listaCarrito.firstChild );
    }
}