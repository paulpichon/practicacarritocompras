//variables
//lista de los cursos
const listaCursos = document.querySelector('#lista-cursos');



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
    console.log(cursoSeleccionado);
    //construirun objeto con la informacion que necesitamos
    const curso = {
        imagen: cursoSeleccionado.querySelector('img').src,
        titulo: cursoSeleccionado.querySelector('h4').textContent,
        precio: cursoSeleccionado.querySelector('p.precio span').texContent,
        cantidad: 1,
        id: cursoSeleccionado.querySelector('a').dataset.id
    }

    console.log( curso );
}
