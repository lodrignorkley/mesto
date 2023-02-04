function disableSubmitButton(formReference) {
  const submissionButtons = page.querySelectorAll(`.${formReference['submissionButton']}`);
  submissionButtons.forEach(submissionButton => {
    if(submissionButton.closest('.popup').classList.contains('popup_opened')) 
    {
      submissionButton.classList.add('popup__submit-button_variety_deactivated');
      submissionButton.setAttribute('disabled', 'true');
    };
  })
};


function removeValidationErrors(targetPopUp, validationConfig) {
  const inputs = targetPopUp.querySelectorAll(`.${validationConfig['input']}`);
  const errorMessages = targetPopUp.querySelectorAll(`.${validationConfig['failedInputMessage']}`);
  inputs.forEach(input => {
    input.classList.remove(`.${validationConfig['failedInput']}`);
  });
  errorMessages.forEach(errorMessage => {
    errorMessage.textContent = '';
  })
};
  
  
  function showErrorMessage(validationConfig, formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(`.${validationConfig['failedInput']}`);
    errorElement.textContent = errorMessage;
  };
  
  function hideErrorMessage(validationConfig, formElement, inputElement) {
   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
   inputElement.classList.remove(`.${validationConfig['failedInput']}`);
   errorElement.textContent = '';
  };
  
  function checkInputInvalidity(validationConfig, formElement, inputElement) {
    if(!inputElement.validity.valid) {
      showErrorMessage(validationConfig, formElement, inputElement, inputElement.validationMessage);
    } else {
        hideErrorMessage(validationConfig, formElement, inputElement);
     }
  };
  
  function checkFormInvalidity(inputList) {
    return inputList.some(inputListItem => {
      return !inputListItem.validity.valid;
    });
  };
  
  function toggleSubmissionButton(validationConfig, inputList, submissionButton) {
    if(checkFormInvalidity(inputList)) {
      submissionButton.classList.add(`${validationConfig['deactivatedSubmissionButton']}`);
      submissionButton.setAttribute('disabled', 'true');
    } else {
        submissionButton.classList.remove(`${validationConfig['deactivatedSubmissionButton']}`);
        submissionButton.removeAttribute('disabled');
      };
  };
  
  function setEventListeners(validationConfig, formElement) {
    const inputList = Array.from(formElement.querySelectorAll(`.${validationConfig['input']}`));
    const submissionButton = formElement.querySelector(`.${validationConfig['submissionButton']}`);
    toggleSubmissionButton(validationConfig, inputList, submissionButton);
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', function() {
        checkInputInvalidity(validationConfig, formElement, inputElement)
        toggleSubmissionButton(validationConfig, inputList, submissionButton);
      });
    });
  };
  
  function enableValidation(validationConfig) {
    const formList = Array.from(page.querySelectorAll(`.${validationConfig['form']}`));
    formList.forEach((formElement) => { 
      setEventListeners(validationConfig, formElement);
    });
  };
  
  enableValidation(formReference);
