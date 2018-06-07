// const getAllWeather = require('./events');
const {setUID,} = require('./firebaseAPI');

const loginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUID(user.uid);
      $('#authScreen').addClass('hide');
      $('#searchDiv').removeClass('hide');
      $('#theNav').removeClass('hide');
      // getAllWeather.getAllWeatherEvent(); enable to see saved forecast on login
    } else {
      $('#authScreen').removeClass('hide');
      $('#searchDiv').addClass('hide');
      $('#theNav').addClass('hide');
      $('#fiveDayOutput').addClass('hide');
      $('#savedOutput').addClass('hide');
      $('#weatherOutput').addClass('hide');
    }
  });
};

module.exports = {
  loginStatus,
};
