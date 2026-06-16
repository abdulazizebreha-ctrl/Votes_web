const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

let data = {
    winner: { name: "ባለፈው ሳምንት አሸናፊ", photo: "https://i.ibb.co/wJv0qQn/placeholder.png" },
    candidates: [
        { name: "ዳጊ", photo: "https://i.ibb.co/wJv0qQn/placeholder.png" },
        { name: "ፀጋዘአብ", photo: "https://i.ibb.co/wJv0qQn/placeholder.png" },
        { name: "አሹ", photo: "https://i.ibb.co/wJv0qQn/placeholder.png" }
    ]
};

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/api/data', (req, res) => res.json(data));
app.post('/submit-vote', (req, res) => res.send('<h1>ድምፅዎ ተመዝግቧል!</h1>'));

app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
