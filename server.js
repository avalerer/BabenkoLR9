const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3001;
const filePath = path.join(__dirname, 'savedData.json');
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://127.0.0.1:3000',
    methods: ['POST', 'GET'],
    allowedHeaders: ['Content-Type']
}));

const validateData = (data) => {
    if (!data.name || !data.email || !data.age || !data.interest) {
        return 'Заповніть необхідні поля';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        return 'Електронна пошта заповнена неправильно';
    }
    return null;
};

app.post('/save', (req, res) => {
    const newData = req.body;

    const error = validateData(newData);
    if (error) {
        return res.status(400).json({ success: false, message: error });
    }

    let existingData = [];
    if (fs.existsSync(filePath)) {
        existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }

    existingData.push(newData);
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    res.json({ success: true, message: 'Дані збережено' });
});

app.listen(PORT, () => { console.log('Сервер запущено!'); });
