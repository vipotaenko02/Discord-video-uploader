import React, { useState } from 'react';
import { videoAPI } from '../services/api';

const VideoUpload = ({ onVideoUploaded }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('video', selectedFile);

        try {
            const response = await videoAPI.uploadVideo(formData);
            alert('Видео успешно загружено!');
            setSelectedFile(null);
            document.getElementById('fileInput').value = '';

            // Обновляем список видео
            if (onVideoUploaded) {
                onVideoUploaded();
            }
        } catch (error) {
            console.error('Ошибка загрузки:', error);
            alert('Ошибка при загрузке видео');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="upload-container">
            <h2>Загрузка видео</h2>
            <div>
                <input
                    id="fileInput"
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                />
            </div>
            <div>
                <button
                    onClick={handleUpload}
                    disabled={!selectedFile || uploading}
                >
                    {uploading ? 'ЗАГРУЗКА...' : 'ЗАГРУЗИТЬ ВИДЕО'}
                </button>
            </div>
            {selectedFile && (
                <p>📁 Выбран файл: {selectedFile.name}</p>
            )}
        </div>
    );
};

export default VideoUpload;