let currentDate = null;

const getChatDate = (stamp) => {
  const currentTime = new Date();
  const c_date =
    currentTime.getDate() < 10
      ? `0${currentTime.getDate()}`
      : currentTime.getDate();
  const c_mon =
    currentTime.getMonth() + 1 < 10
      ? `0${currentTime.getMonth() + 1}`
      : currentTime.getMonth() + 1;
  const c_year = currentTime.getFullYear();

  const c_fulldate = c_date + "-" + c_mon + "-" + c_year;

  const yesterday_fulldate =
    (currentTime.getDate() < 10
      ? `0${currentTime.getDate() - 1}`
      : currentTime.getDate() - 1) +
    "-" +
    c_mon +
    "-" +
    c_year;

  const time = new Date(parseInt(stamp));
  const date = time.getDate() < 10 ? `0${time.getDate()}` : time.getDate();
  const mon =
    time.getMonth() + 1 < 10 ? `0${time.getMonth() + 1}` : time.getMonth() + 1;
  const year = time.getFullYear();

  const fulldate = date + "-" + mon + "-" + year;

  const isToday = fulldate === c_fulldate && "Today";
  const isYesterDay = fulldate === yesterday_fulldate && "Yesterday";

  if (isToday && isToday !== currentDate) {
    currentDate = isToday;
    return isToday;
  }

  if (isYesterDay && isYesterDay !== currentDate) {
    currentDate = isYesterDay;
    return isYesterDay;
  }

  if (!isToday && !isYesterDay) {
    const inputDateString = fulldate;
    const parts = inputDateString.split("-");
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthName = monthNames[parseInt(month) - 1];
    const outputDateString = day + " " + monthName + ", " + year;

    if (outputDateString !== currentDate) {
      currentDate = outputDateString;
      return outputDateString;
    }
  }
};
