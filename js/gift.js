
// <---------- Импорт из других файлов JS ---------->

import {$} from './main.js';

// <---------- Основные переменные ---------->

const doc = document;
const zeroBox = $(doc, '.zero__box');
const giftBoxContent = $(doc, '.giftbox__content');
const giftBoxButton = $(doc, '.giftbox__button');
const buttonMd = $(doc, '.button__md');
const giftBoxImg = $(doc, '.giftbox__img');
let giftBoxCount; // Количество коробок
// <--- Названия игрушек новогоднего качества --->
const toyNameNewyear = ['', 'черный шар', 'черная сосулька', 'пятиконечная звезда - шар', 'четырехконечная звезда - шар', 'золотая звезда - наконечник'];
// <--- Названия игрушек праздничного качества --->
const toyNameHoliday = ['', 'синий лунный шар', 'синий снеговик', 'синяя звезда - наконечник', 'синий стеклянный наконечник', 'морковь', 'классическая гирлянда', 'четырехконечная звезда - наконечник', 'галактический шар', 'новогодний подарок', 'стеклянный шар', 'золотой стеклянный наконечник', 'зеленый снеговик', 'ледяная сосулька', 'голубой блестящий шар', 'красный снеговик', 'красная звезда - наконечник', 'бантик', 'шар снежинка', 'шар снеговик', 'снеговик с ведром - шар'];
// <--- Названия игрушек подарочного качества --->
const toyNameGift = ['', 'синяя гирлянда', 'синяя полосатая сосулька', 'зеленый блестящий шар', 'зеленая полосатая сосулька', 'лаймовый полосатый шар', 'оранжевый блестящий шар', 'шар в горошек', 'фиолетовая гирлянда', 'фиолетовый блестящий шар', 'фиолетовый волнистый шар', 'красная гирлянда', 'красный лунный шар', 'красный блестящий шар', 'красная полосатая сосулька', 'красный волнистый шар', 'наконечник - звезда', 'желтая гирлянда', 'желтая полосатая сосулька'];
// <--- Названия игрушек обычного качества --->
const toyNameUsual = ['', 'синий шар', 'яркий синий шар', 'зеленый шар', 'яркий зеленый шар', 'фиолетовый шар', 'яркий фиолетовый шар', 'красный шар', 'яркий красный шар', 'серебряный шар', 'белый шар', 'желтый шар', 'яркий желтый шар'];
const toyQuality = ['обычное', 'подарочное', 'праздничное', 'новогоднее'];
const qualityCollection = [''];
const usualCollection = [''];
const giftCollection = [''];
const holidayCollection = [''];
const newyearCollection = [''];
const giftBoxReward = $(doc, '.giftbox__reward');

// <---------- Основные функции ---------->

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function randomGiftBox() {
    let rand = randomInteger(1, 176);
    giftBoxImg.src = `./../img/giftbox/box__${rand}.png`;
}

function boxReset() {
    if (giftBoxCount > 0) {
        zeroBox.classList.add('none');
        giftBoxContent.classList.remove('none');
        $(doc, '.boxcount__text').innerHTML = giftBoxCount;
        randomGiftBox();
    }
    else {
        zeroBox.classList.remove('none');
        giftBoxContent.classList.add('none');
    }
    giftBoxReward.classList.remove('usual__quality');
    giftBoxReward.classList.remove('gift__quality');
    giftBoxReward.classList.remove('holiday__quality');
    giftBoxReward.classList.remove('newyear__quality');
}



