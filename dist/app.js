const form = document.querySelector('.form');

if (form) {
    const requiredInputs = form.querySelectorAll('.form__control:required');

    const addOnlyUniqueClass = (el, className) => {
        if (el.classList.contains(className)) return;
        el.classList.add(className);
    }

    requiredInputs.forEach(input => {
        input.addEventListener('blur', (e) => {
            addOnlyUniqueClass(e.target, 'blurred');
        })
    })
    console.log(requiredInputs);

    form.addEventListener('submit', e => {
        e.preventDefault();
    })
}

const collapseElList = document.querySelectorAll('.collapse');
const collapseTogglers = document.querySelectorAll('[data-ek-toggle]');


collapseToggleHandler = e => {
    if (e.target.tagName === 'A') e.preventDefault();

    const target = e.target.dataset.ekTarget || '#' + e.target.href.split('#')[1];

    const targetCollapse = document.querySelector(target);
    
    if (targetCollapse.classList.contains('show')) {
        targetCollapse.classList.remove('show');
        targetCollapse.style.maxHeight = null;
    } else {
        targetCollapse.classList.add('show');
        targetCollapse.style.maxHeight = targetCollapse.scrollHeight + 'px';
    }

    
}


if (collapseTogglers) {
    collapseTogglers.forEach(toggler => toggler.addEventListener('click', collapseToggleHandler));
}