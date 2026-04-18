document.addEventListener('DOMContentLoaded', () => {

    // Toggle Password Visibility
    const togglePasswordBtns = document.querySelectorAll('.password-toggle');
    
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Find the closest input relative to this button
            const input = this.previousElementSibling.previousElementSibling; // Button -> label -> input
            
            // Note: Structure is <input><label><button>
            // Alternative: select by parent
            const parent = this.parentElement;
            const targetInput = parent.querySelector('input');

            if (targetInput) {
                if (targetInput.type === 'password') {
                    targetInput.type = 'text';
                    this.textContent = 'visibility_off'; // assuming Material Icons
                } else {
                    targetInput.type = 'password';
                    this.textContent = 'visibility';
                }
            }
        });
    });

    // OTP Input Logic (Auto-focus next input)
    const otpInputs = document.querySelectorAll('.otp-input');
    
    if (otpInputs.length > 0) {
        otpInputs.forEach((input, index) => {
            input.addEventListener('input', function() {
                if (this.value.length > 1) {
                    this.value = this.value.slice(0, 1); // limit to 1 char
                }
                
                if (this.value.length === 1 && index < otpInputs.length - 1) {
                    otpInputs[index + 1].focus();
                }
            });

            input.addEventListener('keydown', function(e) {
                if (e.key === 'Backspace' && this.value.length === 0 && index > 0) {
                    otpInputs[index - 1].focus();
                }
            });
        });
    }

});
