import React from 'react';
import VideoItem from './VideoItem';

const VideoList = ({ videos, onDeleteVideo, loading }) => {
    if (loading) {
        return <div>Загрузка видео...</div>;
    }

    if (videos.length === 0) {
        return <div>Нет загруженных видео</div>;
    }

    return (
        <div>
            <h2>Мои видео</h2>
            {videos.map(video => (
                <VideoItem
                    key={video.id}
                    video={video}
                    onDelete={onDeleteVideo}
                />
            ))}
        </div>
    );
};

export default VideoList;