let functionalCount = 0;
let nonFunctionalCount = 0;
const functionalRequirements = [];

document.getElementById('addRequirementBtn').addEventListener('click', function () {
    // Verificar si los campos del formulario están llenos
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const requirementType = document.querySelector('input[name="requirementType"]:checked');

    if (!title || !description || !requirementType) {
        alert('Por favor, complete todos los campos antes de agregar un requisito.');
        return;
    }

    // Incrementar el contador correspondiente y crear el identificador
    let identifier;
    if (requirementType.value === 'Funcional') {
        functionalCount++;
        identifier = 'RF' + functionalCount;

        // Guardar el requisito funcional en el arreglo
        functionalRequirements.push({ title, description });
    } else {
        nonFunctionalCount++;
        identifier = 'RNF' + nonFunctionalCount;
    }

    // Crear nuevo contenedor para el requisito agregado
    const container = document.createElement('div');
    container.className = 'container-req-add';

    // Crear elementos para el título y descripción
    const titleElement = document.createElement('p');
    titleElement.className = 'text-titulo-req';
    titleElement.textContent = `${identifier}: ${title}`;

    const descriptionElement = document.createElement('p');
    descriptionElement.className = 'text-det-req';
    descriptionElement.textContent = description;

    // Agregar elementos al contenedor
    container.appendChild(titleElement);
    container.appendChild(descriptionElement);

    // Agregar contenedor a la lista de requisitos
    document.getElementById('requirementsList').appendChild(container);

    // Limpiar el formulario
    document.getElementById('requirementForm').reset();

    mostrarRequisitosFuncionales();
});

// Ejemplo de cómo acceder a los requisitos funcionales almacenados
function mostrarRequisitosFuncionales() {

    /*
    functionalRequirements.forEach(element => {
        console.log(element['description']);
    });*/

    console.log(functionalRequirements[0]['description']);

}

//ENVIAR REQUISITO AL PYTHON

document.getElementById("boton-guardar-enviar").addEventListener("click", function() {

    var requisitos = [];

    functionalRequirements.forEach(element => {
        requisitos.push(element['description']);
    });

    
    requisitos.forEach(requisito => {
        fetch('/patron', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ requisito: requisito }),
        })
        .then(response => response.json())
        /*
        .then(data => {
            alert(data.mensaje);
        })
        .catch((error) => {
            console.error('Error:', error);
        });*/
    });

    /*
    fetch('/patron', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requisito: requisitos[0] }),
    })
    .then(response => response.json())
 */
});