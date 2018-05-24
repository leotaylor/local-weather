const domString = (weatherArray) => {
  let strang = '';
  strang += `<div class='col-sm-6 col-sm-offset-3'>`;
  strang +=   `<p><a href="#" class="btn btn-primary" role="button">Today</a> <a href="#" class="btn btn-default" role="button">5 Day Forecast</a></p>`;
  strang +=   `<div class="thumbnail">`;
  strang +=     `<div class="caption">`;
  strang +=       `<h3>Temperature: ${weatherArray.main.temp} Fahrenheit</h3>`;
  strang +=       `<h3>Conditions: ${weatherArray.weather[0].main}</h3>`;
  strang +=       `<h3>Air Pressure: ${weatherArray.main.pressure}</h3>`;
  strang +=       `<h3>Wind Speed: ${weatherArray.wind.speed}</h3>`;
  strang +=     `</div>`;
  strang +=   `</div>`;
  strang += `</div>`;
  printToDom(strang);
};

const printToDom = (stringz) => {
  $('#weatherOutput').html(stringz);
};

module.exports = {
  domString,
};
