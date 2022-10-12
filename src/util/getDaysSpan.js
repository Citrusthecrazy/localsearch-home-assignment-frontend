const getDaysSpan = (daysArray) => {
  let res = "";
  if (daysArray.length === 1) res = daysArray[0];
  else res = `${daysArray[0]} - ${daysArray[daysArray.length - 1]}`;
  return res;
};

export default getDaysSpan;
