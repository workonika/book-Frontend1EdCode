const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
// Получение пути запрашиваемого файла
const filePath = path.join(__dirname, '/index.html');
//  @todo Вынести в функцию грядку одинакового кода
// Чтение файла
    if (req.url === '/') {
        fs.readFile(filePath, (err, content) => {
            if (err) {
                // Если файл не найден, отдаем ошибку 404
                if (err.code === 'ENOENT') {
                    res.writeHead(404);
                    res.end('File not found');
                } else {
                    // Если произошла другая ошибка, отдаем ошибку сервера 500
                    res.writeHead(500);
                    res.end('Server Error');
                }
            } else {
                // Если файл найден, отдаем его содержимое
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content, 'utf-8');
            }
        });
    }
});

app.get('/style.css', (req, res) => {
    // Получение пути запрашиваемого файла
    const filePath = path.join(__dirname, '/style.css');

    fs.readFile(filePath, (err, content) => {
        if (err) {
            // Если файл не найден, отдаем ошибку 404
            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end('File not found');
            } else {
                // Если произошла другая ошибка, отдаем ошибку сервера 500
                res.writeHead(500);
                res.end('Server Error');
            }
        } else {
            // Если файл найден, отдаем его содержимое
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(content, 'utf-8');
        }
    });
});

// Обработка GET запроса по пути /api/data
app.get('/api/data/:id', (req, res) => {

    const filePath = path.join(__dirname, '/data.json');

    fs.readFile(filePath, (err, content) => {
        if (err) {
            // Если файл не найден, отдаем ошибку 404
            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end('File not found');
            } else {
                // Если произошла другая ошибка, отдаем ошибку сервера 500
                res.writeHead(500);
                res.end('Server Error');
            }
        } else {
            // Если файл найден, фильтруем данные по id и отдаем содержимое тура
            const data = JSON.parse(content);

            const tour = data.find(tour => tour.id == req.params.id);

            // Имитация задержки в 5 секунд. Для тестирования задержки можно поставить удобное вам время
            const delay = 5000;

            setTimeout(() => {
                res.json(tour);
            }, delay);
        }
    });
});

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
