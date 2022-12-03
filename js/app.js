//variables
//lista de los cursos
const listaCursos = document.querySelector('#lista-cursos');
//variable donde se renderizaran los cursos en el carrito 
const listaCarrito = document.querySelector('#lista-carrito tbody');
//arreglo que ira alamacenado los curso seleccionados
let cursosSeleccionados = [];



//eventlisteners
cargarEventListeners();
function cargarEventListeners() {
    //listener a listacursos
    listaCursos.addEventListener('click', agregarCurso);
}

//funciones
//funcion para agregar curso al carrito
function agregarCurso ( e ) {
    e.preventDefault();
    //revisar cuando hagan click en la clase "agregar-carrito"
    //e.target.classList.contains("agregar-carrito") = true/flase dependiendo si hacen click en el oton con la clase "agregar al carrito"
    if (e.target.classList.contains("agregar-carrito")) {
        //html curso seleccionado
        const cursoSeleccionado = e.target.parentElement.parentElement;
        //mandar a funcion que va a leer los datos
        leerDatosCurso(cursoSeleccionado);
    }
}

//funcion para leer los datos del curso seleccionado
function leerDatosCurso(cursoSeleccionado) {
    //construirun objeto con la informacion que necesitamos
    const cursoAgregado = {
        imagen: cursoSeleccionado.querySelector('img').src,
        titulo: cursoSeleccionado.querySelector('h4').textContent,
        precio: cursoSeleccionado.querySelector('p.precio span').textContent,
        cantidad: 1,
        id: cursoSeleccionado.querySelector('a').dataset.id
    }
    //verificar si el curso agregadoya esta en el arreglo o es nuevo
    const existe = cursosSeleccionados.some( curso => curso.id === cursoAgregado.id );
    //si existe el curso en el arrelgo
    if (existe) {
        const cursoActualizar = cursosSeleccionados.map( curso => {
            if (curso.id === cursoAgregado.id) {
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        });
        //se asigna el valor de cursoActualizar a cursosSeleccionados
        cursosSeleccionados = cursoActualizar;

    }else{
        //añadir el curso al arreglo
        cursosSeleccionados = [...cursosSeleccionados, cursoAgregado];
    }

    //renderizar el curso en el carrito
    carritoHTML();
}
//funcion para renderizar el curso en el carrito
function carritoHTML() {
    //limpiar el HTML anterior
    limpiarHTML();
    //recorremos el arreglo con un foreach
    cursosSeleccionados.forEach( curso => {
        //destructuring
        const { imagen, titulo, precio, cantidad, id } = curso;
        //construir el HTML
        const row = document.createElement('tr');
        //innerhtml
        row.innerHTML = `
            <td><img src="${imagen}" width="100" ></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href="#" class="borrar-curso" data-${id} >X</a></td>
        `;
        //renderizar
        listaCarrito.appendChild( row );

    });
    //sincronizar el localstorage
}
//funcion para limpiar el html
function limpiarHTML() {
    while( listaCarrito.firstChild ){
        listaCarrito.removeChild( listaCarrito.firstChild );
    }
}
