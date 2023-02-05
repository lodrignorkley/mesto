export default class FormValidator {
    constructor(object, formSelector) {
      this._formSelector = formSelector;
      this._form = document.querySelector(`${this._formSelector}`);
      this._input = object.input;
      this._failedInput = object.failedInput;
      this._submissionButton = object.submissionButton;
      this._deactivatedSubmissionButton = object.deactivatedSubmissionButton;
      this._failedInputMessage = object.failedInputMessage;
      this._inputList = Array.from(this._form.querySelectorAll(this._input));
      this._subButton = this._form.querySelector(`${this._submissionButton}`);
    }
    
    _showErrorMessage(inputElement, errorMessage) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(`.${this._failedInput}`);
        errorElement.textContent = errorMessage;
    };

    _hideErrorMessage(inputElement) {
      const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(`.${this._failedInput}`);
      errorElement.textContent = '';
    };

    _toggleSubmissionButton() {
      if(this._checkFormInvalidity()) {
        this._subButton.classList.add(`${this._deactivatedSubmissionButton}`);
        this._subButton.setAttribute('disabled', 'true');
      } else {
          this._subButton.classList.remove(`${this._deactivatedSubmissionButton}`);
          this._subButton.removeAttribute('disabled');
        };
    };
    
    removeValidationErrors() {
      this._inputList.forEach(inputElement => {
        this._hideErrorMessage(inputElement);
      })
    };

    disableSubmitButton() {
      this._subButton.classList.add('popup__submit-button_variety_deactivated');
      this._subButton.setAttribute('disabled', 'true');
    };

    _checkFormInvalidity() {
      return this._inputList.some(inputListItem => {
        return !inputListItem.validity.valid;
      });
    };

   _checkInputInvalidity(inputElement) {
      if(!inputElement.validity.valid) {
        this._showErrorMessage(inputElement, inputElement.validationMessage);
      } else {
          this._hideErrorMessage(inputElement);
       }
    };

   _setEventListeners() {
      this._toggleSubmissionButton();
      this._inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
          this._checkInputInvalidity(inputElement);
          this._toggleSubmissionButton(); 
        })
      })
    };

    enableValidation() {
      this._form.addEventListener('submit', function(evt) {
        evt.preventDefault();
      })
      this._setEventListeners();
    };
}