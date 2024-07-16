//Eventos de los botones por ID
const b_new = document.getElementById('b_new');
const b_show = document.getElementById('b_show');
const b_mod = document.getElementById('b_mod');
const b_del = document.getElementById('b_del');
const form = document.getElementById('sucData');
const dir = document.getElementById('dir');
const tel = document.getElementById('tele');
const enviar = document.getElementById('b_carga');
const contenedor = document.getElementById('muestraSuc');

b_new.addEventListener('click', () => {
  showForm();
  console.log('nueva sucursal');
});

b_show.addEventListener('click', () => {
  showDivSucursales();
  p.showSucursal();
  // console.log('mostrar sucursal numero:');
});

b_mod.addEventListener('click', () => {
  let op = Number(prompt('Ingrese ID de la sucursal'));
  p.updateSucursal(op);
  console.log('Se modifico una sucursal');
});

b_del.addEventListener('click', () => {
  let op = Number(prompt('Ingrese ID de la sucursal'));
  p.delSucursal(op);
  console.log('eliminada');
});

enviar.addEventListener('click', () => {
  let direc = dir.value;
  let ntel = tel.value;
  p.creatSucursal(direc, ntel);
});

//Creacion de Clases y metodos

class Pintureria {
  sucursales = [];
  nombre;
  constructor(nombre) {
    this.nombre = nombre;
  }

  creatSucursal(direc, ntel) {
    let id = this.sucursales.length + 1;
    const s = new Sucursal(id, direc, ntel);
    console.log(s);
    this.sucursales.push(s); // agrega nueva sucursal al array sucursales
  }

  // Muestra las sucursales cargadas
  showSucursal() {
    this.sucursales.forEach((sucursal) => {
      contenedor.innerHTML = '<a>ID Sucursal: </a>' + sucursal.id;
      contenedor.innerHTML = '<a>Direccion: </a>' + sucursal.direccion;
      contenedor.innerHTML = '<a>Telefono: </a>' + sucursal.telefono;
    });
  }

  //Busca una sucursal por id
  searchSucursal(idsuc) {
    const f = this.sucursales.find((sucursal) => sucursal.id === idsuc);
    console.log(f);
    return f;
  }

  //Elimina una sucursal
  delSucursal(id) {
    const suc = this.sucursales.findIndex((sucursal) => sucursal.id === id);
    if (suc !== -1) {
      this.sucursales.splice(suc, 1);
      return console.log('Sucursal eliminada con exito');
    } else console.error('sucursal no encontrada');
    return 0;
  }

  //Actualiza una sucursal
  updateSucursal(id) {
    const suc = this.searchSucursal(id);
    console.log(suc);
    if (suc !== undefined) {
      suc.direccion = prompt('Ingrese direccion de la sucursal');
      suc.telefono = prompt('Ingrese telefono de la sucursal');
      console.log(suc);
      return 0;
    } else console.error('sucursal no encontrada');
    return 0;
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

//Muestra y oculta el formulario de sucursales
function showForm() {
  if (form.style.display == 'block') {
    form.style.display = 'none';
    b_show.style.display = 'block';
    b_mod.style.display = 'block';
    b_del.style.display = 'block';
    b_new.innerHTML = '<strong>Nueva sucursal</strong>';
  } else {
    form.style.display = 'block';
    b_show.style.display = 'none';
    b_mod.style.display = 'none';
    b_del.style.display = 'none';
    b_new.innerHTML = '<strong style = "color:red">Cancelar</strong>';
  }
}

function showDivSucursales() {
  if (contenedor.style.display == 'block') {
    contenedor.style.display = 'none';
    b_new.style.display = 'block';
    b_show.style.display = 'block';
    b_mod.style.display = 'block';
    b_del.style.display = 'block';
    b_show.innerHTML = '<strong>Mostrar sucursales</strong>';
  } else {
    contenedor.style.display = 'block';
    b_new.style.display = 'none';
    b_mod.style.display = 'none';
    b_del.style.display = 'none';
    b_show.innerHTML = '<strong style = "color:red">Cerrar</strong>';
  }
}
const p = new Pintureria('Rio Color');
