// Abrir modal al hacer clic en el botón de eliminar
document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.getElementById('confirm-modal').style.display = 'block';
    });
  });
  
  // Cerrar modal al hacer clic en la "x" o en el botón de cancelar
  document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('confirm-modal').style.display = 'none';
  });
  
  document.getElementById('cancel-delete').addEventListener('click', function() {
    document.getElementById('confirm-modal').style.display = 'none';
  });
  
  // Confirmar eliminación al hacer clic en el botón de eliminar dentro del modal
  document.getElementById('confirm-delete').addEventListener('click', function() {
    // Aquí puedes añadir la lógica para eliminar el requisito
    console.log('Requisito eliminado');
    document.getElementById('confirm-modal').style.display = 'none';
  });
  