function boxOpen() {
    let point = 2;
    if (qualityCollection.length != 5) point = randomInteger(0, 7);
    if (point == 2 || point == 6) {
        let candy = randomInteger(1, 6);
        giftBoxReward.classList.add('newyear__quality');
        $(doc, '.reward__quality').innerHTML = 'новогоднее';
        $(doc, '.reward__name').innerHTML = 'сладость';
        $(doc, '.reward__img').src = `./../img/newyear__gift/candy/candy__${candy}.svg`;
    }
    else {
        let quality;
        while (true) {
            quality = randomInteger(0, 3);
            let k = 1;
            for (let i = 1; i < qualityCollection.length; i++) {
                if (quality == qualityCollection[i]) break;
                else k++;
            }
            if (k == qualityCollection.length) break;
        }
        let nameQuality = toyQuality[quality];
        let nameQualityStr, nameToy, toy;
        switch(quality) {
            case 0: {
                while (true) {
                    toy = randomInteger(1, toyNameUsual.length - 1);
                    let k = 1;
                    for (let i = 1; i < usualCollection.length; i++) {
                        if (toy == usualCollection[i]) break;
                        else k++;
                    }
                    if (k == usualCollection.length) break;
                }
                usualCollection[usualCollection.length] = toy;
                localStorage.setItem(`usualCollection${usualCollection.length}`, toy); // сохранение данных об обычном качестве
                if (usualCollection.length == toyNameUsual.length) {
                    qualityCollection[qualityCollection.length] = quality;
                    localStorage.setItem(`qualityCollection${qualityCollection.length}`, quality); // сохранение данных о качестве
                }
                nameToy = toyNameUsual[toy];
                nameQualityStr = 'usual__quality';
                break;
            }
            case 1: {
                while (true) {
                    toy = randomInteger(1, toyNameGift.length - 1);
                    let k = 1;
                    for (let i = 1; i < giftCollection.length; i++) {
                        if (toy == giftCollection[i]) break;
                        else k++;
                    }
                    if (k == giftCollection.length) break;
                }
                giftCollection[giftCollection.length] = toy;
                localStorage.setItem(`giftCollection${giftCollection.length}`, toy); // сохранение данных о подарочном качестве
                if (giftCollection.length == toyNameGift.length) {
                    qualityCollection[qualityCollection.length] = quality;
                    localStorage.setItem(`qualityCollection${qualityCollection.length}`, quality); // сохранение данных о качестве
                }
                nameToy = toyNameGift[toy];
                nameQualityStr = 'gift__quality';
                break;
            }
            case 2: {
                while (true) {
                    toy = randomInteger(1, toyNameHoliday.length - 1);
                    let k = 1;
                    for (let i = 1; i < holidayCollection.length; i++) {
                        if (toy == holidayCollection[i]) break;
                        else k++;
                    }
                    if (k == holidayCollection.length) break;
                }
                holidayCollection[holidayCollection.length] = toy;
                localStorage.setItem(`holidayCollection${holidayCollection.length}`, toy); // сохранение данных о праздничном качестве
                if (holidayCollection.length == toyNameHoliday.length) {
                    qualityCollection[qualityCollection.length] = quality;
                    localStorage.setItem(`qualityCollection${qualityCollection.length}`, quality); // сохранение данных о качестве
                }
                nameToy = toyNameHoliday[toy];
                nameQualityStr = 'holiday__quality';
                break;
            }
            case 3: {
                while (true) {
                    toy = randomInteger(1, toyNameNewyear.length - 1);
                    let k = 1;
                    for (let i = 1; i < newyearCollection.length; i++) {
                        if (toy == newyearCollection[i]) break;
                        else k++;
                    }
                    if (k == newyearCollection.length) break;
                }
                newyearCollection[newyearCollection.length] = toy;
                localStorage.setItem(`newyearCollection${newyearCollection.length}`, toy); // сохранение данных о новогоднем качестве
                if (newyearCollection.length == toyNameNewyear.length) {
                    qualityCollection[qualityCollection.length] = quality;
                    localStorage.setItem(`qualityCollection${qualityCollection.length}`, quality); // сохранение данных о качестве
                }
                nameToy = toyNameNewyear[toy];
                nameQualityStr = 'newyear__quality';
                break;
            }
        }
        giftBoxReward.classList.add(nameQualityStr);
        $(doc, '.reward__quality').innerHTML = nameQuality;
        $(doc, '.reward__name').innerHTML = nameToy;
        $(doc, '.reward__img').src = `./../img/christmas__toy/${nameQualityStr}/toy__${toy}.svg`;
    }
}

// <---------- Загрузка объектов ---------->

for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (key.includes('giftBoxCount')) {
        giftBoxCount = localStorage.getItem(key);
    }
    else if (key.includes('usualCollection')) {
        usualCollection[usualCollection.length] = localStorage.getItem(key);
    }
    else if (key.includes('giftCollection')) {
        giftCollection[giftCollection.length] = localStorage.getItem(key);
    }
    else if (key.includes('holidayCollection')) {
        holidayCollection[qualityCollection.length] = localStorage.getItem(key);
    }
    else if (key.includes('newyearCollection')) {
        newyearCollection[qualityCollection.length] = localStorage.getItem(key);
    }
    else if (key.includes('qualityCollection')) {
        qualityCollection[qualityCollection.length] = localStorage.getItem(key);
    }
}

// <---------- Основной код ---------->

boxReset();

giftBoxButton.addEventListener('click', function() {
    this.parentNode.classList.add('open');
    boxOpen();
    giftBoxCount--;
    localStorage.setItem('giftBoxCount', giftBoxCount);
})

buttonMd.addEventListener('click', function() {
    giftBoxContent.classList.remove('open');
    boxReset();
})