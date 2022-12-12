
// <---------- Вспомогательные функции ---------->

export function $(a, b, c) {
    if (c) return a.querySelectorAll(b);
    else return a.querySelector(b);
}

// <---------- Вспомогательные переменные ---------->

// <---------- Экспор в другие файлы JS ---------->