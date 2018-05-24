const domString = (weatherArray) => {
  let strang = '';
  strang += `<div class='col-sm-6 col-sm-offset-3'>`;
  strang +=   `<div class="thumbnail">`;
  strang +=     `<div class="caption">`;
  strang +=       `<h3>Temperature: ${weatherArray.main.temp} Fahrenheit</h3>`;
  strang +=       `<h3>Conditions: ${weatherArray.weather[0].main}</h3>`;
  strang +=       `<h3>Air Pressure: ${weatherArray.main.pressure}</h3>`;
  strang +=       `<h3>Wind Speed: ${weatherArray.wind.speed}</h3>`;
  strang +=     `</div>`;
  strang +=   `</div>`;
  strang +=   `<p><a href="#" class="btn btn-primary" role="button">Today</a> <a href="#" class="btn btn-default" id="fiveDayButton" role="button">5 Day Forecast</a></p>`;
  strang += `</div>`;
  printToDom(strang);
};

const domFive = (weatherArray) => {
  let theString = '';
  weatherArray.forEach((day) => {
    theString += `<div class="col-sm-2">`;
    theString +=   `<div class="thumbnail">`;
    theString +=     `<div class="caption">`;
    theString +=       `<h3>Temperature: ${day.main.temp} Fahrenheit</h3>`;
    theString +=       `<h3>Conditions: ${day.weather[0].main}</h3>`;
    theString +=       `<h3>Air Pressure: ${day.main.pressure}</h3>`;
    theString +=       `<h3>Wind Speed: ${day.wind.speed}</h3>`;
    theString +=     `</div>`;
    theString +=   `</div>`;
    theString += `</div>`;
  });
  printFiveDay(theString);
};

const printToDom = (stringz) => {
  $('#weatherOutput').html(stringz);
};

const printFiveDay = (stringers) => {
  $('#fiveDayOutput').html(stringers);
};

module.exports = {
  domString,
  domFive,
};
