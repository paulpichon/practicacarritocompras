//variables
//lista cursos
const listaCursos = document.querySelector('#lista-cursos');
//almacenar los cursos seleccionados en el carrio
const cursosCarrito = document.querySelector('#lista-carrito tbody');
//const carrito para eliminar un curso
const carrito = document.querySelector("#carrito");
//vaciar carrito
const vaciarCarrito = document.querySelector('#vaciar-carrito');
//arreglo donde se iran almacenando los cursos
let cursosSeleccionados = [];

//eventlisteners
eventListeners();

function eventListeners() {
    //añadir eventlistener a la lista de cursos
    listaCursos.addEventListener('click', agregarCurso);
    //funcionalidad a la variable carrito
    carrito.addEventListener('click', eliminarCurso);
    //vaciar el carrito
    vaciarCarrito.addEventListener('click', () => {
        //vaciar el arreglo cursosSeleccionados
        cursosSeleccionados = [];
        //renderizar
        cursoSeleccionadoHTML();
    });
}

//funciones
//añadir curso al carrito
function agregarCurso( e ) {
    //prevenir la accion por default
    e.preventDefault();
    //verificar que se presione el boton "AGREGAR AL CARRITO"
    //console.log( e.target.classList.contains('agregar-carrito') );
    if ( e.target.classList.contains('agregar-carrito') ) {
        //construir el html con la informacion del curso a agregar al carrito
        const infoCurso = e.target.parentElement.parentElement;
        //lo mandamos a una funcion que leera la informacion y se creera un objeto a partir de es informacion
        leerInfoCurso( infoCurso );
    }
}
//funcion para leer el html del curso seleccionado
function leerInfoCurso( infoCurso ) {
    //crear un objeto con la informacion que necesitamos
    const cursoInfo = {
        imagen: infoCurso.querySelector('img').src,
        titulo: infoCurso.querySelector('h4').textContent,
        precio: infoCurso.querySelector('p.precio span').textContent,
        cantidad: 1,
        id: infoCurso.querySelector('a').getAttribute('data-id')
    }
    //actualizar la cantidad cursos agregados con el mismo ID
    //verificar si existe el ID en el arreglo cursosSeleccionados
    const existe = cursosSeleccionados.some( curso => curso.id === cursoInfo.id );
    //si existe hacemos lo siguiente
    if ( existe ) {
        //recorremos el arreglo cursosSeleccionados 
        const curso = cursosSeleccionados.map( curso => {
            //verificamos si el id que este en el arreglo cursosSeleccioados es igual que al ID seleccionado
            if ( curso.id === cursoInfo.id ) {
                //aumentamos cantidad
                curso.cantidad++;
                //retornamos el curso
                return curso;
            }else {
                return curso;
            }
        });
        //asignamos curso que tiene el arreglo actualizado a cursosSeleccionados
        cursosSeleccionados = curso;
    }else {
        //añadir al arreglo
        cursosSeleccionados = [ ...cursosSeleccionados, cursoInfo ];
    }

    //lo mandamos a la funcion que los renderizara en el html
    cursoSeleccionadoHTML();
}
//eliminar curso del carrito
function eliminarCurso(e) {
    e.preventDefault();
    //verificar si se hizo click en ELIMINAR CURSO
    if ( e.target.classList.contains('borrar-curso') ) {
        //id del curso
        const cursoID = e.target.getAttribute('data-id');
        //con filter eliminar el curso clickeado
        cursosSeleccionados = cursosSeleccionados.filter( curso => curso.id !== cursoID);
        //renderizar en el html
        cursoSeleccionadoHTML();
    }
}
//funcion para renderizar en el html
function cursoSeleccionadoHTML() {
    //limpiar el html anterior
    limpiarHTML();
    //recorremos con un foreach el arreglo cursosSeleccionados
    cursosSeleccionados.forEach( curso  => {
        const { cantidad, id, imagen, precio, titulo } = curso;
        //construimos el html
        const row = document.createElement('tr');
        //añadir info
        row.innerHTML = `
            <td><img src="${ imagen }" width="100" ></td>
            <td>${ titulo }</td>
            <td>${ precio }</td>
            <td>${ cantidad }</td>
            <td><a href="#" class="borrar-curso" data-id="${ id }">x</a></td>
        `;
        //renderizar
        cursosCarrito.appendChild( row );
    });
}
//limpiar el html
function limpiarHTML() {
    while ( cursosCarrito.firstChild ) {
        cursosCarrito.removeChild( cursosCarrito.firstChild );
    }
}