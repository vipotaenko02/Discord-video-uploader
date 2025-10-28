import React from 'react';
import './App.css';

const AnimatedBackground = () => {
    // Создаем массив из 1600 квадратов (40x40 сетка)
    const squares = Array.from({ length: 1600 }, (_, index) => {
        // Генерируем случайную задержку от 0 до 8 секунд для каждого квадрата
        const randomDelay = (Math.random() * 8).toFixed(1);

        return (
            <div
                key={index}
                className="square"
                style={{
                    animationDelay: `${randomDelay}s`,
                    // Также добавим случайную длительность анимации для большего разнообразия
                    animationDuration: `${6 + Math.random() * 4}s` // от 6 до 10 секунд
                }}
            />
        );
    });

    return (
        <div className="background-squares">
            {squares}
        </div>
    );
};

export default AnimatedBackground;