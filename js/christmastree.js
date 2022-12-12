
// <---------- Импорт из других файлов JS ---------->

import {$} from './main.js';

// <---------- Основные функции ---------->

function input(a, b) {
    let str = `./../img/christmas__toy/${a}__quality/toy__${b}.svg`;
    let div = doc.createElement('button');
    div.classList.add('toy__item');
    let img = doc.createElement('img');
    img.classList.add('toy__item--img');
    img.src = str;
    div.prepend(img);
    toyCollectionContent.append(div);
    toyItem = $(doc, '.toy__item', true);
}

// <---------- Основные переменные ---------->

const doc = document;
const toyAdd = $(doc, '.toy__add', true);
const toyCollection = $(doc, '.toy__collection');
const toyCollectionContent = $(doc, '.toy__collection--content');
let toyItem;
const usualCollection = [''];
const giftCollection = [''];
const holidayCollection = [''];
const newyearCollection = [''];
const qualityCollection = [];
let indexToyAdd;

// <---------- Загрузка объектов ---------->

for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (key.includes('usualCollection')) {
        usualCollection[usualCollection.length] = localStorage.getItem(key);
        input('usual', localStorage.getItem(key));
    }
    else if (key.includes('giftCollection')) {
        giftCollection[giftCollection.length] = localStorage.getItem(key);
        input('gift', localStorage.getItem(key));
    }
    else if (key.includes('holidayCollection')) {
        holidayCollection[qualityCollection.length] = localStorage.getItem(key);
        input('holiday', localStorage.getItem(key));
    }
    else if (key.includes('newyearCollection')) {
        newyearCollection[qualityCollection.length] = localStorage.getItem(key);
        input('newyear', localStorage.getItem(key));
    }
    else if (key.includes('qualityCollection')) {
        qualityCollection[qualityCollection.length] = localStorage.getItem(key);
    }
}

// <---------- Основной код ---------->

toyAdd.forEach(function(item, index) {
    item.addEventListener('click', function() {
        toyCollection.classList.remove('none');
        indexToyAdd = index;
    })
})

toyItem.forEach(function(item) {
    item.addEventListener('click', function() {
        if (indexToyAdd == 0) {
            $(toyAdd[indexToyAdd], '.toy__add--img').src = $(this, '.toy__item--img').src;
            $(toyAdd[indexToyAdd], '.toy__add--img').classList.add('first');
        }
        else if (indexToyAdd == toyAdd.length - 1) {
            $(doc, '.garland').src = $(this, '.toy__item--img').src;
        }
        else {
            $(toyAdd[indexToyAdd], '.toy__add--img').src = $(this, '.toy__item--img').src;
            $(toyAdd[indexToyAdd], '.toy__add--img').classList.add('toy');
        }
    })
})
