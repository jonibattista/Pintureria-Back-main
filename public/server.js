import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Obtener el nombre del archivo y el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Define una ruta simple
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/carrito', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'carrito.html'));
});
app.get('/favoritos', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'favoritos.html'));
});
app.get('/perfil', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'perfil.html'));
});
app.get('/tienda', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'tienda.html'));
});
app.get('/sucursales', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'sucursales.html'));
});
app.get('/clientes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'clientes.html'));
});
app.get('/empleados', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'empleados.html'));
});
app.get('/productos', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'productos.html'));
});
app.get('/proveedores', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'proveedores.html'));
});
app.get('/ventas', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'ventas.html'));
});
// Inicia el servidor
app.listen(3000, () => {
  console.log(`Servidor escuchando en http://localhost:3000`);
});
