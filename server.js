import express from 'express';
import { routerSuc } from './Sucursales/Sucursales.routes.js';
import { routerProd } from './Productos/Productos.routes.js';
import { routerUsu } from './Usuarios/Usuario.routes.js';
import { routerCli } from './Clientes/Cliente.routes.js';
import { routerSupplier } from './Proveedores/Proveedores.routes.js';
import { routerEmp } from './Empleado/Empleados.routes.js';
import { routerVenta } from './Ventas/Ventas.routes.js';
import { routerRenglon } from './Ventas/Renglon/Renglon.routes.js';
import { PORT } from './config.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const port = PORT;

//Abre servidor con Express
export const app = express();

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true, 
}));

//middleware para obtener el cuerpo de los formulario
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/Branches', routerSuc);
app.use('/Clients', routerCli);
app.use('/Products', routerProd);
app.use('/Users', routerUsu);
app.use('/Suppliers', routerSupplier);
app.use('/Employees', routerEmp);
app.use('/Sales', routerVenta);
app.use('/Rows', routerRenglon);


//prueba de persistencia de cookie
app.get('/protected', (req, res) => {
  const token = req.cookies.access_token;

  if (token) {
    res.status(200).json({ message: 'Acceso permitido', token });
  } else {
    res.status(401).json({ message: 'No autorizado' });
  }
});


app.use((_, res) => {
  return res.status(404).send({ message: 'Pagina no encontrada' });
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

