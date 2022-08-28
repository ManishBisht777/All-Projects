const daysel = document.getElementById("days");
const hoursel = document.getElementById("hours");
const minsel = document.getElementById("mins");
const secel = document.getElementById("sec");

const birthday = new Date("1 jan 2023");

function countdown() {
  const birthdate = new Date(birthday);
  const currentdate = new Date();

  const totalsec = (birthdate - currentdate) / 1000;

  const sec = Math.floor(totalsec) % 60;
  const min = Math.floor(totalsec / 60) % 60;
  const hour = Math.floor(totalsec / 3600) % 24;
  const day = Math.floor(totalsec / 3600 / 24);

  daysel.innerHTML = format(day);
  hoursel.innerHTML = format(hour);
  minsel.innerHTML = format(min);
  secel.innerHTML = format(sec);
}

function format(time) {
  return time < 10 ? `0${time}` : time;
}

countdown();

setInterval(countdown, 1000);
