const modal = document.querySelector('.modal-depuracion');
const modal2 = document.querySelector('.modal-depuracion2');

document.getElementById('boton-eliminar-req').addEventListener('click', function(){

    modal.classList.add('modal-depuracion--show')

});

document.getElementById('btn-close-modal').addEventListener('click', function(){

    modal.classList.remove('modal-depuracion--show')

});

document.getElementById('boton-editar-req').addEventListener('click', function(){

    modal2.classList.add('modal-depuracion2--show')

});

document.getElementById('btn-close-modal2').addEventListener('click', function(){

    modal2.classList.remove('modal-depuracion2--show')

});


document.addEventListener('DOMContentLoaded', function() {
    // Añadir evento de clic a todos los divs
    document.querySelectorAll('.container-req-select').forEach(function(div) {
        div.addEventListener('click', selectRequirement);
    });

    // Añadir evento de clic al botón
    //document.getElementById('getSelectedButton').addEventListener('click', getSelectedRequirement);
});


function selectRequirement(event) {
    // Remover la clase 'selected' de todos los divs
    document.querySelectorAll('.container-req-select').forEach(function(div) {
        div.classList.remove('selected');
    });

    // Agregar la clase 'selected' al div clicado
    event.currentTarget.classList.add('selected');
}