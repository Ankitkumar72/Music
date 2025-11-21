// server/src/app.js
require('dotenv').config();
// const express = require('express');
const http = require('http');
const path = require('path');
const { startSocket } = require('./socket');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); // <-- add this line early (allow dev connections)
app.use(express.json());

// serve static files (e.g., audio files for mock AI)
app.use('/static', express.static(path.join(__dirname, '..', 'static')));

app.get('/health', (req, res) => res.json({ ok: true }));

const server = http.createServer(app);
startSocket(server);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server listening on ${PORT}`));
