

document.getElementById("asignar-validador").addEventListener("click", function () {

    let validadoresA = []

    fetch('/asignaciones_validadores')
        .then(response => response.json())
        .then(data => {
            // Los datos de requisitos estarán en data.requisitos
            //console.log(data.validadoresAsignados);
            validadoresA = data.validadoresAsignados;

            generarValidadores(validadoresA)

        })
        .catch(error => console.error('Error al obtener los requisitos:', error));

});

function generarValidadores(validadores) {

    let requirementsList2 = document.getElementById('requirementsList2');
    requirementsList2.innerHTML = "";

    // Recorrer el arreglo de objetos
    validadores.forEach(function (objeto) {
        // Crear un nuevo div
        let div = document.createElement('div');
        div.classList.add('requirement-item2');

        // Crear el div con clase 'validador-container'
        let validadorContainer = document.createElement('div');
        validadorContainer.classList.add('validador-container');

        // Crear el div con clase 'info-validador-container'
        let infoValidadorContainer = document.createElement('div');
        infoValidadorContainer.classList.add('info-validador-container');

        // Crear el párrafo para el nombre
        let nombreParrafo = document.createElement('p');
        nombreParrafo.classList.add('text-name-val');
        nombreParrafo.textContent = objeto.nombre;

        // Crear el párrafo para el rol
        let rolParrafo = document.createElement('p');
        rolParrafo.classList.add('text-prof-val');
        rolParrafo.textContent = objeto.rol;

        // Agregar los párrafos al div 'info-validador-container'
        infoValidadorContainer.appendChild(nombreParrafo);
        infoValidadorContainer.appendChild(rolParrafo);

        // Agregar 'info-validador-container' al div 'validador-container'
        validadorContainer.appendChild(infoValidadorContainer);

        // Agregar 'validador-container' al div 'requirement-item2'
        div.appendChild(validadorContainer);

        // Agregar el div creado al div con id 'requirementsList2'
        requirementsList2.appendChild(div);
    });

}