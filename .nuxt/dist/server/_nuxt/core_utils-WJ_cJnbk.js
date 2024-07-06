const capitalize = (str) => {
  if (str === "") {
    return "";
  }
  return str.split(" ").map((word) => {
    if (word.includes("_")) {
      return word.split("_").map((part) => {
        return part.charAt(0).toUpperCase() + part.slice(1);
      }).join(" ");
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(" ");
};
const convertDateTime = (rawDateTime) => {
  let result = new Date(rawDateTime);
  return result.toLocaleString();
};
const getYearMonthDay = (rawDateTime) => {
  let date = new Date(rawDateTime);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return `${year}-${month}-${day}`;
};
const hideLongText = (text) => {
  const words = text.split(" ");
  if (words.length > 15) {
    words.length = 15;
    words.push("...");
    const hiddenText = words.join(" ");
    return hiddenText;
  }
  return text;
};
export {
  convertDateTime as a,
  capitalize as c,
  getYearMonthDay as g,
  hideLongText as h
};
//# sourceMappingURL=core_utils-WJ_cJnbk.js.map
