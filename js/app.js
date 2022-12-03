//variables
//lista de los cursos
const listaCursos = document.querySelector('#lista-cursos');
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

    }

    //añadir el curso al arreglo
    cursosSeleccionados = [...cursosSeleccionados, cursoAgregado];
    //renderizar el curso en el carrito
    carritoHTML();
}
//funcion para renderizar el curso en el carrito
function carritoHTML() {
    
}
