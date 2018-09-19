const date = new Date();
const years = [];
const months = [];
const days = [];
const hours = [];
const minutes = [];
const seconds = [];

for (let i = 1990; i <= date.getFullYear() + 5; i++) {
  years.push("" + i);
}

for (let i = 1; i <= 12; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  months.push("" + i);
}

for (let i = 1; i <= 31; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  days.push("" + i);
}

for (let i = 0; i < 24; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  hours.push("(H)" + i);
}

for (let i = 0; i < 60; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  minutes.push("(M)" + i);
}

for (let i = 0; i < 60; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  seconds.push("(S)" + i);
}

function getDatePickerArray() {
  return [years, months, days, hours, minutes, seconds];
}

module.exports = {
  getDatePickerArray: getDatePickerArray
}
