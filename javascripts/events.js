const openWeather = require('./openWeather');

const pressEnter = () => {
  $(document).keypress((e) => {
    if (e.key === 'Enter') {
      const searchZip = $('#searchBar').val();
      openWeather.showResults(searchZip);
    };
  });
};

const clickButton = () => {
  $('#weatherButton').click(() => {
    console.log('clickITGood');
    const searchZip = $('#searchBar').val();
    openWeather.showResults(searchZip);
  });
};

const bindEvents = () => {
  pressEnter();
  clickButton();
};

module.exports = {
  bindEvents,
};
