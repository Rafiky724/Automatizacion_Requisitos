document.getElementById('delete-all-button').addEventListener('click', function () {
    fetch('/delete_all', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({}) // Puedes enviar cualquier información adicional si es necesario
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            alert('Requisitos eliminados correctamente');
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});