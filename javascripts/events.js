const openWeather = require('./openWeather');
const firebaseAPI = require('./firebaseAPI');
const dom = require('./dom');

const pressEnter = () => {
  $(document).keypress((e) => {
    if (e.key === 'Enter') {
      const searchZip = $('#searchBar').val();
      openWeather.showResults(searchZip);
      clickFiveDay();
    };
  });
};

const clickButton = () => {
  $('#weatherButton').click(() => {
    const searchZip = $('#searchBar').val();
    openWeather.showResults(searchZip);
    clickFiveDay();
  });
};

const clickFiveDay = () => {
  $(document).on('click', '#fiveDayButton', fiveDayForecast);
};

const fiveDayForecast = () => {
  const zip = $('#searchBar').val();
  openWeather.showFiveDay(zip);
  $('#fiveDayButton').toggle();
};

const saveForecast = () => {
  $(document).on('click', '.saveWeather', (e) => {
    const weatherToAddCard = $(e.target).closest('.fiveCard');
    console.log(weatherToAddCard);
    const weatherToAdd = {
      temp: weatherToAddCard.find('.temp').text(),
      conditions: weatherToAddCard.find('#fiveConditions').text(),
      pressure: weatherToAddCard.find('.pressure').text(),
      speed: weatherToAddCard.find('.wind').text(),
      isScary: false,
    };
    firebaseAPI.saveWeather(weatherToAdd)
      .then(() => {
        weatherToAddCard.remove();
      })
      .catch((error) => {
        console.error('error in saving weather', error);
      });
  });
};

const getAllWeatherEvent = () => {
  firebaseAPI.getAllWeather()
    .then((newWeatherArray) => {
      dom.savedWeatherDom(newWeatherArray);
      clickTrash();
    })
    .catch((error) => {
      console.error('error in get all weather', error);
    });
};

const clickViewSaved = () => {
  $(document).on('click', '#savedWeather', getAllWeatherEvent);
};

const clickTrash = () => {
  $(document).on('click', '.deleteWeather', deleteWeather);
};

const deleteWeather = (e) => {
  const weatherToDeleteCard = $(e.target).closest('#trashCard');
  console.log(weatherToDeleteCard);
  const weatherToDelete = {
    temp: weatherToDeleteCard.find('.temp').text(),
    conditions: weatherToDeleteCard.find('#fiveConditions').text(),
    pressure: weatherToDeleteCard.find('.pressure').text(),
    speed: weatherToDeleteCard.find('.wind').text(),
    isScary: false,
  };
  firebaseAPI.deleteWeather(weatherToDelete)
    .then(() => {
      weatherToDeleteCard.remove();
    })
    .catch((error) => {
      console.error('error in delete weather', error);
    });
};

const bindEvents = () => {
  pressEnter();
  clickButton();
  saveForecast();
  clickViewSaved();
};

module.exports = {
  bindEvents,
};
