export const initBooking = () => {
    const bookingForm = document.querySelector('.booking-form');
    const datePickers = document.querySelectorAll('.date-picker');
    const guestInputs = document.querySelectorAll('.guest-input');

    if (bookingForm) {
        // Initialize date pickers
        datePickers.forEach(picker => {
            initDatePicker(picker);
        });

        // Initialize guest inputs
        guestInputs.forEach(input => {
            initGuestCounter(input);
        });

        // Form submission
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }

    function initDatePicker(element) {
        // Initialize your preferred date picker library
        // Example using flatpickr
        flatpickr(element, {
            minDate: 'today',
            dateFormat: 'Y-m-d',
            onChange: (selectedDates) => {
                updatePrice(selectedDates);
            }
        });
    }

    function initGuestCounter(element) {
        const decrease = element.querySelector('.decrease');
        const increase = element.querySelector('.increase');
        const count = element.querySelector('.count');

        decrease?.addEventListener('click', () => {
            updateCount(count, -1);
        });

        increase?.addEventListener('click', () => {
            updateCount(count, 1);
        });
    }

    function updateCount(element, change) {
        const currentValue = parseInt(element.textContent);
        const newValue = Math.max(1, currentValue + change);
        element.textContent = newValue;
        updatePrice();
    }

    function updatePrice(dates) {
        // Add your price calculation logic here
    }

    async function handleBookingSubmit(e) {
        e.preventDefault();
        // Add your booking submission logic here
    }
}; 