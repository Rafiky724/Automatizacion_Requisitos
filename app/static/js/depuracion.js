const modal = document.querySelector('.modal-depuracion');
const modal2 = document.querySelector('.modal-depuracion2');


document.getElementById('btn-close-modal').addEventListener('click', function () {

    modal.classList.remove('modal-depuracion--show')

});

document.getElementById('btn-close-modal2').addEventListener('click', function () {

    modal2.classList.remove('modal-depuracion2--show')

});

let requisitoEscogido;

document.addEventListener('DOMContentLoaded', function () {
    // Añadir evento de clic a todos los divs
    document.querySelectorAll('.container-req-select').forEach(function (div) {
        div.addEventListener('click', selectRequirement);
    });

    // Añadir evento de clic al botón
    document.getElementById('boton-eliminar-req').addEventListener('click', async function () {
        let selectedDiv = document.querySelector('.container-req-select.selected');
        if (selectedDiv) {
            let identifier = selectedDiv.id;
            let requisitos;

            await fetch('/get_requisitos')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // Aquí puedes manejar la data recibida, por ejemplo, imprimir en la consola
                    requisitos = data;
                })
                .catch(error => {
                    // Manejo de errores
                    console.error('There was a problem with the fetch operation:', error);
                });

            requisitos.forEach(element => {

                if (element['_id'] == identifier) {
                    requisitoEscogido = element;
                }

            });

            const container = document.getElementById('info-modal');
            container.innerHTML = "";

            let titulo = document.createElement('p');
            titulo.classList.add('text-delete-req');
            titulo.textContent = "Editar requisito";

            let subttitulo = document.createElement('p');
            subttitulo.classList.add('text-select-req');
            subttitulo.textContent = "¿Estas seguro de que deseas eliminar este requisito?";

            let container2 = document.createElement('div');
            container2.classList.add('container-req-select2');

            let tituloReq = document.createElement('p');
            tituloReq.classList.add('text-titulo-req2');
            tituloReq.textContent = requisitoEscogido['identifier'] + ":";

            let descripcion = document.createElement('p');
            descripcion.textContent = requisitoEscogido['description'];

            container2.appendChild(tituloReq);
            container2.appendChild(descripcion);

            container.appendChild(titulo);
            container.appendChild(subttitulo);
            container.appendChild(container2);

            modal.classList.add('modal-depuracion--show')
        } else {
            alert('No hay ningún requisito seleccionado');
        }
    });

    document.getElementById('boton-editar-req').addEventListener('click', async function () {
        let selectedDiv = document.querySelector('.container-req-select.selected');
        if (selectedDiv) {
            let identifier = selectedDiv.id;
            let requisitos;

            await fetch('/get_requisitos')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // Aquí puedes manejar la data recibida, por ejemplo, imprimir en la consola
                    requisitos = data;
                })
                .catch(error => {
                    // Manejo de errores
                    console.error('There was a problem with the fetch operation:', error);
                });

            requisitos.forEach(element => {

                if (element['_id'] == identifier) {
                    requisitoEscogido = element;
                }

            });

            const container = document.getElementById('info-modal2');
            container.innerHTML = "";

            // Crear y agregar el título del modal
            let titulo = document.createElement('p');
            titulo.classList.add('text-delete-req');
            titulo.textContent = "Editar requisito";
            container.appendChild(titulo);

            // Crear y agregar el label para el título del requisito
            let labelTitulo = document.createElement('p');
            labelTitulo.classList.add('labels-modal');
            labelTitulo.textContent = "Título";
            container.appendChild(labelTitulo);

            // Crear y agregar el input para el título del requisito
            let inputTitulo = document.createElement('input');
            inputTitulo.classList.add('input-titule-req');
            inputTitulo.type = "text";
            inputTitulo.id = "nuevo-titulo"
            inputTitulo.value = requisitoEscogido['title'] || "Requisito 1";
            container.appendChild(inputTitulo);

            // Crear y agregar el label para la descripción del requisito
            let labelDescripcion = document.createElement('p');
            labelDescripcion.classList.add('labels-modal');
            labelDescripcion.textContent = "Descripción";
            container.appendChild(labelDescripcion);

            // Crear y agregar el textarea para la descripción del requisito
            let textareaDescripcion = document.createElement('textarea');
            textareaDescripcion.classList.add('text-area-edit');
            textareaDescripcion.id = "nueva-descripcion"
            textareaDescripcion.value = requisitoEscogido['description'] || "La interfaz de usuario debe ser completamente intuitiva para gatos";
            container.appendChild(textareaDescripcion);

            // Crear y agregar el label para el patrón del requisito
            let labelPatron = document.createElement('p');
            labelPatron.classList.add('labels-modal');
            labelPatron.textContent = "Patrón";
            container.appendChild(labelPatron);

            // Crear y agregar el textarea para el patrón del requisito
            let textareaPatron = document.createElement('textarea');
            textareaPatron.classList.add('text-area-edit');
            textareaPatron.id = "nuevo-patron"
            textareaPatron.value = requisitoEscogido['patron'] || "La interfaz de usuario debe ser completamente intuitiva para gatos";
            container.appendChild(textareaPatron);

            modal2.classList.add('modal-depuracion2--show')
        } else {
            alert('No hay ningún requisito seleccionado');
        }
    });

});

function selectRequirement(event) {
    // Remover la clase 'selected' de todos los divs
    document.querySelectorAll('.container-req-select').forEach(function (div) {
        div.classList.remove('selected');
    });

    // Agregar la clase 'selected' al div clicado
    event.currentTarget.classList.add('selected');
}

document.getElementById('eliminar-requisito').addEventListener('click', function () {

    const contexto = document.getElementById('contexto-text').value;

    if (contexto === '') {

        return alert("Rellena el contexto para poder eliminar")

    }

    const tipo = 'Eliminar'

    const dataToSend = {
        requisito: requisitoEscogido,
        contexto: contexto,
        tipo: tipo
    };

    console.log(dataToSend);

    fetch('/depuracion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
    })
        .then(response => response.json())
        .then(data => {
            if (data.redirect) {
                window.location.href = data.redirect;
            } else {
                console.error('No redirection URL found');
            }
        })
        .catch(error => console.error('Error:', error));

});

document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('guardar-requisito').addEventListener('click', function () {

        const contexto = document.getElementById('contexto-text').value;
        const nuevoTitulo = document.getElementById('nuevo-titulo').value;
        const nuevaDescripcion = document.getElementById('nueva-descripcion').value;
        const nuevoPatron = document.getElementById('nuevo-patron').value;

        if (contexto === '') {

            return alert("Rellena el contexto para poder eliminar")

        }

        const tipo = 'Guardar'

        const dataToSend = {
            requisito: requisitoEscogido,
            contexto: contexto,
            tipo: tipo,
            nuevoTitulo: nuevoTitulo,
            nuevaDescripcion: nuevaDescripcion,
            nuevoPatron: nuevoPatron
        };

        console.log(dataToSend);

        fetch('/depuracion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        })
            .then(response => response.json())
            .then(data => {
                if (data.redirect) {
                    window.location.href = data.redirect;
                } else {
                    console.error('No redirection URL found');
                }
            })
            .catch(error => console.error('Error:', error));

    });

});