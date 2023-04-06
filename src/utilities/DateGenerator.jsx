export default function DateGenerator() {
  // 2023-01-17 20:37:05
  let currentdate = new Date();

  let month = mode("" + (currentdate.getMonth() + 1));
  let date = mode("" + currentdate.getDate());

  let hour = mode("" + currentdate.getHours());
  let minute = mode("" + currentdate.getMinutes());
  let second = mode("" + currentdate.getSeconds());

  let datetime =
    currentdate.getFullYear() +
    "-" +
    month +
    "-" +
    date +
    " " +
    hour +
    ":" +
    minute +
    ":" +
    second;

  return datetime;
}

function mode(obj) {
  if (obj.length == 1) {
    obj = "0" + obj;
  }
  return obj;
}