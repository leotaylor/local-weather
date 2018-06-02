const domString = (weatherArray) => {
  let strang = '';
  strang += `<div class='col-sm-6 col-sm-offset-3'>`;
  strang +=   `<div class="thumbnail" id='condtionsContainer'>`;
  strang +=       `<h1>Current Conditions for ${$('#searchBar').val()}</h1>`;
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
      theString += `<div class="col-sm-2 fiveCard" id="trashCard">`;
      theString +=   `<div class="thumbnail fiveDayContainer ${oneDay.weather[0].main}">`;
      theString +=     `<h4 class="dt">${new Date(oneDay.dt * 1000).toLocaleDateString()}</h4>`;
      theString +=     `<h4 class="temp">Temperature: ${oneDay.main.temp}&#8457</h4>`;
      theString +=     `<h4 id="fiveConditions">Conditions: ${oneDay.weather[0].main}</h4>`;
      theString +=     `<h4 class='pressure'>Air Pressure: ${oneDay.main.pressure} hpa</h4>`;
      theString +=     `<h4 class='wind'>Wind Speed: ${oneDay.wind.speed} mph</h4>`;
      theString +=     `<a href="#" class="btn btn-info saveWeather"><span class="glyphicon glyphicon-heart-empty"></span> Save Forecast</a>`;
      theString +=      `<button type="button" class="btn-danger" id="isScary">Very, Very Frightening Me</button>`;
      theString +=   `</div>`;
      theString += `</div>`;
    };
  });
  printFiveDay(theString);
};

const savedWeatherDom = (array) => {
  let theString = '';
  theString = `<h1>Your Saved Forecasts!</h1>`;
  array.forEach((oneDay) => {
    theString += `<div class="col-sm-2 fiveCard">`;
    theString +=   `<div class="thumbnail fiveDayContainer ${oneDay.conditions}" data-firebase-id='${oneDay.id}'>`;
    theString +=     `<h4 class="temp">${oneDay.temp}</h4>`;
    theString +=     `<h4 id="fiveConditions">${oneDay.conditions}</h4>`;
    theString +=     `<h4 class='pressure'>${oneDay.pressure}</h4>`;
    theString +=     `<h4 class='wind'>${oneDay.speed}</h4>`;
    theString +=     `<button type="button" class=" btn-danger" id="isScary">Very Very Frightening Me</button><br>`;
    theString +=     `<button class="btn btn-info deleteWeather"><span class="glyphicon glyphicon-trash"></span> Delete</button>`;
    theString +=   `</div>`;
    theString += `</div>`;
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
