const page = document.querySelector('.page');
const popUp = page.querySelector('.popup');
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
const enlargedImagePopUp = page.querySelector('.popup-enlarged-image');
const enlargedImage = page.querySelector('.popup__image');
const enlargedImageTitle = page.querySelector('.popup__figcaption');
const cardTemplate = document.querySelector('#places__card-template').content;
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
  form: 'popup__form',
  input: 'popup__input',
  failedInput: 'popup__input_type_error',
  submissionButton: 'popup__submit-button',
  deactivatedSubmissionButton: 'popup__submit-button_variety_deactivated'
};

function preventEvtDefaultBehavior(event) {
  event.preventDefault();
}

function resetForm(targetForm) {
  targetForm.reset();
};

function renderSubmissionButtonDeactivated() {
  const submissionButtons = page.querySelectorAll('.popup__submit-button');
  submissionButtons.forEach(submissionButton => {
    submissionButton.classList.add('popup__submit-button_variety_deactivated');
    submissionButton.setAttribute('disabled', 'true');
  })
};

function renderErrorMessagesIrrelevant(targetPopUp) {
  const inputs = targetPopUp.querySelectorAll('.popup__input');
  const errorMessages = targetPopUp.querySelectorAll('.popup__error-message');
  inputs.forEach(input => {
    input.classList.remove('popup__input_type_error');
  });
  errorMessages.forEach(errorMessage => {
    errorMessage.textContent = '';
  })
};

function closeUsingEscape(event) {
  const openedPopUp = document.querySelector('.popup_opened');
  if (event.key === 'Escape') {
    closePopUp(openedPopUp);
  }
};

function pullInformation() {
  inputProfileName.value = profileName.textContent;
  inputProfileOccupation.value = profileOccupation.textContent;
}

function updateInformation() {
  preventEvtDefaultBehavior(event);
  profileName.textContent = inputProfileName.value;
  profileOccupation.textContent = inputProfileOccupation.value;
  closePopUp(editProfilePopUp);
}

function openPopUp(targetPopUp) {
  targetPopUp.classList.add('popup_opened');
  document.addEventListener('keydown', closeUsingEscape);
};

function closePopUp(targetPopUp) {
  targetPopUp.classList.remove('popup_opened');
  renderSubmissionButtonDeactivated();
  document.removeEventListener('keydown', closeUsingEscape);
}

closeButtons.forEach(closeButton => {
  const popUp = closeButton.closest('.popup');
  closeButton.addEventListener('click', () => {
    closePopUp(popUp);
  })
});

document.addEventListener('click', function(event) {
  if(event.target.classList.contains('popup') && event.target.classList.contains('popup_opened')) {
    event.target.classList.remove('popup_opened');
  }
});

editButton.addEventListener('click', function () {
  openPopUp(editProfilePopUp);
  pullInformation();
  renderErrorMessagesIrrelevant(editProfilePopUp);
});

addButton.addEventListener('click', function () {
  openPopUp(addNewPlacePopUp);
  resetForm(addNewPlacePopUpForm);
  renderErrorMessagesIrrelevant(addNewPlacePopUp);
});

editProfilePopUpForm.addEventListener('submit', function() {
  updateInformation();
});


function createCardFromPopUp() {
  addNewCard(placesSection, createCard(inputDestination.value, inputImageSource.value));
};

addNewPlacePopUpForm.addEventListener('submit', function() {
  preventEvtDefaultBehavior(event);
  createCardFromPopUp();
  resetForm(addNewPlacePopUpForm);
  closePopUp(addNewPlacePopUp);
});


function deleteCard(event) {
  event.target.closest('.places__card').remove();
};

function likeUnlikeCard(event) {
  event.target.classList.toggle('button_variety_like-button-active');
}

function addNewCard(cardContainer, cardToAdd) {
  cardContainer.prepend(cardToAdd);
};

function createCard(title, imageSource) {
  const cardClone = cardTemplate.querySelector('.places__card').cloneNode(true);
  const cardCloneImage = cardClone.querySelector('.places__image');
  const cardCloneTitle = cardClone.querySelector('.places__title');
  const cardDeleteButton = cardClone.querySelector('.button_variety_delete-button');
  const cardLikeButton = cardClone.querySelector('.button_variety_like-button');
  
  cardCloneImage.src = imageSource;
  cardCloneImage.alt = title;
  cardCloneTitle.textContent = title;


  cardDeleteButton.addEventListener('click', deleteCard);
  cardLikeButton.addEventListener('click', likeUnlikeCard);

  function enlargeImage() {
    openPopUp(enlargedImagePopUp);
    enlargedImage.src = cardCloneImage.src;
    enlargedImage.alt = cardCloneTitle.textContent;
    enlargedImageTitle.textContent = cardCloneTitle.textContent;
  };

  cardCloneImage.addEventListener('click', enlargeImage);

  return cardClone;
};

initialCards.forEach(element => {
  addNewCard(placesSection, createCard(element.name, element.link))
});