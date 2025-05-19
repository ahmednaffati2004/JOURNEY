import { helpers } from '../utils/helpers.js';

export const initForms = () => {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', handleSubmit);
    });

    function handleSubmit(e) {
        e.preventDefault();
        
        if (validateForm(this)) {
            submitForm(this);
        }
    }

    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input, textarea, select');

        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                showError(input, 'This field is required');
                isValid = false;
            } else if (input.type === 'email' && !helpers.isValidEmail(input.value)) {
                showError(input, 'Please enter a valid email');
                isValid = false;
            }
        });

        return isValid;
    }

    function showError(input, message) {
        const errorElement = input.nextElementSibling?.classList.contains('error-message') 
            ? input.nextElementSibling 
            : createErrorElement(message);
        
        input.classList.add('error');
        if (!input.nextElementSibling?.classList.contains('error-message')) {
            input.parentNode.insertBefore(errorElement, input.nextSibling);
        }
    }

    function createErrorElement(message) {
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        return error;
    }

    async function submitForm(form) {
        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Form submission failed');

            showSuccess(form);
            form.reset();
        } catch (error) {
            console.error('Form submission error:', error);
            showError(form, 'Something went wrong. Please try again.');
        }
    }
}; 