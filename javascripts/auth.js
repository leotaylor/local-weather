const getAllWeather = require('./events');
const {setUID,} = require('./firebaseAPI');

const loginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUID(user.uid);
      $('#authScreen').addClass('hide');
      $('#searchDiv').removeClass('hide');
      $('#theNav').removeClass('hide');
      $('#fiveDayOutput').addClass('hide');
      getAllWeather.getAllWeatherEvent();
    } else {
      $('#authScreen').removeClass('hide');
      $('#searchDiv').addClass('hide');
      $('#theNav').addClass('hide');
      $('#fiveDayOutput').addClass('hide');
    }
  });
};

module.exports = {
  loginStatus,
};
