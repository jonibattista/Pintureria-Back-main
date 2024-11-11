import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { routerSuc } from './Sucursales/Sucursales.routes.js';
import { routerProd } from './Productos/Productos.routes.js';
import { routerUsu } from './Usuarios/Usuario.routes.js';
import { routerCli } from './Clientes/Cliente.routes.js';
import { routerSupplier } from './Proveedores/Proveedores.routes.js';
import { routerEmp } from './Empleado/Empleados.routes.js';
import { routerVenta } from './Ventas/Ventas.routes.js';
import { routerRenglon } from './Ventas/Renglon/Renglon.routes.js';
import cors from 'cors';

const port = 8080;

//Abre servidor con Express
export const app = express();

//middleware para obtener el cuerpo de los formulario
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Obtener el nombre del archivo y el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());


app.use('/allBranches', routerSuc);
app.use('/allClients', routerCli);
app.use('/allProducts', routerProd);
app.use('/allUsers', routerUsu);
app.use('/allSuppliers', routerSupplier);
app.use('/allEmployees', routerEmp);
app.use('/allSales', routerVenta);
app.use('/allRows', routerRenglon);

app.use((_, res) => {
  return res.status(404).send({ message: 'Pagina no encontrada' });
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

