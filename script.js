const html = document.querySelector('html');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonDescanso = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
const inputEnfoqueMusica = document.querySelector('#alternar-musica');
const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
const botonInicioPausa = document.querySelector('#start-pause');
const textoInicioPausa = document.querySelector('#start-pause span');
const tiempoEnPantalla = document.querySelector('#timer');

let tiempoTranscurrido = 1500;
let idIntervalo = null;

musica.loop = true;
musica.volume = 0.5;

inputEnfoqueMusica.addEventListener('change', ()=>{
    if(musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
});

botonCorto.addEventListener('click', ()=> {
    tiempoTranscurrido = 300;
    cambiarContexto('descanso-corto');
    botonCorto.classList.add('active');
})

botonEnfoque.addEventListener('click', ()=> {
    tiempoTranscurrido = 1500;
    cambiarContexto('enfoque');
    botonEnfoque.classList.add('active');
})

botonDescanso.addEventListener('click', ()=> {
    tiempoTranscurrido = 900;
    cambiarContexto('descanso-largo');
    botonDescanso.classList.add('active');
})

function cambiarContexto(contexto){

    mostrarTiempo();
    botones.forEach(function(contexto){
        contexto.classList.remove('active');
    })


    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagenes/${contexto}.png`);

    switch (contexto){
        case "enfoque":
            titulo.innerHTML = `
            Optimiza tu productividad,<br>
            <strong class="app__title-strong">sumérgete en lo que importa.</strong>
            `
            break;
        case "descanso-corto":
            titulo.innerHTML = `
            ¿Qué tal tomar un respiro?<br>
            <strong class="app__title-strong">¡Haz una pausa corta!</strong>
            `
            break;
        case "descanso-largo":
            titulo.innerHTML = `
            Hora de volver a la superficie<br>
            <strong class="app__title-strong">Haz una pausa larga.</strong>
            `
            break;

    }
}

const iniciar = new Audio('./sonidos/play.wav');
const casi = new Audio('./sonidos/beep.mp3');
const pause = new Audio('./sonidos/pause.mp3');
const simboloBoton = document.querySelector('.app__card-primary-butto-icon')


const cuentaRegresiva = () => {
    if (tiempoTranscurrido <= 0 ){
        casi.play();
        alert('Tiempo finalizado');
        reiniciar();
        return;
    }
    textoInicioPausa.textContent = "Pausar";
    tiempoTranscurrido -= 1;
    simboloBoton.setAttribute('src', `./imagenes/pause.png`);
    mostrarTiempo();
}

botonInicioPausa.addEventListener('click', iniciarPausar);

function iniciarPausar(){
    if(idIntervalo){
        pause.play();
        reiniciar();
        return;
    }
    iniciar.play();
    idIntervalo = setInterval(cuentaRegresiva, 1000);
}

function reiniciar(){
    clearInterval(idIntervalo);
    idIntervalo = null;
    textoInicioPausa.textContent = "Comenzar";
    simboloBoton.setAttribute('src', `./imagenes/play_arrow.png`);
}

function mostrarTiempo(){
    const tiempo = new Date(tiempoTranscurrido*1000);
    const tiempoFormateado = tiempo.toLocaleTimeString('es-CL', {minute: '2-digit', second: '2-digit'});
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`;
}

mostrarTiempo();