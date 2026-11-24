
/* ANIMACIONES DE APARICIÓN */

const secciones = document.querySelectorAll(
    ".galeria, .seccion-pelicula"
);

const observador = new IntersectionObserver((entradas) => {

    entradas.forEach((entrada) => {

        if (entrada.isIntersecting) {

            entrada.target.classList.add(
                "aparecer",
                "visible"
            );

        }

    });

}, {
    threshold: 0.15
});

secciones.forEach((seccion) => {

    seccion.classList.add("aparecer");

    observador.observe(seccion);

});


/* DESLIZAMIENTO DE LAS POLAROIDS */

const galeria = document.querySelector(".galeria-creditos");

if (galeria) {

    let presionado = false;
    let inicioX = 0;
    let scrollInicial = 0;
    let ultimaX = 0;
    let ultimoTiempo = 0;
    let velocidad = 0;
    let animacion = null;

    galeria.addEventListener("pointerdown", (evento) => {

        if (evento.pointerType === "touch") return;

        presionado = true;

        inicioX = evento.clientX;
        ultimaX = evento.clientX;
        ultimoTiempo = performance.now();

        scrollInicial = galeria.scrollLeft;

        cancelAnimationFrame(animacion);

        galeria.setPointerCapture(evento.pointerId);

    });


    galeria.addEventListener("pointermove", (evento) => {

        if (!presionado) return;

        const ahora = performance.now();

        const distancia = evento.clientX - inicioX;

        galeria.scrollLeft = scrollInicial - distancia;

        const tiempo = ahora - ultimoTiempo;

        if (tiempo > 0) {

            velocidad = (evento.clientX - ultimaX) / tiempo;

        }

        ultimaX = evento.clientX;
        ultimoTiempo = ahora;

    });


    function terminarArrastre() {

        if (!presionado) return;

        presionado = false;

        function deslizar() {

            if (Math.abs(velocidad) < 0.015) return;

            galeria.scrollLeft -= velocidad * 16;

            velocidad *= 0.94;

            animacion = requestAnimationFrame(deslizar);

        }

        deslizar();

    }


    galeria.addEventListener("pointerup", terminarArrastre);

    galeria.addEventListener("pointercancel", terminarArrastre);

}
