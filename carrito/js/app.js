//Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBTN = document.getElementById('vaciar-carrito');



//Listeners
cargarEventListeners();


function cargarEventListeners(){
    //Dispara cuando se presiona agregar carritos
    cursos.addEventListener('click', comprarCurso);

    //cuando se elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    //al vaciar carrito
    vaciarCarritoBTN.addEventListener('click', vaciarCarrito);

    //Al cargar documeno mostrar lS
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}



//Funciones

//funcion que añade el curso al carrito
function comprarCurso(e){
    e.preventDefault();
    //Delegation para agregar carrito
    if(e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement;
        //Enviarmos el curso seleccionado para tomar sus datos
        leerDatosCurso(curso);
    }
}

//Lee los datos del curso
function leerDatosCurso(curso){
    const infoCurso = {
        imagen : curso.querySelector('img').src,
        titulo : curso.querySelector('h4').textContent,
        precio : curso.querySelector('.precio span').textContent,
        id : curso.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoCurso);
}

//Muestra el curso seleccionado en el carrito
function insertarCarrito(curso){
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>    
            <img src="${curso.imagen}" class="imagen-carrito"> 
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
         <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
        </td>
    
    `;

    listaCursos.appendChild(row);

    guardarCursoLocalStorage(curso);
}

//elimina curso del carrito
function eliminarCurso(e){
    e.preventDefault();
    
    let curso,
        cursoID;
    if(e.target.classList.contains('borrar-curso')){
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoID = curso.querySelector('a').getAttribute('data-id');
    }

    eliminarCursoLStorage(cursoID);
}

//vaciar todo el carrito en el DOM
function vaciarCarrito(e){
    e.preventDefault();

    //forma lenta 
    /* listaCursos.innerHTML = '';
    return false; */

    //forma mas rapida y recomendada
    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);
    }   

    //vaciar carrito localstorage  
    vaciarLStorage(); 
    
    return false;
}

//Almacena cursos al carrito en local storage
function guardarCursoLocalStorage(curso){
    let cursos;
    //toma el valor de un arreglo con datos de LS o vacio
    cursos = obtenerCursosLocalStorage();

    //el curso seleccionado se agrega al arreglo
    cursos.push(curso);

    localStorage.setItem('cursos', JSON.stringify(cursos));
}

// comprueba q haya elementos en local storage
function obtenerCursosLocalStorage(){
    let cursosLS;

    //comprobando si hay algo en localStorage
    if(localStorage.getItem('cursos') === null){
        cursosLS = [];
    }else{
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }

    return cursosLS;
}

//imprime los cursos de LS en el carrito
function leerLocalStorage(){
    let cursosLS;

    cursosLS = obtenerCursosLocalStorage();

    cursosLS.forEach(function (curso){
        //construir el template 
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>    
                <img src="${curso.imagen}" class="imagen-carrito"> 
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>
             <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
            </td>
        
        `;
    
        listaCursos.appendChild(row);
    });

}

//elimina el curso por id del LS
function eliminarCursoLStorage(curso){
    let cursosLS;
    //obtenemos el arrglo de cursos
    cursosLS = obtenerCursosLocalStorage();
    //iteramos comparando el id del curso borrando con los del ls
    cursosLS.forEach(function(cursoLS, index){
        if(cursoLS.id === curso){
            cursosLS.splice(index, 1);
        }
    });

    localStorage.setItem('cursos', JSON.stringify(cursosLS));
}

//Elimina del lS con el boton vaciar carrito
function vaciarLStorage(){
    localStorage.clear();
}