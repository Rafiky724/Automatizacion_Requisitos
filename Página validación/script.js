document.addEventListener('DOMContentLoaded', () => {
    const validarButton = document.getElementById('validar');
    const checkDivs = document.querySelectorAll('.ckeck-buttons');

    if (validarButton && checkDivs.length > 0) {
        validarButton.addEventListener('click', () => {
            validarButton.classList.add('hidden');
            checkDivs.forEach(div => {
                div.classList.remove('hidden');
                div.classList.add('visible');
            });
        });
    }
});
