export const parsePhone = (x) => {
  if (!x) return "-";
  return x.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, "$1-$2-$3");
};

export const parseMoney = (x) => {
  if (x === 0) return "0";
  if (!x) return "-";
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const parseBusinessNumber = (x) => {
  if (!x) return "-";
  return x.replace(/([0-9]+)([0-9]+)([0-9]{4})/, "$1-$2-$3");
};
