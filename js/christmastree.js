
// <---------- Импорт из других файлов JS ---------->

import {$, load} from './main.js';

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
const usualCollection = [];
const giftCollection = [];
const holidayCollection = [];
const newyearCollection = [];
const qualityCollection = [];
let indexToyAdd;

// <---------- Загрузка объектов ---------->

load();

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
        holidayCollection[holidayCollection.length] = localStorage.getItem(key);
        input('holiday', localStorage.getItem(key));
    }
    else if (key.includes('newyearCollection')) {
        newyearCollection[newyearCollection.length] = localStorage.getItem(key);
        input('newyear', localStorage.getItem(key));
    }
    else if (key.includes('qualityCollection')) {
        qualityCollection[qualityCollection.length] = localStorage.getItem(key);
    }
    else if (key.includes('toyAdd')) {
        if (key.slice(6) == toyAdd.length - 1) $(doc, '.garland').src = localStorage.getItem(key);
        else {
            $(toyAdd[key.slice(6)], '.toy__add--img').src = localStorage.getItem(key);
            if (key.slice(6) == 0) $(toyAdd[key.slice(6)], '.toy__add--img').classList.add('first');
            else  $(toyAdd[key.slice(6)], '.toy__add--img').classList.add('toy');
        }
    }
    else if (key.includes('delete')) {
        $(toyAdd[key.slice(6)], '.toy__add--img').src = './../img/design/christmastree/toy__add.png';
        if (key.slice(6) == 0) $(toyAdd[key.slice(6)], '.toy__add--img').classList.remove('first');
        else if (key.slice(6) == toyAdd.length - 1) $(doc, '.garland').src = '';
        else $(toyAdd[key.slice(6)], '.toy__add--img').classList.remove('toy');
    }
}

// <---------- Основной код ---------->

toyAdd.forEach(function(item, index) {
    item.addEventListener('click', function() {
        toyCollection.classList.remove('none');
        indexToyAdd = index;
        this.addEventListener('click', function() {
            if (indexToyAdd == toyAdd.length - 1) $(doc, '.garland').src = '';
            else if (indexToyAdd == 0) $(toyAdd[indexToyAdd], '.toy__add--img').classList.remove('first');
            else $(toyAdd[indexToyAdd], '.toy__add--img').classList.remove('toy');
            $(this, '.toy__add--img').src = './../img/design/christmastree/toy__add.png';
            localStorage.setItem(`delete${indexToyAdd}`, 1);
            localStorage.removeItem(`toyAdd${indexToyAdd}`);
        })
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
        localStorage.setItem(`toyAdd${indexToyAdd}`, $(this, '.toy__item--img').src);
        localStorage.removeItem(`delete${indexToyAdd}`);
    })
})
