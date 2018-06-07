const openWeather = require('./openWeather');
const firebaseAPI = require('./firebaseAPI');
const dom = require('./dom');

const pressEnter = () => {
  $(document).keypress((e) => {
    if (e.key === 'Enter' && !$('#searchDiv').hasClass('hide')) {
      const searchZip = $('#searchBar').val();
      openWeather.showResults(searchZip);
      $('#weatherOutput').fadeIn(1500).removeClass('hide');
      $('#fiveDayOutput').addClass('hide');
      $('#savedOutput').addClass('hide');
      clickFiveDay();
    };
  });
};

const clickButton = () => {
  $('#weatherButton').click(() => {
    const searchZip = $('#searchBar').val();
    openWeather.showResults(searchZip);
    $('#weatherOutput').fadeIn(1500).removeClass('hide');
    $('#fiveDayOutput').addClass('hide');
    $('#savedOutput').addClass('hide');
    clickFiveDay();
  });
};

// Five Day Forecast

const clickFiveDay = () => {
  $(document).on('click', '#fiveDayButton', fiveDayForecast);
};

const fiveDayForecast = () => {
  const zip = $('#searchBar').val();
  openWeather.showFiveDay(zip);
  $('#fiveDayButton').toggle();
  $('#fiveDayOutput').fadeIn(1500).removeClass('hide');
  $('#savedOutput').addClass('hide');
};

// Save Forecast

const saveForecast = () => {
  $(document).on('click', '.saveWeather', (e) => {
    const weatherToAddCard = $(e.target).closest('.fiveCard');
    console.log(weatherToAddCard);
    const weatherToAdd = {
      date: weatherToAddCard.find('.dt').text(),
      where: weatherToAddCard.find('.locale').text(),
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
      $('#weatherOutput').addClass('hide');
      $('#fiveDayOutput').addClass('hide');
      $('#savedOutput').fadeIn(2000).removeClass('hide');
    })
    .catch((error) => {
      console.error('error in get all weather', error);
    });
};

const clickViewSaved = () => {
  $(document).on('click', '#savedWeather', getAllWeatherEvent);
};

// Deleting Saved Weather

const clickTrash = () => {
  $(document).on('click', '.deleteWeather', deleteWeather);
};

const deleteWeather = (e) => {
  const weatherToDeleteCard = $(e.target).closest('.fiveDayContainer').data('firebaseId');
  firebaseAPI.deleteWeather(weatherToDeleteCard)
    .then(() => {
      getAllWeatherEvent();
    })
    .catch((error) => {
      console.error('error in delete weather', error);
    });
};

// is it scary?
const isItScary = () => {
  $(document).on('click', '.Scary', (e) => {
    const weatherToUpdateId = $(e.target).closest('.fiveDayContainer').data('firebaseId');
    const weatherToUpdateCard = $(e.target).closest('.fiveDayContainer');
    const updatedWeather = {
      date: weatherToUpdateCard.find('.dt').text(),
      where: weatherToUpdateCard.find('.locale').text(),
      temp: weatherToUpdateCard.find('.temp').text(),
      conditions: weatherToUpdateCard.find('#fiveConditions').text(),
      pressure: weatherToUpdateCard.find('.pressure').text(),
      speed: weatherToUpdateCard.find('.wind').text(),
      isScary: true,
    };
    firebaseAPI.scaryWeather(updatedWeather, weatherToUpdateId)
      .then(() => {
        getAllWeatherEvent();
      })
      .catch((error) => {
        console.error('error on updated scary weather', error);
      });
  });
};

const authEvents = () => {
  $('#signin-btn').click((e) => {
    e.preventDefault();
    const email = $('#inputEmail').val();
    const pass = $('#inputPassword').val();
    firebase.auth().signInWithEmailAndPassword(email, pass)
      .catch((error) => {
        $('#signin-error-msg').text(error.message);
        $('#signin-error').removeClass('hide');
        console.error(error.message);
      });
  });
  $('#register-btn').click(() => {
    const email = $('#registerEmail').val();
    const pass = $('#registerPassword').val();
    firebase.auth().createUserWithEmailAndPassword(email, pass)
      .catch((error) => {
        $('#register-error-msg').text(error.message);
        $('#register-error').removeClass('hide');
        $('#weatherOutput').addClass('hide');
        $('#fiveDayOutput').addClass('hide');
        console.error(error.message);
      });
  });
  $('#register-link').click(() => {
    $('#login-form').addClass('hide');
    $('#registration-form').fadeIn(1000).removeClass('hide');
    $('#signin-error').addClass('hide');
    $('#inputEmail').val('');
    $('#inputPassword').val('');
  });
  $('#signin-link').click(() => {
    $('#login-form').fadeIn(1000).removeClass('hide');
    $('#registration-form').addClass('hide');
    $('#registerEmail').val('');
    $('#registerPassword').val('');
    $('#register-error').addClass('hide');
  });
  $('#logout').click(() => {
    firebase.auth().signOut().then(() => {
      $('#inputEmail').val('');
      $('#inputPassword').val('');
      $('#searchBar').val('');
      $('#registration-form').addClass('hide');
    })
      .catch((error) => {
        console.error(error);
      });
  });
};

const bindEvents = () => {
  pressEnter();
  clickButton();
  saveForecast();
  clickViewSaved();
  clickTrash();
  isItScary();
  authEvents();
};

module.exports = {
  bindEvents,
  getAllWeatherEvent,
};
