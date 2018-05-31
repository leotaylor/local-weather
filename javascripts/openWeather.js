const dom = require('./dom');

let weatherKey = '';

const setWeatherKey = (key) => {
  weatherKey = key;
};

const searchWeather = (txt) => {
  return new Promise((resolve, reject) => {
    $.ajax(`http://api.openweathermap.org/data/2.5/weather?zip=${txt},us&appid=${weatherKey}&units=imperial`)
      .done((result) => {
        resolve(result);
      })
      .fail((err) => {
        reject(err);
      });
  });
};

const showResults = (searchText) => {
  searchWeather(searchText)
    .then((result) => {
      dom.domString(result);
      changeStyle(result);
    })
    .catch((err) => {
      console.error('search error:', err);
    });
};

const fiveDay = (text) => {
  return new Promise((resolve, reject) => {
    $.ajax(`http://api.openweathermap.org/data/2.5/forecast?zip=${text}&appid=${weatherKey}&units=imperial`)
      .done((result) => {
        resolve(result.list);
      })
      .fail((err) => {
        reject(err);
      });
  });
};

const showFiveDay = (searchText) => {
  fiveDay(searchText)
    .then((result) => {
      dom.domFive(result);
      // fiveDayStyle(result);
    })
    .catch((err) => {
      console.error('search 5day error:', err);
    });
};

const changeStyle = () => {
  const conditions = $('#conditions').html();
  if (conditions === 'Conditions: Clear') {
    $('#condtionsContainer').addClass('clear');
    $('#condtionsContainer').removeClass('clouds');
    $('#condtionsContainer').removeClass('thunder');
    $('#condtionsContainer').removeClass('rain');
  };
  if (conditions === 'Conditions: Clouds') {
    $('#condtionsContainer').removeClass('clear');
    $('#condtionsContainer').addClass('clouds');
    $('#condtionsContainer').removeClass('thunder');
    $('#condtionsContainer').removeClass('rain');
  };
  if (conditions === 'Conditions: Thunderstorm') {
    $('#condtionsContainer').addClass('thunder');
    $('#condtionsContainer').removeClass('clear');
    $('#condtionsContainer').removeClass('clouds');
    $('#condtionsContainer').removeClass('rain');
  };
  if (conditions === 'Conditions: Rain') {
    $('#condtionsContainer').addClass('rain');
    $('#condtionsContainer').removeClass('clear');
    $('#condtionsContainer').removeClass('clouds');
    $('#condtionsContainer').removeClass('thunder');
  };
};

module.exports = {
  setWeatherKey,
  showResults,
  showFiveDay,
};
