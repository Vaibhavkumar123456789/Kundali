export const formatNumber = (str) =>
  str.replace(/,/g, '').replace('\u20B9 ', '');

export const formatAmount = (amount) =>
  `\u20B9 ${parseInt(amount)
    .toFixed(0)
    .replace(/(\d)(?=(\d\d)+\d$)/g, '$1,')}`;

export const textInPrice = (price) => `\u20B9 ${price}`;
