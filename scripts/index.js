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

function preventEvtDefaultBehavior(event) {
  event.preventDefault();
}

function resetForm(targetPopUp) {
  targetPopUp.reset();
};

closeButtons.forEach(closeButton => {
  closeButton.addEventListener('click', function(event) {
    event.target.closest('.popup').classList.remove('popup_opened');
  })
});

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
};

function closePopUp(targetPopUp) {
  targetPopUp.classList.remove('popup_opened');
}

editButton.addEventListener('click', function () {
  openPopUp(editProfilePopUp);
  pullInformation();
});

addButton.addEventListener('click', function () {
  openPopUp(addNewPlacePopUp);
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
  addNewPlacePopUpForm.reset();
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
  const cardTemplate = document.querySelector('#places__card-template').content;
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
    enlargedImageTitle.textContent = cardCloneTitle.textContent;
  };

  cardCloneImage.addEventListener('click', enlargeImage);

  return cardClone;
};

initialCards.forEach(element => {
  addNewCard(placesSection, createCard(element.name, element.link))
});



