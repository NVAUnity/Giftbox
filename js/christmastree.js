
// <---------- Импорт из других файлов JS ---------->

import {$, load} from './main.js';

// <---------- Основные функции ---------->

function create(a) {
    let div = doc.createElement('button');
    div.classList.add('toy__item');
    let img = doc.createElement('img');
    img.classList.add('toy__item--img');
    img.src = a;
    div.prepend(img);
    return div;
}

function input(a, b) {
    let str = `./../img/christmas__toy/${a}__quality/toy__${b}.svg`;
    let div = create(str);
    toyCollectionContent.append(div);
    toyItem = $(doc, '.toy__item', true);
}

// <---------- Основные переменные ---------->

const doc = document;
const toyAdd = $(doc, '.toy__add', true);
const toyCollection = $(doc, '.toy__collection');
const toyCollectionContent = $(doc, '.toy__collection--content');
let toyItem;
let indexToyAdd;

// <---------- Загрузка объектов ---------->

load();

for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (key.includes('usualCollection')) input('usual', localStorage.getItem(key));
    else if (key.includes('giftCollection')) input('gift', localStorage.getItem(key));
    else if (key.includes('holidayCollection')) input('holiday', localStorage.getItem(key));
    else if (key.includes('newyearCollection')) input('newyear', localStorage.getItem(key));
    else if (key.includes('toyAdd')) {
        if (key.slice(6) == toyAdd.length - 1) {
            $(toyAdd[key.slice(6)], '.toy__add--img').classList.add('garlands');
            $(doc, '.garland').src = localStorage.getItem(key);
        }
        else {
            $(toyAdd[key.slice(6)], '.toy__add--img').src = localStorage.getItem(key);
            if (key.slice(6) == 0) $(toyAdd[key.slice(6)], '.toy__add--img').classList.add('first');
            else  $(toyAdd[key.slice(6)], '.toy__add--img').classList.add('toy');
        }
    }
}

for (let i = 0; i < toyItem.length; i++) {
    for (let j = 0; j < toyAdd.length; j++) {
        if ($(toyItem[i], '.toy__item--img').src == $(toyAdd[j], '.toy__add--img').src) toyItem[i].remove();
    }
}

// <---------- Основной код ---------->

toyAdd.forEach(function(item, index) {
    item.addEventListener('click', function() {
        toyCollection.classList.remove('none');
        indexToyAdd = index;
        this.addEventListener('click', function() {
            if ($(this, '.toy__add--img').classList.contains('garlands')) {
                let div = create($(doc, '.garland').src);
                toyCollectionContent.append(div);
                $(doc, '.garland').src = '';
                $(this, '.toy__add--img').classList.remove('garlands');
            }
            else if ($(this, '.toy__add--img').classList.contains('first') || $(this, '.toy__add--img').classList.contains('toy')) {
                let div = create($(this, '.toy__add--img').src);
                toyCollectionContent.append(div);
                $(this, '.toy__add--img').classList.remove('first');
                $(this, '.toy__add--img').classList.remove('toy');
                $(this, '.toy__add--img').src = './../img/design/christmastree/toy__add.png';
            }
            toyItem = $(doc, '.toy__item', true);
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
            $(toyAdd[indexToyAdd], '.toy__add--img').classList.add('garlands');
        }
        else {
            $(toyAdd[indexToyAdd], '.toy__add--img').src = $(this, '.toy__item--img').src;
            $(toyAdd[indexToyAdd], '.toy__add--img').classList.add('toy');
        }
        this.remove();
        localStorage.setItem(`toyAdd${indexToyAdd}`, $(this, '.toy__item--img').src);
        localStorage.removeItem(`delete${indexToyAdd}`);
    })
})
