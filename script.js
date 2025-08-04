// Global variables
let currentStep = 1;
const totalSteps = 6;

// Initialize the form when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    setupEventListeners();
});

// Initialize form functionality
function initializeForm() {
    // Show the first step
    showStep(1);
    
    // Initialize star ratings
    initializeStarRatings();
}

// Set up event listeners
function setupEventListeners() {
    // Initialize custom dropdowns
    initializeCustomDropdowns();
    
    // Set up real-time validation
    setupRealTimeValidation();
    
    // Business type change handler
    const businessTypeSelect = document.getElementById('business-type');
    if (businessTypeSelect) {
        businessTypeSelect.addEventListener('change', function() {
            const otherInput = document.getElementById('other-business-type');
            if (this.value === 'other') {
                otherInput.style.display = 'block';
            } else {
                otherInput.style.display = 'none';
            }
        });
    }

    // Software usage radio buttons
    const softwareRadios = document.querySelectorAll('input[name="usesSoftware"]');
    softwareRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const softwareDetails = document.getElementById('software-details');
            const noSoftwareDetails = document.getElementById('no-software-details');
            
            if (this.value === 'yes') {
                softwareDetails.style.display = 'block';
                noSoftwareDetails.style.display = 'none';
            } else if (this.value === 'no') {
                softwareDetails.style.display = 'none';
                noSoftwareDetails.style.display = 'block';
            }
        });
    });

    // Lead time radio buttons
    const leadTimeRadios = document.querySelectorAll('input[name="needsLeadTime"]');
    leadTimeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const leadTimeDetails = document.getElementById('lead-time-details');
            
            if (this.value === 'yes') {
                leadTimeDetails.style.display = 'block';
            } else {
                leadTimeDetails.style.display = 'none';
            }
        });
    });

    // Customer struggles checkboxes
    const customerStrugglesCheckboxes = document.querySelectorAll('input[name="customerStruggles"]');
    customerStrugglesCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const otherInput = document.getElementById('customer-struggles-other');
            const otherCheckbox = document.querySelector('input[name="customerStruggles"][value="other"]');
            
            if (otherCheckbox.checked) {
                otherInput.style.display = 'block';
            } else {
                otherInput.style.display = 'none';
            }
        });
    });

    // Contact method change handler
    const contactMethodSelect = document.getElementById('contact-method');
    if (contactMethodSelect) {
        contactMethodSelect.addEventListener('change', function() {
            const emailInput = document.getElementById('email-input');
            const instagramInput = document.getElementById('instagram-input');
            const phoneInput = document.getElementById('phone-input');
            
            // Hide all inputs first
            emailInput.style.display = 'none';
            instagramInput.style.display = 'none';
            phoneInput.style.display = 'none';
            
            // Show the relevant input
            switch(this.value) {
                case 'email':
                    emailInput.style.display = 'block';
                    break;
                case 'instagram':
                    instagramInput.style.display = 'block';
                    break;
                case 'phone':
                    phoneInput.style.display = 'block';
                    break;
            }
        });
    }

