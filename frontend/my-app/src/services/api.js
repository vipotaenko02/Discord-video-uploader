import axios from 'axios';

const API_BASE = 'https://zack.potko.ru/api';

export const videoAPI = {
    // Загрузка видео
    uploadVideo: (formData) => {
        return axios.post(`${API_BASE}/videos/upload`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },

    // Получение списка видео
    getVideos: () => {
        return axios.get(`${API_BASE}/videos`);
    },

    // Получение одного видео
    getVideo: (id) => {
        return axios.get(`${API_BASE}/videos/${id}`);
    },

    // Удаление видео
    deleteVideo: (id) => {
        return axios.delete(`${API_BASE}/videos/${id}`);
    }
};