let page = document.querySelector('.page');
let profileName = page.querySelector('.profile__name');
let profileOccupation = page.querySelector('.profile__occupation');
let editButton = page.querySelector('.button_variety_edit-button');
let popUp = page.querySelector('.popup');
let popUpForm = page.querySelector('.popup__form');
let inputProfileName = page.querySelector('.popup__input_type_name');
let inputProfileOccupation = page.querySelector('.popup__input_type_occupation');
let closeButton = page.querySelector('.button_variety_close-button');

function pullInformation() {
  inputProfileName.value = profileName.textContent;
  inputProfileOccupation.value = profileOccupation.textContent;
}

function updateInformation(evt) {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileOccupation.textContent = inputProfileOccupation.value;
  closePopUp();
}

function openPopUp() {
  popUp.classList.add('popup_opened');
}

function closePopUp() {
  popUp.classList.remove('popup_opened');
}


editButton.addEventListener('click', function () {
  openPopUp();
  pullInformation();
});


closeButton.addEventListener('click', function () {
  closePopUp();
});

popUpForm.addEventListener('submit', updateInformation);