const openWeather = require('./openWeather');
const firebaseAPI = require('./firebaseAPI');

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

const bindEvents = () => {
  pressEnter();
  clickButton();
  saveForecast();
};

module.exports = {
  bindEvents,
};
