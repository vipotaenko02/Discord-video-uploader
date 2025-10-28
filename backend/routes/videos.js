const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const { Video } = require('../models');

const router = express.Router();

module.exports = (upload) => {

    // Загрузка видео
    router.post('/upload', upload.single('video'), async (req, res) => {
        try {
            console.log('File received:', req.file); // Добавляем лог для отладки

            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }

            const { originalname, filename, path: filepath, size } = req.file;

            // Создаем запись в базе данных
            const video = await Video.create({
                originalName: originalname,
                filename: filename,
                filepath: filepath,
                filesize: size,
                duration: null,
                width: null,
                height: null
            });

            console.log('Video saved to DB:', video.id); // Лог успешного сохранения

            res.json({
                message: 'File uploaded successfully',
                video: video
            });

        } catch (error) {
            console.error('Upload error details:', error);
            res.status(500).json({ error: 'Upload failed: ' + error.message });
        }
    });

    // ... остальные роуты остаются без изменений
    // Получение списка всех видео
    router.get('/', async (req, res) => {
        try {
            const videos = await Video.findAll({
                order: [['createdAt', 'DESC']]
            });
            res.json(videos);
        } catch (error) {
            console.error('Get videos error:', error);
            res.status(500).json({ error: 'Failed to get videos: ' + error.message });
        }
    });

    // Получение конкретного видео по ID
    router.get('/:id', async (req, res) => {
        try {
            const video = await Video.findByPk(req.params.id);

            if (!video) {
                return res.status(404).json({ error: 'Video not found' });
            }

            res.json(video);
        } catch (error) {
            console.error('Get video error:', error);
            res.status(500).json({ error: 'Failed to get video: ' + error.message });
        }
    });

    // Удаление видео
    router.delete('/:id', async (req, res) => {
        try {
            const video = await Video.findByPk(req.params.id);

            if (!video) {
                return res.status(404).json({ error: 'Video not found' });
            }

            // Пока просто удаляем из БД, без удаления файла
            await video.destroy();

            res.json({ message: 'Video deleted successfully' });
        } catch (error) {
            console.error('Delete video error:', error);
            res.status(500).json({ error: 'Failed to delete video: ' + error.message });
        }
    });

    return router;
};