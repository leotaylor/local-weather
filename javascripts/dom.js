const domString = (weatherArray) => {
  let strang = '';
  strang += `<div class='col-sm-6 col-sm-offset-3'>`;
  strang +=   `<div class="thumbnail" id='condtionsContainer'>`;
  strang +=       `<h3>Temperature: ${weatherArray.main.temp} &#8457</h3>`;
  strang +=       `<h3 id="conditions">Conditions: ${weatherArray.weather[0].main}</h3>`;
  strang +=       `<h3>Air Pressure: ${weatherArray.main.pressure} hpa</h3>`;
  strang +=       `<h3>Wind Speed: ${weatherArray.wind.speed} mph</h3>`;
  strang +=   `</div>`;
  strang +=   `<p><a href="#" class="btn btn-default" id="fiveDayButton" role="button">5 Day Forecast</a></p>`;
  strang += `</div>`;
  printToDom(strang);
};

const domFive = (weatherArray) => {
  let theString = '';
  weatherArray.forEach((oneDay, index) => {
    if (index % 8 === 0) {
      theString += `<div class="col-sm-2 fiveCard">`;
      theString +=   `<div class="thumbnail fiveDayContainer ${oneDay.weather[0].main}">`;
      theString +=     `<h4 class="temp">Temperature: ${oneDay.main.temp}&#8457</h4>`;
      theString +=     `<h4 id="fiveConditions">Conditions: ${oneDay.weather[0].main}</h4>`;
      theString +=     `<h4 class='pressure'>Air Pressure: ${oneDay.main.pressure} hpa</h4>`;
      theString +=     `<h4 class='wind'>Wind Speed: ${oneDay.wind.speed} mph</h4>`;
      theString +=     `<a href="#" class="btn btn-info btn-lg saveWeather"><span class="glyphicon glyphicon-heart-empty"></span> Save Forecast</a>`;
      theString +=      `<button type="button" class="btn-lg btn-danger" id="isScary">Very Frightening Me</button>`;
      theString +=   `</div>`;
      theString += `</div>`;
    };
  });
  printFiveDay(theString);
};

const savedWeatherDom = (newWeatherArray) => {
  let theString = '';
  theString = 'Your Saved Forecasts!';
  newWeatherArray.forEach((oneDay, index) => {
    if (index % 8 === 0) {
      theString += `<div class="col-sm-2 fiveCard">`;
      theString +=   `<div class="thumbnail fiveDayContainer ${oneDay.weather[0].main}">`;
      theString +=     `<h4 class="temp">Temperature: ${oneDay.main.temp}&#8457</h4>`;
      theString +=     `<h4 id="fiveConditions">Conditions: ${oneDay.weather[0].main}</h4>`;
      theString +=     `<h4 class='pressure'>Air Pressure: ${oneDay.main.pressure} hpa</h4>`;
      theString +=     `<h4 class='wind'>Wind Speed: ${oneDay.wind.speed} mph</h4>`;
      theString +=     `<a href="#" class="btn btn-info btn-lg saveWeather"><span class="glyphicon glyphicon-heart-empty"></span> Save Forecast</a>`;
      theString +=      `<button type="button" class="btn-lg btn-danger" id="isScary">Very Frightening Me</button>`;
      theString +=   `</div>`;
      theString += `</div>`;
    };
  });
  printSaved(theString);
};

const printToDom = (stringz) => {
  $('#weatherOutput').html(stringz);
};

const printFiveDay = (stringers) => {
  $('#fiveDayOutput').html(stringers);
};

const printSaved = (strung) => {
  $('#savedOutput').html(strung);
};

module.exports = {
  domString,
  domFive,
  savedWeatherDom,
};
