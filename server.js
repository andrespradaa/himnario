const express = require('express');
const app = express();
const path = require('path');

// Middleware para permitir solicitudes CORS desde cualquier origen
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Ruta para servir archivos estáticos
app.use(express.static('public'));

// Ruta para servir archivos JSON desde la carpeta 'data'
app.get('/data/:filename', (req, res) => {
    const filename = req.params.filename;
    res.sendFile(path.join(__dirname, 'data', filename));
});

// Iniciar el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
