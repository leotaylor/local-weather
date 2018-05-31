let firebaseConfig = {};

const setConfig = (fbConfig) => {
  firebaseConfig = fbConfig;
};

const saveWeather = (newWeather) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'POST',
      url: `${firebaseConfig.databaseURL}/weather.json`,
      data: JSON.stringify(newWeather),
    })
      .done((uniqueKey) => {
        resolve(uniqueKey);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const getAllWeather = () => {
  return new Promise((resolve, reject) => {
    const allWeatherArray = [];
    $.ajax({
      method: 'GET',
      url: `${firebaseConfig.databaseURL}/weather.json`,
    })
      .done((allWeatherObject) => {
        if (allWeatherObject !== null) {
          Object.keys(allWeatherObject). forEach((fbKey) => {
            allWeatherObject[fbKey].id = fbKey;
            allWeatherArray.push(allWeatherObject[fbKey]);
          });
        }
        resolve(allWeatherArray);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

module.exports = {
  setConfig,
  saveWeather,
  getAllWeather,
};
