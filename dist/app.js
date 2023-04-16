const form = document.querySelector('.form');
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