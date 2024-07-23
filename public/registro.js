document.getElementById('empleadoForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const num = document.getElementById('num').value;
    const password = document.getElementById('pwd').value;

    registrarEmpleado(nombre, apellido, nacimiento, username, password);
});

function registrarEmpleado(num, password) {
    

}