const timeConvert = (num) => {
  var hours = Math.floor(num / 60);
  var minutes = num % 60;

  if (hours === 0) return minutes + 'm';

  return hours + 'h' + minutes + 'm';
};

export default timeConvert;