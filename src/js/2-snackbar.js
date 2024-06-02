import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const btnGoBackEl = document.querySelector('.btn-go-back');
btnGoBackEl.addEventListener('click', () => window.location.href = './index.html');

const formSnackbar = document.querySelector('.form')



formSnackbar.addEventListener('input', () => {
    const inputDelayEl = document.querySelector('input[name="delay"]')

    if (inputDelayEl.value < 0) {
        iziToast.error({
            message: `Please enter positive number`,
            position: 'topCenter',
        });
        inputDelayEl.value = 0;
    }
});

formSnackbar.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(formSnackbar);
    const delay = formData.get('delay');
    const state = formData.get('state');

    let isSuccess;
    if (state === 'fulfilled') {
        isSuccess = true;
    }
    if (state === 'rejected') {
        isSuccess = false;
    }

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            isSuccess ? resolve(delay) : reject(delay);
        }, delay);
    });

    promise
        .then(delay => {
            iziToast.success({
                message: `Fulfilled promise in ${delay} ms`,
                position: 'topCenter',
            });
        })
        .catch(delay => {
            iziToast.error({
                message: `Rejected promise in ${delay} ms`,
                position: 'topCenter',
            });
        });
})