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