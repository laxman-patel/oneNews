import getData from "./getData.js";
import newsSourceList from "./newsSourceList.js";

const mainFunc = () => {
  newsSourceList.map((item) => {
    getData(item.url, item.category, item.source);
  });
};

export default mainFunc;
