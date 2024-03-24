/*Напишите HTTP сервер на express и реализуйте два обработчика “/” и “/about”, где:

— На каждой странице реализован счетчик просмотров
— Значение счетчика необходимо сохранять в файл каждый раз, когда обновляется страница
— Также значение счетчика должно загружаться из файла, когда запускается обработчик страницы
— Таким образом счетчик не должен обнуляться каждый раз, когда перезапускается сервер. */
const express = require('express');
const fs = require('fs');

const app = express();

// Функция для сохранения значения счетчика в файл
function saveCounter(counter) {
    fs.writeFileSync('counter.txt', counter.toString(), 'utf8');
}

// Функция для загрузки значения счетчика из файла
function loadCounter() {
    try {
        return parseInt(fs.readFileSync('counter.txt', 'utf8'));
    } catch (error) {
        // Если файл не существует или произошла ошибка чтения, возвращаем 0
        return 0;
    }
}

// Обработчик для страницы "/"
app.get('/', (req, res) => {
    let counter = loadCounter(); // Загружаем значение счетчика из файла
    counter++; // Увеличиваем значение счетчика
    saveCounter(counter); // Сохраняем новое значение счетчика в файл
    res.send(`<h1>Home Page</h1><a href="/about">About Page</a><p>Counter: ${counter}</p>`);
});

// Обработчик для страницы "/about"
app.get('/about', (req, res) => {
    let counter = loadCounter(); // Загружаем значение счетчика из файла
    counter++; // Увеличиваем значение счетчика
    saveCounter(counter); // Сохраняем новое значение счетчика в файл
    res.send(`<h1>About Page</h1><a href="/">Home Page</a><p>Counter: ${counter}</p>`);
});

// Запуск сервера
app.listen(3000, () => {
    console.log(`Server is running on http://localhost:${3000}`);
});
