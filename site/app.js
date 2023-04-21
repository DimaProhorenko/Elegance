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
const toggleEls = document.querySelectorAll('[data-ek-toggle]');



const toggleHandler = e => {
    const clickedEl = e.target;
    if (clickedEl.tagName === 'A') e.preventDefault();



    const targetQuery = clickedEl.dataset.ekTarget || '#' + clickedEl.href.split('#')[1];
    const toggleType = clickedEl.dataset.ekToggle;
    const target = document.querySelector(targetQuery);
    console.log(target);

    console.log(toggleType);

    if (toggleType === 'collapse') {
        collapseToggleHandler(clickedEl, target);
    } else if (toggleType === 'modal') {
        modalToggleHandler(target);
    }
}

const resetCollapse = (collapseEl) => {
    collapseEl.classList.remove('show');
    collapseEl.style.maxHeight = null;
}

collapseToggleHandler = (clickedEl, targetCollapse) => {

    if (clickedEl.classList.contains('navbar__toggler')) clickedEl.classList.toggle('open');
    
    if (targetCollapse.classList.contains('show')) {
        clickedEl.classList.remove('collapse-show');
        resetCollapse(targetCollapse);
    } else {
        const collapseParent = document.querySelector(`${targetCollapse.dataset.ekParent}`);
        const openedCollapses = collapseParent?.querySelectorAll('.collapse.show');
        const openedCollapsesTogglers = collapseParent?.querySelectorAll('.collapse-show');
        openedCollapsesTogglers?.forEach(el => el.classList.remove('collapse-show'));
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

const modalToggleHandler = (targetModal) => {
    targetModal.classList.toggle('show');

    if (targetModal.classList.contains('show')) {
        document.body.classList.add('body-no-scroll');
    } else {
        document.body.classList.remove('body-no-scroll');
    }
}


if (toggleEls) {
    toggleEls.forEach(toggler => toggler.addEventListener('click', toggleHandler));
}


const dismissTogglers = document.querySelectorAll('[data-ek-dismiss]');


const dismissHandler = e => {
    const type = e.target.dataset.ekDismiss;

    if (type === 'modal') {
        const modal = e.target.closest('.modal');
        modalToggleHandler(modal);
    }
}

dismissTogglers.forEach(el => el.addEventListener('click', dismissHandler));