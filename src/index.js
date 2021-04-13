const $botonEmpezar = document.querySelector('#boton-empezar');
const $tablero = document.querySelector('#tablero');
const $cuadros = $tablero.querySelectorAll('.cuadro');
const $resultadoFinal = document.querySelector('#resultado-final')
let $primerClick = null;
let turnos = 0;

$botonEmpezar.onclick = function(){
    const $contenedorBienvenida = document.querySelector('#contenedor-bienvenida');
    $contenedorBienvenida.classList.add('oculto');

    mostrarTablero($tablero);
    configurarJuego();
    manejarEventos($tablero);
}

function mostrarTablero(tablero){
    tablero.className = '';
}

function configurarJuego(){
    const colores = ['rojo', 'verde', 'amarillo', 'negro', 'blanco', 'azul'];
    const coloresDuplicados = colores.concat(colores);
    configurarCuadros($cuadros, coloresDuplicados);
}

function configurarCuadros($cuadros, colores) {
    const coloresRandom = colores.sort(function() {
      return 0.5 - Math.random();
    });
  
    coloresRandom.forEach(function(color, i) {
      $cuadros[i].classList.add(color);
    });
}

function manejarEventos($tablero){
    $tablero.onclick = function(e){
        const $elementoSeleccionado = e.target;
        if($elementoSeleccionado.classList.contains('cuadro')){
            manejarClickCuadro($elementoSeleccionado);
        }
    }
}

function manejarClickCuadro($elementoSeleccionado){
    mostrarCuadro($elementoSeleccionado);
    if ($primerClick === null){
        $primerClick = $elementoSeleccionado;
    } else {
        if ($primerClick === $elementoSeleccionado){
            return;
        }
        if (cuadrosIguales($primerClick, $elementoSeleccionado)){
            pintar($primerClick);
            pintar($elementoSeleccionado);
        } else {
            ocultarCuadro($primerClick);
            ocultarCuadro($elementoSeleccionado);
        }
    turnos++;
    $primerClick = null;
    }
}

function evaluarFinal(){
    if (document.querySelectorAll('.completo').length === 12){
        ocultarTablero();
        mostrarResultado();
    }
}

function mostrarCuadro($cuadro){
    $cuadro.style.opacity = '100';
}

function ocultarCuadro($cuadro){
    setTimeout(function(){
        $cuadro.style.opacity = '0';
    }, 500);
}

function pintar($cuadro){
    setTimeout(function(){
        $cuadro.classList.add('completo');
        evaluarFinal();
    }, 500);
}

function cuadrosIguales($cuadro1, $cuadro2){
    return $cuadro1.className === $cuadro2.className;
}

function ocultarTablero(){
    setTimeout(function(){
        $tablero.className = 'oculto';
    }, 500)
}

function mostrarResultado(){
    setTimeout(function(){
        $resultadoFinal.className = '';
    }, 500)
    document.querySelector('strong').innerHTML = `${turnos} turnos`
}

document.querySelector('#boton-reiniciar').onclick = function(){
    location.reload();
}
