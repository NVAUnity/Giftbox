
// <---------- Импорт из других файлов JS ---------->

import {$, load} from './main.js';

// <---------- Основные функции ---------->

// <---------- Основные переменные ---------->

const doc = document;
let usualCollectionCount = 0;
let giftCollectionCount = 0;
let holidayCollectionCount = 0;
let newyearCollectionCount = 0;
const statItem = $(doc, '.stat__item', true);
const statPoint = $(doc, '.stat__point', true);
let boxOpenCount = 0;

// <---------- Загрузка объектов ---------->

load();

for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (key.includes('usualCollection')) {
        usualCollectionCount++;
    }
    else if (key.includes('giftCollection')) {
        giftCollectionCount++;
    }
    else if (key.includes('holidayCollection')) {
        holidayCollectionCount++;
    }
    else if (key.includes('newyearCollection')) {
        newyearCollectionCount++;
    }
    else if (key.includes('boxOpenCount')) {
        boxOpenCount = localStorage.getItem(key);
    }
}

// <---------- Основной код ---------->

statPoint[0].innerHTML = `${newyearCollectionCount} / 5`;
if (newyearCollectionCount == 5) statItem[0].classList.add('active');
statPoint[1].innerHTML = `${holidayCollectionCount} / 20`;
if (holidayCollectionCount == 20) statItem[1].classList.add('active');
statPoint[2].innerHTML = `${giftCollectionCount} / 18`;
if (giftCollectionCount == 18) statItem[2].classList.add('active');
statPoint[3].innerHTML = `${usualCollectionCount} / 12`;
if (usualCollectionCount == 12) statItem[3].classList.add('active');
statPoint[4].innerHTML = `${boxOpenCount}`;
if (boxOpenCount > 13) statItem[4].classList.add('active');
