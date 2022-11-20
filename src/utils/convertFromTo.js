import convert from "convert-units";

const convertFromTo = (num, from, to, numDecimals) => {
    return convert(num).from(from).to(to).toFixed(numDecimals);
};

export default convertFromTo;
