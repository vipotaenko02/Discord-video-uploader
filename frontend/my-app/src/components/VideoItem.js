import React from 'react';

const VideoItem = ({ video, onDelete }) => {
    const handleDelete = async () => {
        if (window.confirm('Удалить это видео?')) {
            try {
                await onDelete(video.id);
            } catch (error) {
                alert('Ошибка при удалении видео');
            }
        }
    };

    return (
        <div className="video-item">
            <h3>🎬 {video.originalName}</h3>
            <p>📦 Размер: {(video.filesize / 1024 / 1024).toFixed(2)} MB</p>
            <p>📅 Загружено: {new Date(video.createdAt).toLocaleDateString()}</p>

            <div style={{
                marginTop: '1rem',
                display: 'flex',
                alignItems: 'center', // Выравниваем по вертикали
                gap: '1rem', // Отступ между элементами
                flexWrap: 'wrap' // Перенос на мобильных
            }}>
                <a
                    href={`https://zack.potko.ru/video/${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        flexShrink: 0 // Запрещаем сжатие
                    }}
                >
                    🔗 Открыть для Discord
                </a>

                <button
                    onClick={handleDelete}
                    className="danger"
                    style={{
                        padding: '14px 24px', // Приводим к такому же padding как у других кнопок
                        border: 'none',
                        cursor: 'pointer',
                        flexShrink: 0 // Запрещаем сжатие
                    }}
                >
                    🗑️ Удалить
                </button>
            </div>
        </div>
    );
};

export default VideoItem;