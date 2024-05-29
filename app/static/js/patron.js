
let requisitos = []

document.getElementById("boton-guardar-req").addEventListener("click", function () {

    /*
    requisitos[0].forEach(element => {

        console.log(element);

    });*/

    const textareas = document.querySelectorAll('.reqPatron');

    // Itera sobre los textareas y actualiza el campo 'patron' del objeto correspondiente
    textareas.forEach(textarea => {
        const identifier = textarea.id; // Obtiene el ID del textarea
        const newPatron = textarea.value; // Obtiene el nuevo valor del patrón

        // Encuentra el objeto en el arreglo con el identificador correspondiente y actualiza su 'patron'
        const requisito = requisitos.find(req => req.identifier === identifier);
        if (requisito) {
            requisito.patron = newPatron;
        }
    });

    // Para ver el resultado en la consola
    console.log(requisitos);


    fetch('/patron2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requisitos),
    })
        .then(response => response.json())
        .then(data => {
            if (data) {
                console.log(`Funciona: ${data}`);
            } else {
                console.error('No redirection URL found');
            }
        })
        .catch(error => console.error('Error:', error));

});


fetch('/obtener_requisitos')
    .then(response => response.json())
    .then(data => {
        // Los datos de requisitos estarán en data.requisitos
        console.log(data.requisitos);
        requisitos = data.requisitos;

    })
    .catch(error => console.error('Error al obtener los requisitos:', error));