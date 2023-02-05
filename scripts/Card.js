import { openPopUp, enlargedImagePopUp, enlargedImage, enlargedImageTitle } from './index.js';
export default class Card {
    constructor(title, imageSource, templateSelector) {
        this._title = title;
        this._imageSource = imageSource;
        this._templateSelector = templateSelector;
        this._cardClone = this._getTemplate();
        this._cardCloneImage = this._cardClone.querySelector('.places__image');
        this._cardCloneTitle = this._cardClone.querySelector('.places__title');
        this._cardCloneDeleteButton = this._cardClone.querySelector('.button_variety_delete-button');
        this._cardCloneLikeButton = this._cardClone.querySelector('.button_variety_like-button');
    }
    _getTemplate() {
        const cardCloneTemplate = document.querySelector(`${this._templateSelector}`).content.querySelector('.places__card').cloneNode(true);
        return cardCloneTemplate;
    }

    _toggleCardLike() {
      this._cardCloneLikeButton.classList.toggle('button_variety_like-button-active');
    }

    _deleteCard() {
      this._cardClone.remove();
    }

    _enlargeImage() {
      openPopUp(enlargedImagePopUp);
      enlargedImage.src = this._cardCloneImage.src;
      enlargedImage.alt = this._cardCloneTitle.textContent;
      enlargedImageTitle.textContent = this._cardCloneTitle.textContent;
    }

    _updateCardClone() {
      this._cardCloneImage.src = this._imageSource;
      this._cardCloneImage.alt = this._title;
      this._cardCloneTitle.textContent = this._title;
    }

    _setEventListeners() {
      this._cardCloneLikeButton.addEventListener('click', () => {
        this._toggleCardLike();
      });
      this._cardCloneDeleteButton.addEventListener('click', () => {
        this._deleteCard();
      })
      this._cardCloneImage.addEventListener('click', () => {
        this._enlargeImage();
      })
    }

    generateCard() {
      this._updateCardClone();
      this._setEventListeners();
      return this._cardClone;
    }
};  