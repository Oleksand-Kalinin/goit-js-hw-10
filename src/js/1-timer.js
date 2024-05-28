import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



let userSelectedDate;

const docTimer = {
    btnGoBackEl: document.querySelector('.btn-go-back'),
    btnStartTimerEl: document.querySelector('button[data-start]'),
    inputDateEl: document.querySelector('#datetime-picker'),
    spanDaysEl: document.querySelector('[data-days]'),
    spanHoursEl: document.querySelector('[data-hours]'),
    spanMinutesEl: document.querySelector('[data-minutes]'),
    spanSecondsEl: document.querySelector('[data-seconds]'),
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0].getTime() < Date.now()) {
            docTimer.btnStartTimerEl.setAttribute('disabled', '');
            iziToast.error({
                message: 'Please choose a date in the future',
                position: 'topCenter',
                backgroundColor: '#f2aeb2',
            });
        } else {
            docTimer.btnStartTimerEl.removeAttribute('disabled');
            userSelectedDate = selectedDates[0];
        }
    },
};

flatpickr('#datetime-picker', options);


function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}


docTimer.btnGoBackEl.addEventListener('click', () => window.location.href = './index.html');


docTimer.btnStartTimerEl.addEventListener('click', () => {

    docTimer.btnStartTimerEl.setAttribute('disabled', '');
    docTimer.inputDateEl.setAttribute('disabled', '');

    if (userSelectedDate - Date.now() <= 300) {
        docTimer.inputDateEl.removeAttribute('disabled');
        iziToast.error({
            message: 'Please choose a date in the future',
            position: 'topCenter',
            backgroundColor: '#f2aeb2',
        });
    }

    function addLeadingZero(time) {
        return time.toString().length === 1 ? `0${time}` : time;
    }

    const timerId = setInterval(() => {
        if (userSelectedDate - Date.now() < 300) {
            clearInterval(timerId);
            docTimer.inputDateEl.removeAttribute('disabled');
        } else {
            const differenceTime = convertMs(userSelectedDate - Date.now());

            docTimer.spanDaysEl.textContent = addLeadingZero(differenceTime.days);
            docTimer.spanHoursEl.textContent = addLeadingZero(differenceTime.hours);
            docTimer.spanMinutesEl.textContent = addLeadingZero(differenceTime.minutes);
            docTimer.spanSecondsEl.textContent = addLeadingZero(differenceTime.seconds);
        }
    }, 1000);
})