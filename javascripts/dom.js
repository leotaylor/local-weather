const domString = (weatherArray) => {
  let strang = '';
  strang += `<div class='col-sm-6 col-sm-offset-3'>`;
  strang +=   `<div class="thumbnail" id='condtionsContainer'>`;
  // strang +=     `<div class="caption">`;
  strang +=       `<h3>Temperature: ${weatherArray.main.temp} &#8457</h3>`;
  strang +=       `<h3 id="conditions">Conditions: ${weatherArray.weather[0].main}</h3>`;
  strang +=       `<h3>Air Pressure: ${weatherArray.main.pressure} hpa</h3>`;
  strang +=       `<h3>Wind Speed: ${weatherArray.wind.speed} mph</h3>`;
  // strang +=     `</div>`;
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
      theString +=     `<h4>Temperature: ${oneDay.main.temp}&#8457</h4>`;
      theString +=     `<h4 id="fiveConditions">Conditions: ${oneDay.weather[0].main}</h4>`;
      theString +=     `<h4>Air Pressure: ${oneDay.main.pressure} hpa</h4>`;
      theString +=     `<h4>Wind Speed: ${oneDay.wind.speed} mph</h4>`;
      theString +=   `</div>`;
      theString += `</div>`;
    };
  });
  printFiveDay(theString);
};

// const domFive = (weatherArray) => {
//   let theString = '';
//   theString += `<h1>Here is your five day forecast!</h1>`;
//   for (let i = 0; i < weatherArray.length; i += 8) {
//     theString += `<div class="col-sm-2 fiveCard">`;
//     theString +=   `<div class="thumbnail fiveDayContainer ${weatherArray[i].weather[0].main}">`;
//     theString +=     `<h3>Temperature: ${weatherArray[i].main.temp} Fahrenheit</h3>`;
//     theString +=     `<h3 id="fiveConditions">Conditions: ${weatherArray[i].weather[0].main}</h3>`;
//     theString +=     `<h3>Air Pressure: ${weatherArray[i].main.pressure}</h3>`;
//     theString +=     `<h3>Wind Speed: ${weatherArray[i].wind.speed}</h3>`;
//     theString +=   `</div>`;
//     theString += `</div>`;
//   };
//   printFiveDay(theString);
// };

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
