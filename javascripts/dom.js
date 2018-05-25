const domString = (weatherArray) => {
  let strang = '';
  strang += `<div class='col-sm-6 col-sm-offset-3'>`;
  strang +=   `<div class="thumbnail" id='condtionsContainer'>`;
  strang +=     `<div class="caption">`;
  strang +=       `<h3>Temperature: ${weatherArray.main.temp} Fahrenheit</h3>`;
  strang +=       `<h3 id="conditions">Conditions: ${weatherArray.weather[0].main}</h3>`;
  strang +=       `<h3>Air Pressure: ${weatherArray.main.pressure} hpa</h3>`;
  strang +=       `<h3>Wind Speed: ${weatherArray.wind.speed} mph</h3>`;
  strang +=     `</div>`;
  strang +=   `</div>`;
  strang +=   `<p><a href="#" class="btn btn-default" id="fiveDayButton" role="button">5 Day Forecast</a></p>`;
  strang += `</div>`;
  printToDom(strang);
};

const domFive = (weatherArray) => {
  let theString = '';
  theString += `<h1>Here is your five day forecast!</h1>`;
  for (let i = 0; i < weatherArray.length; i += 8) {
    theString += `<div class="col-sm-2" id=fiveCard>`;
    theString +=   `<div class="thumbnail ${weatherArray[i].weather[0].main}" id='fiveDayContainer'>`;
    theString +=     `<div class="caption">`;
    theString +=       `<h3>Temperature: ${weatherArray[i].main.temp} Fahrenheit</h3>`;
    theString +=       `<h3 id="fiveConditions">Conditions: ${weatherArray[i].weather[0].main}</h3>`;
    theString +=       `<h3>Air Pressure: ${weatherArray[i].main.pressure}</h3>`;
    theString +=       `<h3>Wind Speed: ${weatherArray[i].wind.speed}</h3>`;
    theString +=     `</div>`;
    theString +=   `</div>`;
    theString += `</div>`;
  };
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
