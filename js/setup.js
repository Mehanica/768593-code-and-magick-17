'use strict';

var CHARACTERS_QUANTITY = 4;

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионого', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var TEMPLATE = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var similarList = document.querySelector('.setup-similar-list');

var FRAGMENT = document.createDocumentFragment();

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

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
