const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', async (event) => {
  console.log('registro');
  event.preventDefault(); //evita que se actualice la pagina
});

/*
registerForm.addEventListener('submit', (req, res) => {
  const { uname, email, pswd } = req.body;
  console.log(uname);
  console.log(email);
  console.log(pswd);
});

b_show.addEventListener('click', async () => {
  suc.findAll(result);
  const tableBody = document.querySelector('#sucursalTable tbody');
  tableBody.innerHTML = ''; // Limpia la tabla antes de llenarla
  result.forEach((sucursal) => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${sucursal.id}</td>
    <td>${sucursal.direccion}</td>
    <td>${sucursal.telefono}</td>
    `;
    tableBody.appendChild(row);
  });
});

b_mod.addEventListener('click', () => {
  //p.updateSucursal(op);
  console.log('Se modificó una sucursal');
});

b_del.addEventListener('click', () => {
  //let op = Number(prompt('Ingrese ID de la sucursal'));
  //p.delSucursal(op);
  console.log('Sucursal eliminada');
});
*/
