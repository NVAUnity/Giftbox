
// <---------- Импорт из других файлов JS ---------->

import {$} from './main.js';

// <---------- Основные функции ---------->

// <---------- Основные переменные ---------->

const doc = document;
const quest = $(doc, '.quest', true);
let giftBoxCount = 0; // Количество коробок

// <---------- Загрузка объектов ---------->

for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (key.includes('quest')) {
        $(quest[key.slice(5)], '.button__sm').classList.add('none');
        $(quest[key.slice(5)], '.done').innerHTML = '(Выполнено)';
    }
    else if (key.includes('giftBoxCount')) {
        giftBoxCount = localStorage.getItem(key);
    }
}

// <---------- Основной код ---------->

quest.forEach(function(item) {
    item.addEventListener('click', function() {
        quest.forEach(function(i) {
            i.classList.add('none');
        })
        this.classList.remove('none');
    }) 
})

const buttonSm = $(doc, '.button__sm', true);
buttonSm.forEach(function(item, index) {
    item.addEventListener('click', function() {
        this.classList.add('none');
        let questParent = this.parentNode.parentNode;
        $(questParent, '.done').innerHTML = '(Выполнено)';
        let key = `quest${index}`;
        localStorage.setItem(key, 1);
        giftBoxCount++;
        localStorage.setItem('giftBoxCount', giftBoxCount);
    })
})