const Video = require("./video");
const sequelize = require("../config/database");


// Здесь можешь добавить другие модели
const models = {
    Video
}

sequelize.sync( {force: false})  // force true - удаляет и создает таблицы заного
.then(() => { console.log("Database Connected!"); })
.catch(err => console.log('Database connected error',err));


module.exports = models;

