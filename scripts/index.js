import Card from './Card.js';
import FormValidator from './FormValidator.js';
const page = document.querySelector('.page');
const profileName = page.querySelector('.profile__name');
const profileOccupation = page.querySelector('.profile__occupation');
const editButton = page.querySelector('.button_variety_edit-button');
const editProfilePopUp = page.querySelector('.popup-edit-profile');
const editProfilePopUpForm = page.querySelector('form[name="profile"]');
const inputProfileName = page.querySelector('.popup__input_type_name');
const inputProfileOccupation = page.querySelector('.popup__input_type_occupation');
const closeButtons = page.querySelectorAll('.button_variety_close-button');
const placesSection = page.querySelector('.places');
const addButton = page.querySelector('.button_variety_add-button');
const addNewPlacePopUp = page.querySelector('.popup_add-new-place-card');
const addNewPlacePopUpForm = page.querySelector('form[name="new-card"]');
const inputDestination = page.querySelector('.popup__input_type_destination');
const inputImageSource = page.querySelector('.popup__input_type_href');
export const enlargedImagePopUp = page.querySelector('.popup-enlarged-image');
export const enlargedImage = page.querySelector('.popup__image');
export const enlargedImageTitle = page.querySelector('.popup__figcaption');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 
const formReference = {
  form: '.popup__form',
  input: '.popup__input',
  failedInput: '.popup__input_type_error',
  submissionButton: '.popup__submit-button',
  deactivatedSubmissionButton: 'popup__submit-button_variety_deactivated',
  failedInputMessage: '.popup__error-message'
};


const profileFormValidator = new FormValidator(formReference, '.popup__form_variety_profile');
profileFormValidator.enableValidation();
const newPlaceFormValidator = new FormValidator(formReference, '.popup__form_variety_place');
newPlaceFormValidator.enableValidation();


function preventEvtDefaultBehavior(event) {
  event.preventDefault();
}

function resetForm(targetForm) {
  targetForm.reset();
};

function closeUsingEscape(event) {
  if (event.key === 'Escape') {
    const openedPopUp = document.querySelector('.popup_opened');
    closePopUp(openedPopUp);
  }
};

function closePopUpFromOutside(event) {
  if(event.target.classList.contains('popup') && event.target.classList.contains('popup_opened')) {
    closePopUp(event.target);
  }
};

function pullInformation() {
  inputProfileName.value = profileName.textContent;
  inputProfileOccupation.value = profileOccupation.textContent;
}

function updateUserInfo() {
  preventEvtDefaultBehavior(event);
  profileName.textContent = inputProfileName.value;
  profileOccupation.textContent = inputProfileOccupation.value;
  closePopUp(editProfilePopUp);
}

export function openPopUp(targetPopUp) {
  targetPopUp.classList.add('popup_opened');
  document.addEventListener('keydown', closeUsingEscape);
  document.addEventListener('click', closePopUpFromOutside);
};

function closePopUp(targetPopUp) {
  targetPopUp.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeUsingEscape);
  document.removeEventListener('click', closePopUpFromOutside);
}

closeButtons.forEach(closeButton => {
  const popUp = closeButton.closest('.popup');
  closeButton.addEventListener('click', () => {
    closePopUp(popUp);
  })
});

editButton.addEventListener('click', () => {
  openPopUp(editProfilePopUp);
  profileFormValidator.removeValidationErrors();
  profileFormValidator.disableSubmitButton();
  pullInformation();
});

addButton.addEventListener('click', () => {
  openPopUp(addNewPlacePopUp);
  newPlaceFormValidator.removeValidationErrors();
  newPlaceFormValidator.disableSubmitButton();
  resetForm(addNewPlacePopUpForm);
});

editProfilePopUpForm.addEventListener('submit', function() {
  updateUserInfo();
});


function createCard(element, templateSelector) {
  const card = new Card(element.name, element.link, templateSelector);
  const cardElement = card.generateCard();
  return cardElement;
};

function addCard(cardContainer, newCard) {
  cardContainer.prepend(newCard);
}

function formNewCardFromPopUp(name, link) {
  const newCard = {
    name: name,
    link: link
  }
  return newCard;
}

initialCards.forEach(element => {
  addCard(placesSection, createCard(element, '#places__card-template'));
});

addNewPlacePopUpForm.addEventListener('submit', function() {
  const newCardFromPopUp = formNewCardFromPopUp(inputDestination.value, inputImageSource.value);
  preventEvtDefaultBehavior(event);
  addCard(placesSection, createCard(newCardFromPopUp, '#places__card-template'));
  resetForm(addNewPlacePopUpForm);
  closePopUp(addNewPlacePopUp);
});
