'use strict';

var CHARACTERS_QUANTITY = 4;

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионого', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var TEMPLATE = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var similarList = document.querySelector('.setup-similar-list');
var FRAGMENT = document.createDocumentFragment();
var setup = document.querySelector('.setup');
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var userIcon = document.querySelector('.setup-open');
var buttonClose = setup.querySelector('.setup-close');
var wizard = document.querySelector('.setup-wizard');
var wizardCoat = wizard.querySelector('.wizard-coat');
var wizardEyes = wizard.querySelector('.wizard-eyes');
var fireball = document.querySelector('.setup-fireball-wrap');
var wizardAppearance = document.querySelector('.setup-wizard-appearance');

var getInteger = function (min, max) {

  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getRandomValueOfArray = function (array) {

  return array[getInteger(0, array.length - 1)];
};

var getFullName = function () {

  return (getInteger(0, 1) === true) ? getRandomValueOfArray(NAMES) + ' ' + getRandomValueOfArray(SURNAMES) : getRandomValueOfArray(SURNAMES) + ' ' + getRandomValueOfArray(NAMES);
};

var createCharacters = function () {

  var magicians = [];

  for (var i = 1; i <= CHARACTERS_QUANTITY; i++) {
    var character = {
      name: getFullName(),
      coatColor: getRandomValueOfArray(COAT_COLORS),
      eyesColor: getRandomValueOfArray(EYES_COLORS)
    };
    magicians.push(character);
  }
  return magicians;
};

var magicians = createCharacters();

var createMagician = function (character) {

  var element = TEMPLATE.cloneNode(true);

  element.querySelector('.setup-similar-label').innerHTML = character.name;
  element.querySelector('.wizard-coat').setAttribute('fill', character.coatColor);
  element.querySelector('.wizard-eyes').setAttribute('fill', character.eyesColor);

  return element;
};

var showMagicians = function () {

  for (var i = 0; i < magicians.length; i++) {
    FRAGMENT.appendChild(createMagician(magicians[i]));
  }

  similarList.appendChild(FRAGMENT);
};

showMagicians();

similarList.parentNode.classList.remove('hidden');

var EscPressHandler = function (evt) {

  if (evt.keyCode === ESC_KEYCODE && !evt.target.classList.contains('setup-user-name')) {
    closeSettingsWindow();
  }
};

var openSettingsWindow = function () {

  setup.classList.remove('hidden');
  document.addEventListener('keydown', EscPressHandler);
};

var closeSettingsWindow = function () {

  setup.classList.add('hidden');
  document.removeEventListener('keydown', EscPressHandler);
};

userIcon.addEventListener('click', function () {

  openSettingsWindow();
});

userIcon.addEventListener('keydown', function (evt) {

  if (evt.keyCode === ENTER_KEYCODE) {
    setup.classList.remove('hidden');
  }
});

buttonClose.addEventListener('click', function () {

  closeSettingsWindow();
});

buttonClose.addEventListener('keydown', function (evt) {

  if (evt.keyCode === ENTER_KEYCODE) {
    setup.classList.add('hidden');
  }
});

var wizardCoatClickHandler = function () {

  var wizardCoatColor = getRandomValueOfArray(COAT_COLORS);

  wizardCoat.style.fill = wizardCoatColor;
  wizardAppearance.children[1].value = wizardCoatColor;
};

var wizardEyesClickHandler = function () {

  var wizardEyesColor = getRandomValueOfArray(EYES_COLORS);
  wizardEyes.style.fill = wizardEyesColor;
  wizardAppearance.children[2].value = wizardEyesColor;
};

var fireballClickHandler = function () {

  var fireballColor = getRandomValueOfArray(FIREBALL_COLORS);
  fireball.style.background = fireballColor;
  fireball.children[1].value = fireballColor;
};

wizardCoat.addEventListener('click', wizardCoatClickHandler);
wizardEyes.addEventListener('click', wizardEyesClickHandler);
fireball.addEventListener('click', fireballClickHandler);

// dialog.js

var dialog = setup.querySelector('.upload');

var dialogMousedownHandler = function (onEvt) {

  onEvt.preventDefault();

  var startCoordinates = {
    x: onEvt.clientX,
    y: onEvt.clientY
  };

  var dragged = false;

  var dialogMousemoveHandler = function (moveEvt) {

    moveEvt.preventDefault();
    dragged = true;

    var shift = {
      x: startCoordinates.x - moveEvt.clientX,
      y: startCoordinates.y - moveEvt.clientY
    };

    startCoordinates = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    setup.style.top = (setup.offsetTop - shift.y) + 'px';
    setup.style.left = (setup.offsetLeft - shift.x) + 'px';
  };

  var dialogMouseupHandler = function (upEvt) {

    upEvt.preventDefault();

    document.removeEventListener('mousemove', dialogMousemoveHandler);
    document.removeEventListener('mouseup', dialogMouseupHandler);

    if (dragged) {

      var dialogClickPreventDefaultHandler = function (evt) {

        evt.preventDefault();
        dialog.removeEventListener('click', dialogClickPreventDefaultHandler);
      };
      dialog.addEventListener('click', dialogClickPreventDefaultHandler);
    }
  };

  document.addEventListener('mousemove', dialogMousemoveHandler);
  document.addEventListener('mouseup', dialogMouseupHandler);
};

dialog.addEventListener('mousedown', dialogMousedownHandler);

var shopArtifact = document.querySelector('.setup-artifacts-shop');
var draggedItem = null;

var shopArtifactDragstartHandler = function (evt) {

  if (evt.target.tagName.toLowerCase() === 'img') {

    draggedItem = evt.target;
    evt.dataTransfer.setData('text/plain', evt.target.alt);
  }
};

shopArtifact.addEventListener('dragstart', shopArtifactDragstartHandler);

var magicianBag = document.querySelector('.setup-artifacts');

var magicianBagDragoverHandler = function (evt) {

  evt.preventDefault();
  return false;
};

magicianBag.addEventListener('dragover', magicianBagDragoverHandler);

var magicianBagDropHandler = function (evt) {

  evt.target.style.backgroundColor = '';
  evt.target.appendChild(draggedItem.cloneNode(true));
  evt.preventDefault();
};

magicianBag.addEventListener('drop', magicianBagDropHandler);

var magicianBagDragenterHandler = function (evt) {

  evt.target.style.backgroundColor = 'pink';
  evt.preventDefault();
};

magicianBag.addEventListener('dragenter', magicianBagDragenterHandler);

var magicianBagDragleaveHandler = function (evt) {

  evt.target.style.backgroundColor = '';
  evt.preventDefault();
};

magicianBag.addEventListener('dragleave', magicianBagDragleaveHandler);
