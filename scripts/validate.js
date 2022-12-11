  function showErrorMessage(Object, formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(`.${Object['failedInput']}`);
    errorElement.textContent = errorMessage;
  };
  
  function hideErrorMessage(formElement, inputElement) {
   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
   inputElement.classList.remove(`.${Object['failedInput']}`);
   errorElement.textContent = '';
  };
  
  function checkInputInvalidity(Object, formElement, inputElement) {
    if(!inputElement.validity.valid) {
      showErrorMessage(Object, formElement, inputElement, inputElement.validationMessage);
    } else {
        hideErrorMessage(formElement, inputElement);
     }
  };
  
  function checkFormInvalidity(inputList) {
    return inputList.some(inputListItem => {
      return !inputListItem.validity.valid;
    });
  };
  
  function toggleSubmissionButton(Object, inputList, submissionButton) {
    if(checkFormInvalidity(inputList)) {
      submissionButton.classList.add(`${Object['deactivatedSubmissionButton']}`);
      submissionButton.setAttribute('disabled', 'true');
    } else {
        submissionButton.classList.remove(`${Object['deactivatedSubmissionButton']}`);
        submissionButton.removeAttribute('disabled');
      };
  };
  
  function setEventListeners(Object, formElement) {
    const inputList = Array.from(formElement.querySelectorAll(`.${Object['input']}`));
    const submissionButton = formElement.querySelector(`.${Object['submissionButton']}`);
    toggleSubmissionButton(Object, inputList, submissionButton);
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', function() {
        checkInputInvalidity(Object, formElement, inputElement)
        toggleSubmissionButton(Object, inputList, submissionButton);
      });
    });
  };
  
  function enableValidation(Object) {
    const formList = Array.from(page.querySelectorAll(`.${Object['form']}`));
    formList.forEach((formElement) => { 
      setEventListeners(Object, formElement);
    });
  };
  
  enableValidation(formReference);
