const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const { Video } = require('./models');
const videoRoutes = require('./routes/videos');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());


app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Настройка Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Обрабатываем оригинальное название файла - убираем проблемные символы
        const originalName = file.originalname;

        // Заменяем проблемные символы на подчеркивания
        const safeFileName = originalName
            .replace(/[!()]/g, '_') // Заменяем ! и () на _
            .replace(/\s+/g, '_')   // Заменяем пробелы на _
            .normalize('NFD')       // Нормализуем Unicode
            .replace(/[\u0300-\u036f]/g, ''); // Убираем диакритические знаки

        // Добавляем timestamp для уникальности
        const timestamp = Date.now();
        const finalFileName = `${timestamp}_${safeFileName}`;

        cb(null, finalFileName);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {

        if (file.mimetype.startsWith('video/')) {
            cb(null, true);
        } else {
            cb(new Error('Only video files are allowed!'), false);
        }
    }
});

//  роуты
app.use('/api/videos', videoRoutes(upload));


// Добавляем роут для страницы просмотра видео (для Discord)
app.get('/video/:id', async (req, res) => {
    try {
        const videoId = req.params.id;
        const video = await Video.findByPk(videoId);

        if (!video) {
            return res.status(404).send('Video not found');
        }

        // Формируем HTML с мета-тегами Open Graph
	console.log(req.protocol)
        const videoUrl = `//${req.get('host')}/uploads/${video.filename}`;
        const pageUrl = `//${req.get('host')}/video/${video.id}`;

        const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${video.originalName}</title>
      <meta property="og:title" content="${video.originalName}">
      <meta property="og:description" content="Watch this video">
      <meta property="og:type" content="video.other">
      <meta property="og:video" content="${videoUrl}">
      <meta property="og:video:type" content="video/mp4">
      <meta property="og:video:width" content="1280">
      <meta property="og:video:height" content="720">
      <meta property="og:url" content="${pageUrl}">
      <meta name="twitter:card" content="player">
      <meta name="twitter:player" content="${pageUrl}">
    </head>
    <body>
      <video controls width="50%" src="${videoUrl}"></video>
    </body>
    </html>
    `;

        res.send(html);
    } catch (error) {
        console.error('Video page error:', error);
        res.status(500).send('Server error');
    }
});


app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({ error: error.message });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});