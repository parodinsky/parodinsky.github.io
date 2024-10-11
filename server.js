// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/contador-visitas', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Crear un esquema y modelo para las visitas
const visitaSchema = new mongoose.Schema({
    count: { type: Number, default: 0 },
});

const Visita = mongoose.model('Visita', visitaSchema);

// Ruta para obtener el contador
app.get('/api/contador', async (req, res) => {
    const visita = await Visita.findOne();
    res.json(visita);
});

// Ruta para incrementar el contador
app.post('/api/contador', async (req, res) => {
    const visita = await Visita.findOne();
    if (visita) {
        visita.count++;
        await visita.save();
    } else {
        const newVisita = new Visita({ count: 1 });
        await newVisita.save();
    }
    res.json({ message: 'Contador incrementado' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});