// Initialize custom dropdowns
function initializeCustomDropdowns() {
    const dropdownButtons = document.querySelectorAll('.dropdown-button');
    
    dropdownButtons.forEach(button => {
        const menu = button.nextElementSibling;
        const arrow = button.querySelector('.dropdown-arrow');
        const hiddenInput = menu.nextElementSibling;
        const displaySpan = button.querySelector('span');
        
        // Toggle dropdown
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Close all other dropdowns
            document.querySelectorAll('.dropdown-menu').forEach(otherMenu => {
                if (otherMenu !== menu) {
                    otherMenu.classList.remove('open');
                    const otherArrow = otherMenu.previousElementSibling.querySelector('.dropdown-arrow');
                    if (otherArrow) otherArrow.classList.remove('open');
                }
            });
            
            // Toggle current dropdown
            menu.classList.toggle('open');
            if (arrow) arrow.classList.toggle('open');
        });
        
        // Handle option selection
        const options = menu.querySelectorAll('.dropdown-option');
        options.forEach(option => {
            option.addEventListener('click', function() {
                const value = this.dataset.value;
                const text = this.textContent;
                
                // Update display and hidden input
                displaySpan.textContent = text;
                hiddenInput.value = value;
                
                // Close dropdown
                menu.classList.remove('open');
                if (arrow) arrow.classList.remove('open');
                
                // Handle special cases
                if (hiddenInput.id === 'business-type' && value === 'other') {
                    document.getElementById('other-business-type').style.display = 'block';
                } else if (hiddenInput.id === 'business-type') {
                    document.getElementById('other-business-type').style.display = 'none';
                }
                
                if (hiddenInput.id === 'contact-method') {
                    const emailInput = document.getElementById('email-input');
                    const instagramInput = document.getElementById('instagram-input');
                    const phoneInput = document.getElementById('phone-input');
                    
                    // Hide all inputs first
                    emailInput.style.display = 'none';
                    instagramInput.style.display = 'none';
                    phoneInput.style.display = 'none';
                    
                    // Show the relevant input
                    switch(value) {
                        case 'email':
                            emailInput.style.display = 'block';
                            break;
                        case 'instagram':
                            instagramInput.style.display = 'block';
                            break;
                        case 'phone':
                            phoneInput.style.display = 'block';
                            break;
                    }
                }
                
                // Update button state after dropdown selection
                setTimeout(updateNextButton, 100);
            });
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown-container')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('open');
                const arrow = menu.previousElementSibling.querySelector('.dropdown-arrow');
                if (arrow) arrow.classList.remove('open');
            });
        }
    });
}

    // Form submission
    const form = document.getElementById('beta-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmission);
    }
}

// Set up real-time validation
function setupRealTimeValidation() {
    // Add event listeners to all form fields
    const allInputs = document.querySelectorAll('input, textarea');
    const allDropdowns = document.querySelectorAll('.dropdown-button');
    const allRadios = document.querySelectorAll('input[type="radio"]');
    const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    
    // Listen for changes on all inputs
    allInputs.forEach(input => {
        input.addEventListener('input', updateNextButton);
        input.addEventListener('change', updateNextButton);
    });
    
    // Listen for dropdown selections
    allDropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', () => {
            // Wait a bit for the dropdown selection to complete
            setTimeout(updateNextButton, 100);
        });
    });
    
    // Listen for radio button changes
    allRadios.forEach(radio => {
        radio.addEventListener('change', updateNextButton);
    });
    
    // Listen for checkbox changes
    allCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateNextButton);
    });
    
    // Initial check
    updateNextButton();
}

// Initialize star ratings
function initializeStarRatings() {
    const ratingContainers = document.querySelectorAll('.rating-stars');
    
    ratingContainers.forEach(container => {
        const stars = container.querySelectorAll('.star');
        const feature = container.dataset.feature;
        
        stars.forEach((star, index) => {
            star.addEventListener('click', function() {
                const value = parseInt(this.dataset.value);
                setRating(container, value, feature);
            });
            
            star.addEventListener('mouseenter', function() {
                const value = parseInt(this.dataset.value);
                highlightStars(container, value);
            });
            
            star.addEventListener('mouseleave', function() {
                const currentRating = getCurrentRating(container);
                highlightStars(container, currentRating);
            });
        });
    });
}

