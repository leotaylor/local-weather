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
  };
  if (conditions === 'Conditions: Clouds') {
    $('#condtionsContainer').removeClass('clear');
    $('#condtionsContainer').addClass('clouds');
    $('#condtionsContainer').removeClass('thunder');
  };
  if (conditions === 'Conditions: Thunderstorm') {
    $('#condtionsContainer').addClass('thunder');
    $('#condtionsContainer').removeClass('clear');
    $('#condtionsContainer').removeClass('clouds');
  };
};

// const fiveDayStyle = () => {
//   const fiveConditions = $('#fiveConditions').html();
//   console.log(fiveConditions);
//   // const fiveConditions = $('#fiveConditions').prop('class');
//   if (fiveConditions === 'Conditions: Clouds') {
//     $('.fiveDayContainer').removeClass('rain');
//     $('.fiveDayContainer').removeClass('clear');
//     $('.fiveDayContainer').addClass('clouds');
//   } else
//   if (fiveConditions === 'Conditions: Clear') {
//     $('.fiveDayContainer').removeClass('clouds');
//     $('.fiveDayContainer').removeClass('rain');
//     $('.fiveDayContainer').addClass('clear');
//   } else
//   if (fiveConditions === 'Conditions: Rain') {
//     $('.fiveDayContainer').removeClass('clear');
//     $('.fiveDayContainer').removeClass('clouds');
//     $('.fiveDayContainer').addClass('rain');
//   };
// };

// const fiveDayStyle = () => {
//   // const fiveConditions = $('#fiveConditions').html();
//   // const fiveConditions = $('#fiveConditions').prop('class');
//   if ($("#fiveConditions:contains('Clouds')")) {
//     $('.fiveDayContainer').addClass('clouds');
//     $('.fiveDayContainer').removeClass('rain');
//     $('.fiveDayContainer').removeClass('clear');
//   }
//   if ($("#fiveConditions:contains('Clear')")) {
//     $('.fiveDayContainer').addClass('clear');
//     $('.fiveDayContainer').removeClass('clouds');
//     $('.fiveDayContainer').removeClass('rain');
//   }
//   if ($("#fiveConditions:contains('Rain')")) {
//     $('.fiveDayContainer').addClass('rain');
//     $('.fiveDayContainer').removeClass('clear');
//     $('.fiveDayContainer').removeClass('clouds');
//   };
// };

module.exports = {
  setWeatherKey,
  showResults,
  showFiveDay,
};
