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

    form.addEventListener('submit', e => {
        e.preventDefault();
    })
}

const collapseElList = document.querySelectorAll('.collapse');
const collapseTogglers = document.querySelectorAll('[data-ek-toggle]');


const resetCollapse = (collapseEl) => {
    collapseEl.classList.remove('show');
    collapseEl.style.maxHeight = null;
}

collapseToggleHandler = e => {
    const clickedEl = e.target;
    if (clickedEl.tagName === 'A') e.preventDefault();



    const target = clickedEl.dataset.ekTarget || '#' + clickedEl.href.split('#')[1];

    const targetCollapse = document.querySelector(target);

    if (clickedEl.classList.contains('navbar__toggler')) clickedEl.classList.toggle('open');
    
    if (targetCollapse.classList.contains('show')) {
        clickedEl.classList.remove('collapse-show');
        resetCollapse(targetCollapse);
    } else {
        const collapseParent = document.querySelector(`${targetCollapse.dataset.ekParent}`);
        const openedCollapses = collapseParent?.querySelectorAll('.collapse.show');
        const openedCollapsesTogglers = collapseParent?.querySelectorAll('.collapse-show');
        openedCollapsesTogglers.forEach(el => el.classList.remove('collapse-show'));
        clickedEl.classList.add('collapse-show');
        console.log(openedCollapsesTogglers);
        if (openedCollapses) {
            openedCollapses.forEach(collapse => {
                resetCollapse(collapse);
            })
        }
        
        targetCollapse.classList.add('show');
        targetCollapse.style.maxHeight = targetCollapse.scrollHeight + 2 + 'px';
    }

    
}


if (collapseTogglers) {
    collapseTogglers.forEach(toggler => toggler.addEventListener('click', collapseToggleHandler));
}


// Dismiss

const dismissTriggers = document.querySelectorAll('[data-ek-dismiss]');
console.log(dismissTriggers);

const dismissHandler = e => {
    const target = e.target;
    const dismissType = target.dataset.ekDismiss;

    if (dismissType === 'modal') {
        const modal = target.closest('.modal');
        modal?.classList.remove('show');
    }
}

if (dismissTriggers) {
    dismissTriggers.forEach(trigger => trigger.addEventListener('click', dismissHandler));
}