// Set rating for a feature
function setRating(container, value, feature) {
    const stars = container.querySelectorAll('.star');
    
    stars.forEach((star, index) => {
        if (index < value) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
    
    // Store the rating
    container.dataset.rating = value;
}

// Highlight stars on hover
function highlightStars(container, value) {
    const stars = container.querySelectorAll('.star');
    
    stars.forEach((star, index) => {
        if (index < value) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

// Get current rating
function getCurrentRating(container) {
    return parseInt(container.dataset.rating) || 0;
}

// Navigation functions
function nextStep() {
    if (validateCurrentStep()) {
        if (currentStep < totalSteps) {
            currentStep++;
            showStep(currentStep);
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}

// Show specific step
function showStep(stepNumber) {
    // Hide all steps
    const steps = document.querySelectorAll('.form-step');
    steps.forEach(step => {
        step.classList.remove('active');
    });
    
    // Show the current step
    const currentStepElement = document.querySelector(`[data-step="${stepNumber}"]`);
    if (currentStepElement) {
        currentStepElement.classList.add('active');
    }
    
    // Update current step variable
    currentStep = stepNumber;
    
    // Update button state for the new step
    updateNextButton();
    
    // Scroll to top of form
    const formContainer = document.querySelector('.form-container');
    if (formContainer) {
        formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Validate current step
function validateCurrentStep() {
    const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`);
    let isValid = true;
    
    // Clear previous error styling
    clearErrorStyling(currentStepElement);
    
    // Step 1: Business Info
    if (currentStep === 1) {
        const businessName = currentStepElement.querySelector('#business-name');
        const businessType = currentStepElement.querySelector('#business-type');
        const location = currentStepElement.querySelector('#location');
        const teamSize = currentStepElement.querySelector('#team-size');
        
        if (!businessName.value.trim()) {
            showFieldError(businessName, 'Please enter your business name');
            isValid = false;
        }
        
        if (!businessType.value) {
            showFieldError(currentStepElement.querySelector('#business-type-button'), 'Please select your business type');
            isValid = false;
        }
        
        if (!location.value.trim()) {
            showFieldError(location, 'Please enter your location');
            isValid = false;
        }
        
        if (!teamSize.value) {
            showFieldError(currentStepElement.querySelector('#team-size-button'), 'Please select your team size');
            isValid = false;
        }
        
        // Check if "Other" business type needs additional input
        if (businessType.value === 'other') {
            const otherInput = currentStepElement.querySelector('#other-business-type input');
            if (!otherInput.value.trim()) {
                showFieldError(otherInput, 'Please tell us about your business');
                isValid = false;
            }
        }
    }
    
    // Step 2: Current Tools
    if (currentStep === 2) {
        const softwareRadios = currentStepElement.querySelectorAll('input[name="usesSoftware"]');
        const hasSelection = Array.from(softwareRadios).some(radio => radio.checked);
        
        if (!hasSelection) {
            showRadioGroupError(currentStepElement.querySelector('.space-y-3'), 'Please select whether you use booking software');
            isValid = false;
        } else {
            const selectedValue = currentStepElement.querySelector('input[name="usesSoftware"]:checked').value;
            
            if (selectedValue === 'yes') {
                const currentSoftware = currentStepElement.querySelector('#current-software');
                
                if (!currentSoftware.value.trim()) {
                    showFieldError(currentSoftware, 'Please tell us what software you use');
                    isValid = false;
                }
            } else if (selectedValue === 'no') {
                const currentSystem = currentStepElement.querySelector('#current-system');
                const whyNoDigital = currentStepElement.querySelector('#why-no-digital');
                
                if (!currentSystem.value) {
                    showFieldError(currentStepElement.querySelector('#current-system-button'), 'Please select your current booking method');
                    isValid = false;
                }
                
                if (!whyNoDigital.value.trim()) {
                    showFieldError(whyNoDigital, 'Please tell us why you haven\'t tried a digital booking tool');
                    isValid = false;
                }
            }
        }
    }
    
    // Step 3: Service Specific
    if (currentStep === 3) {
        const leadTimeRadios = currentStepElement.querySelectorAll('input[name="needsLeadTime"]');
        const hasSelection = Array.from(leadTimeRadios).some(radio => radio.checked);
        
        if (!hasSelection) {
            showRadioGroupError(currentStepElement.querySelector('.space-y-3'), 'Please select whether you need lead time');
            isValid = false;
        } else {
            const selectedValue = currentStepElement.querySelector('input[name="needsLeadTime"]:checked').value;
            
            if (selectedValue === 'yes') {
                const leadTime = currentStepElement.querySelector('#lead-time');
                const slotDuration = currentStepElement.querySelector('#slot-duration');
                
                if (!leadTime.value) {
                    showFieldError(currentStepElement.querySelector('#lead-time-button'), 'Please select your lead time');
                    isValid = false;
                }
                
                if (!slotDuration.value) {
                    showFieldError(currentStepElement.querySelector('#slot-duration-button'), 'Please select your appointment duration');
                    isValid = false;
                }
            }
        }
    }
    
    // Step 4: Customer Experience
    if (currentStep === 4) {
        const customerStruggles = currentStepElement.querySelectorAll('input[name="customerStruggles"]');
        const hasSelection = Array.from(customerStruggles).some(checkbox => checkbox.checked);
        
        if (!hasSelection) {
            showCheckboxGroupError(currentStepElement.querySelector('.space-y-3'), 'Please select at least one customer struggle');
            isValid = false;
        }
        
        const remindersRadios = currentStepElement.querySelectorAll('input[name="remindersHelp"]');
        const hasRemindersSelection = Array.from(remindersRadios).some(radio => radio.checked);
        
        if (!hasRemindersSelection) {
            showRadioGroupError(currentStepElement.querySelectorAll('.space-y-3')[1], 'Please select whether reminders would help');
            isValid = false;
        }
    }
    
    // Step 5: Tool Preferences
    if (currentStep === 5) {
        const wishList = currentStepElement.querySelector('#wish-list');
        
        if (!wishList.value.trim()) {
            showFieldError(wishList, 'Please tell us your dream feature');
            isValid = false;
        }
    }
    
    // Step 6: Contact Info
    if (currentStep === 6) {
        const contactMethod = currentStepElement.querySelector('#contact-method');
        const gdprConsent = currentStepElement.querySelector('input[name="gdprConsent"]');
        
        if (!contactMethod.value) {
            showFieldError(currentStepElement.querySelector('#contact-method-button'), 'Please select your preferred contact method');
            isValid = false;
        } else {
            // Validate the specific contact input
            const selectedValue = contactMethod.value;
            let contactInput = null;
            
            if (selectedValue === 'email') {
                contactInput = currentStepElement.querySelector('#email');
                if (!contactInput.value.trim()) {
                    showFieldError(contactInput, 'Please enter your email address');
                    isValid = false;
                }
            } else if (selectedValue === 'instagram') {
                contactInput = currentStepElement.querySelector('#instagram');
                if (!contactInput.value.trim()) {
                    showFieldError(contactInput, 'Please enter your Instagram handle');
                    isValid = false;
                }
            } else if (selectedValue === 'phone') {
                contactInput = currentStepElement.querySelector('#phone');
                if (!contactInput.value.trim()) {
                    showFieldError(contactInput, 'Please enter your phone number');
                    isValid = false;
                }
            }
        }
        
        if (!gdprConsent.checked) {
            showCheckboxError(gdprConsent, 'Please agree to be contacted');
            isValid = false;
        }
    }
    
    if (!isValid) {
        showValidationMessage('Please fill in all required fields');
    }
    
    return isValid;
}

// Helper functions for validation
function showFieldError(field, message) {
    field.style.borderColor = '#e53e3e';
    field.style.borderWidth = '2px';
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#e53e3e';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorDiv);
    
    // Remove error styling after user starts typing
    field.addEventListener('input', function() {
        this.style.borderColor = '#e2e8f0';
        this.style.borderWidth = '2px';
        const errorDiv = this.parentNode.querySelector('.field-error');
        if (errorDiv) errorDiv.remove();
    }, { once: true });
}

function showRadioGroupError(group, message) {
    group.style.border = '2px solid #e53e3e';
    group.style.borderRadius = '8px';
    group.style.padding = '8px';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'group-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#e53e3e';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.5rem';
    
    group.appendChild(errorDiv);
}

function showCheckboxGroupError(group, message) {
    group.style.border = '2px solid #e53e3e';
    group.style.borderRadius = '8px';
    group.style.padding = '8px';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'group-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#e53e3e';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.5rem';
    
    group.appendChild(errorDiv);
}

function showCheckboxError(checkbox, message) {
    checkbox.parentElement.style.color = '#e53e3e';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'checkbox-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#e53e3e';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    
    checkbox.parentNode.appendChild(errorDiv);
}

function clearErrorStyling(stepElement) {
    // Clear field errors
    stepElement.querySelectorAll('.field-error, .group-error, .checkbox-error').forEach(error => error.remove());
    
    // Reset field borders
    stepElement.querySelectorAll('input, textarea').forEach(field => {
        field.style.borderColor = '#e2e8f0';
        field.style.borderWidth = '2px';
    });
    
    // Reset dropdown button borders
    stepElement.querySelectorAll('.dropdown-button').forEach(button => {
        button.style.borderColor = '#e5e7eb';
        button.style.borderWidth = '2px';
    });
    
    // Reset group borders
    stepElement.querySelectorAll('.space-y-3').forEach(group => {
        group.style.border = 'none';
        group.style.borderRadius = '';
        group.style.padding = '';
    });
    
    // Reset checkbox colors
    stepElement.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.parentElement.style.color = '';
    });
}

function showValidationMessage(message) {
    // Remove existing message
    const existingMessage = document.querySelector('.validation-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = 'validation-message';
    messageDiv.textContent = message;
    messageDiv.style.backgroundColor = '#fed7d7';
    messageDiv.style.color = '#c53030';
    messageDiv.style.padding = '0.75rem';
    messageDiv.style.borderRadius = '0.5rem';
    messageDiv.style.marginBottom = '1rem';
    messageDiv.style.textAlign = 'center';
    messageDiv.style.fontWeight = '500';
    
    // Insert at top of current step
    const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`);
    const firstChild = currentStepElement.firstElementChild;
    currentStepElement.insertBefore(messageDiv, firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Update Next button state based on current step completion
function updateNextButton() {
    const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`);
    const nextButton = currentStepElement.querySelector('button[onclick="nextStep()"]');
    
    if (!nextButton) return;
    
    const isStepComplete = checkStepCompletion(currentStep);
    
    if (isStepComplete) {
        // Enable button
        nextButton.disabled = false;
        nextButton.classList.remove('opacity-50', 'cursor-not-allowed');
        nextButton.classList.add('hover:bg-primary/90');
    } else {
        // Disable button
        nextButton.disabled = true;
        nextButton.classList.add('opacity-50', 'cursor-not-allowed');
        nextButton.classList.remove('hover:bg-primary/90');
    }
}

// Check if a specific step is complete
function checkStepCompletion(step) {
    const stepElement = document.querySelector(`[data-step="${step}"]`);
    if (!stepElement) return false;
    
    // Step 1: Business Info
    if (step === 1) {
        const businessName = stepElement.querySelector('#business-name');
        const businessType = stepElement.querySelector('#business-type');
        const location = stepElement.querySelector('#location');
        const teamSize = stepElement.querySelector('#team-size');
        
        if (!businessName.value.trim()) return false;
        if (!businessType.value) return false;
        if (!location.value.trim()) return false;
        if (!teamSize.value) return false;
        
        // Check if "Other" business type needs additional input
        if (businessType.value === 'other') {
            const otherInput = stepElement.querySelector('#other-business-type input');
            if (!otherInput.value.trim()) return false;
        }
        
        return true;
    }
    
    // Step 2: Current Tools
    if (step === 2) {
        const softwareRadios = stepElement.querySelectorAll('input[name="usesSoftware"]');
        const hasSelection = Array.from(softwareRadios).some(radio => radio.checked);
        
        if (!hasSelection) return false;
        
        const selectedValue = stepElement.querySelector('input[name="usesSoftware"]:checked')?.value;
        
        if (selectedValue === 'yes') {
            const currentSoftware = stepElement.querySelector('#current-software');
            
            if (!currentSoftware.value.trim()) return false;
        } else if (selectedValue === 'no') {
            const currentSystem = stepElement.querySelector('#current-system');
            const whyNoDigital = stepElement.querySelector('#why-no-digital');
            
            if (!currentSystem.value) return false;
            if (!whyNoDigital.value.trim()) return false;
        }
        
        return true;
    }
    
    // Step 3: Service Specific
    if (step === 3) {
        const leadTimeRadios = stepElement.querySelectorAll('input[name="needsLeadTime"]');
        const hasSelection = Array.from(leadTimeRadios).some(radio => radio.checked);
        
        if (!hasSelection) return false;
        
        const selectedValue = stepElement.querySelector('input[name="needsLeadTime"]:checked')?.value;
        
        if (selectedValue === 'yes') {
            const leadTime = stepElement.querySelector('#lead-time');
            const slotDuration = stepElement.querySelector('#slot-duration');
            
            if (!leadTime.value) return false;
            if (!slotDuration.value) return false;
        }
        
        return true;
    }
    
    // Step 4: Customer Experience
    if (step === 4) {
        const customerStruggles = stepElement.querySelectorAll('input[name="customerStruggles"]');
        const hasSelection = Array.from(customerStruggles).some(checkbox => checkbox.checked);
        
        if (!hasSelection) return false;
        
        const remindersRadios = stepElement.querySelectorAll('input[name="remindersHelp"]');
        const hasRemindersSelection = Array.from(remindersRadios).some(radio => radio.checked);
        
        if (!hasRemindersSelection) return false;
        
        return true;
    }
    
    // Step 5: Tool Preferences
    if (step === 5) {
        const wishList = stepElement.querySelector('#wish-list');
        
        if (!wishList.value.trim()) return false;
        
        return true;
    }
    
    // Step 6: Contact Info
    if (step === 6) {
        const contactMethod = stepElement.querySelector('#contact-method');
        const gdprConsent = stepElement.querySelector('input[name="gdprConsent"]');
        
        if (!contactMethod.value) return false;
        if (!gdprConsent.checked) return false;
        
        // Check specific contact input
        const selectedValue = contactMethod.value;
        
        if (selectedValue === 'email') {
            const emailInput = stepElement.querySelector('#email');
            if (!emailInput.value.trim()) return false;
        } else if (selectedValue === 'instagram') {
            const instagramInput = stepElement.querySelector('#instagram');
            if (!instagramInput.value.trim()) return false;
        } else if (selectedValue === 'phone') {
            const phoneInput = stepElement.querySelector('#phone');
            if (!phoneInput.value.trim()) return false;
        }
        
        return true;
    }
    
    return false;
}

// Handle form submission
function handleFormSubmission(event) {
    event.preventDefault();
    
    if (validateCurrentStep()) {
        // Collect form data
        const formData = new FormData(event.target);
        const data = {};
        
        // Convert FormData to object
        for (let [key, value] of formData.entries()) {
            if (data[key]) {
                // Handle multiple values (like checkboxes)
                if (Array.isArray(data[key])) {
                    data[key].push(value);
                } else {
                    data[key] = [data[key], value];
                }
            } else {
                data[key] = value;
            }
        }
        
        // Add star ratings
        const ratingContainers = document.querySelectorAll('.rating-stars');
        ratingContainers.forEach(container => {
            const feature = container.dataset.feature;
            const rating = container.dataset.rating || 0;
            data[`rating_${feature}`] = rating;
        });
        
        // Add timestamp
        data.timestamp = new Date().toISOString();
        
        // Send to Supabase database
        sendToSupabase(data);
        
        // Also log to console for debugging
        console.log('Form data:', data);
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        event.target.reset();
        currentStep = 1;
        showStep(1);
        
        // Reset all conditional sections
        resetConditionalSections();
    }
}

// Send data to Supabase
function sendToSupabase(data) {
    // Get Supabase credentials from config
    const SUPABASE_URL = SUPABASE_CONFIG.URL;
    const SUPABASE_ANON_KEY = SUPABASE_CONFIG.ANON_KEY;
    
    if (SUPABASE_URL === 'YOUR_SUPABASE_PROJECT_URL') {
        console.log('Supabase integration not set up yet. Data logged to console.');
        return;
    }
    
    // Transform data for database
    const dbData = {
        business_name: data.businessName || '',
        business_type: data.businessType || '',
        business_type_other: data.businessTypeOther || '',
        location: data.location || '',
        team_size: data.teamSize || '',
        uses_software: data.usesSoftware || '',
        current_software: data.currentSoftware || '',
        software_pain_points: data.softwarePainPoints || '',
        missing_features: data.missingFeatures || '',
        current_system: data.currentSystem || '',
        why_no_digital: data.whyNoDigital || '',
        needs_lead_time: data.needsLeadTime || '',
        lead_time: data.leadTime || '',
        slot_duration: data.slotDuration || '',
        customer_struggles: Array.isArray(data.customerStruggles) ? data.customerStruggles : (data.customerStruggles ? [data.customerStruggles] : []),
        reminders_help: data.remindersHelp || '',
        rating_price: parseInt(data.rating_price) || 0,
        rating_ease: parseInt(data.rating_ease) || 0,
        rating_design: parseInt(data.rating_design) || 0,
        rating_support: parseInt(data.rating_support) || 0,
        wish_list: data.wishList || '',
        contact_method: data.contactMethod || '',
        email: data.email || '',
        instagram: data.instagram || '',
        phone: data.phone || '',
        gdpr_consent: data.gdprConsent === 'on' || false
    };
    
    // Log the data being sent for debugging
    console.log('Sending to Supabase:', dbData);
    
    fetch(`${SUPABASE_URL}/rest/v1/beta_signups`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify(dbData)
    })
    .then(response => {
        if (response.ok) {
            console.log('Data sent to Supabase successfully');
        } else {
            console.error('Failed to send data to Supabase:', response.status);
            return response.json();
        }
    })
    .then(errorData => {
        if (errorData) {
            console.error('Supabase error details:', errorData);
            console.error('Error message:', errorData.message);
            console.error('Error details:', errorData.details);
        }
    })
    .catch(error => {
        console.error('Error sending data to Supabase:', error);
    });
}

// Reset conditional sections
function resetConditionalSections() {
    const conditionalSections = document.querySelectorAll('.conditional-section');
    conditionalSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Reset radio buttons
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.checked = false;
    });
    
    // Reset checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Reset star ratings
    const ratingContainers = document.querySelectorAll('.rating-stars');
    ratingContainers.forEach(container => {
        container.dataset.rating = 0;
        const stars = container.querySelectorAll('.star');
        stars.forEach(star => {
            star.classList.remove('active');
        });
    });
}

// Show success message
function showSuccessMessage() {
    const overlay = document.getElementById('success-overlay');
    if (overlay) {
        overlay.style.display = 'flex';
    }
}

// Close success message
function closeSuccess() {
    const overlay = document.getElementById('success-overlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

// Scroll to form function (kept for potential future use)
function scrollToForm() {
    const form = document.getElementById('feedback-form');
    if (form) {
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Add some friendly microcopy and tips
function addFriendlyTips() {
    // Add tips to form cards
    const formCards = document.querySelectorAll('.form-card');
    formCards.forEach(card => {
        const label = card.querySelector('label');
        if (label) {
            const text = label.textContent;
            
            // Add helpful tips based on the field
            if (text.includes('Business name')) {
                addTip(card, "This helps us personalise our updates for you!");
            } else if (text.includes('Type of business')) {
                addTip(card, "We're building features specifically for different business types");
            } else if (text.includes('Location')) {
                addTip(card, "We're focusing on UK micro-businesses first");
            } else if (text.includes('Instagram')) {
                addTip(card, "Knowing your Instagram helps us reach out quickly with updates!");
            }
        }
    });
}

// Add a friendly tip to a form card
function addTip(card, tipText) {
    const tip = document.createElement('p');
    tip.className = 'form-tip';
    tip.textContent = tipText;
    tip.style.fontSize = '0.9rem';
    tip.style.color = '#718096';
    tip.style.fontStyle = 'italic';
    tip.style.marginTop = '0.5rem';
    
    card.appendChild(tip);
}

// Initialize tips when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add tips after a short delay to ensure all elements are loaded
    setTimeout(addFriendlyTips, 100);
}); 