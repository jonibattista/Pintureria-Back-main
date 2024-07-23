// Eventos de los botones por ID
const b_new = document.getElementById('b_new');
const b_show = document.getElementById('b_show');
const b_mod = document.getElementById('b_mod');
const b_del = document.getElementById('b_del');
const form = document.getElementById('sucData');

b_new.addEventListener('click', (event) => {
  event.preventDefault()
  const direccion = form.elements['Direccion'].value;
  const telefono = form.elements['Telefono'].value;
  p.createSucursal(direccion, telefono);
  console.log('Sucursal creada:', { direccion, telefono });
  form.reset(); // Limpia el formulario
  const modal = bootstrap.Modal.getInstance(document.getElementById('formModal'));
  modal.hide(); // Cierra el modal
});

b_show.addEventListener('click', () => {
  p.showSucursal();
});

b_mod.addEventListener('click', () => {
  let op = Number(prompt('Ingrese ID de la sucursal'));
  p.updateSucursal(op);
  console.log('Se modificó una sucursal');
});

b_del.addEventListener('click', () => {
  let op = Number(prompt('Ingrese ID de la sucursal'));
  p.delSucursal(op);
  console.log('Sucursal eliminada');
});

// Creación de Clases y métodos
class Pintureria {
  sucursales = [];
  nombre;
  
  constructor(nombre) {
    this.nombre = nombre;
  }

  createSucursal(direccion, telefono) {
    let id = this.sucursales.length + 1;
    const s = new Sucursal(id, direccion, telefono);
    console.log(s);
    this.sucursales.push(s);
  }

  showSucursal() {
    const tableBody = document.querySelector('#sucursalTable tbody');
    tableBody.innerHTML = ''; // Limpia la tabla antes de llenarla

    this.sucursales.forEach((sucursal) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${sucursal.id}</td>
        <td>${sucursal.direccion}</td>
        <td>${sucursal.telefono}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  // Busca una sucursal por id
  searchSucursal(idsuc) {
    const f = this.sucursales.find((sucursal) => sucursal.id === idsuc);
    console.log(f);
    return f;
  }

  // Elimina una sucursal
  delSucursal(id) {
    const suc = this.sucursales.findIndex((sucursal) => sucursal.id === id);
    if (suc !== -1) {
      this.sucursales.splice(suc, 1);
      console.log('Sucursal eliminada con éxito');
    } else {
      console.error('Sucursal no encontrada');
    }
  }

  // Actualiza una sucursal
  updateSucursal(id) {
    const suc = this.searchSucursal(id);
    if (suc !== undefined) {
      suc.direccion = prompt('Ingrese dirección de la sucursal');
      suc.telefono = prompt('Ingrese teléfono de la sucursal');
      console.log(suc);
    } else {
      console.error('Sucursal no encontrada');
    }
  }
}

class Sucursal {
  id;
  direccion;
  telefono;
  productos = [];
  personas = [];
  ventas = [];
  
  constructor(id, direccion, telefono) {
    this.id = id;
    this.direccion = direccion;
    this.telefono = telefono;
  }
}

const p = new Pintureria('Rio Color');