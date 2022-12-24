
// <---------- Вспомогательные функции ---------->

export function $(a, b, c) {
    if (c) return a.querySelectorAll(b);
    else return a.querySelector(b);
}

export function load() {
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
}
