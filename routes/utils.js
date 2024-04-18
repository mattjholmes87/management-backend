function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRid() {
  let uniqueId = "";
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcedfghijklmnopqrstuvwxyz";
  let charsDate = (chars += Date.now());
  let charsLength = charsDate.length;
  const rndInt = randomIntFromInterval(1, 10);

  for (let i = 0; i < charsLength - rndInt; i++) {
    uniqueId += charsDate.charAt(Math.floor(Math.random() * charsLength));
  }

  return uniqueId;
}

function getDateTimeStamp() {
  let date = new Date();
  const mseconds = date.getMilliseconds();
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  let dateTimeStamp =
    year +
    "-" +
    (month + 1) +
    "-" +
    day +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;
  return dateTimeStamp;
}

function getDateStamp() {
  let date = new Date();
  const mseconds = date.getMilliseconds();
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  let dateStamp = year + "-" + (month + 1) + "-" + day;
  return dateStamp;
}

function camelCaseToSnakeCase(input) {
  let splitInput = input.split(/(?=[A-Z])/);
  let snakedInput = splitInput.join("_").toLowerCase();
  return snakedInput;
}

module.exports = {
  randomIntFromInterval,
  getRid,
  getDateTimeStamp,
  getDateStamp,
  camelCaseToSnakeCase,
};
