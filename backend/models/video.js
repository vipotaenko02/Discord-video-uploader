const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Video = sequelize.define('Video', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    originalName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    filename: {
        type: DataTypes.STRING,
        allowNull: false
    },
    filepath: {
        type: DataTypes.STRING,
        allowNull: false
    },
    filesize: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    duration: {
        type: DataTypes.FLOAT,
        allowNull: true // ДОЛЖНО БЫТЬ true
    },
    width: {
        type: DataTypes.INTEGER,
        allowNull: true // ДОЛЖНО БЫТЬ true
    },
    height: {
        type: DataTypes.INTEGER,
        allowNull: true // ДОЛЖНО БЫТЬ true
    }
}, {
    tableName: 'videos',
    timestamps: true
});

module.exports = Video;