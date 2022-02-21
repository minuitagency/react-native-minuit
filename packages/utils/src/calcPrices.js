// eslint-disable-next-line require-jsdoc
function calcTVA({ price = 0, tva = 0 }) {
  return tva > 0 ? price * (1 + tva / 100) : price;
}

// eslint-disable-next-line require-jsdoc
function calcPrices({
  products = [],
  seller = {
    isFreeFees: false,
    freeFeesMin: undefined,
    fees: undefined,
  },
  type = 0,
}) {
  const optionsTotal = (product = { options: [] }, withTVA = false) =>
    product.options.reduce((t, option) => {
      console.log(option);
      const { price = 0, quantity = 1, tva = 0 } = option;
      const subOptions = optionsTotal(
        { options: option.options ? Object.values(option.options).flat() : [] },
        withTVA
      );
      return (
        t +
        ((withTVA ? calcTVA({ price, tva }) : price) + subOptions) * quantity
      );
    }, 0);

  const productsHT = products.reduce((total, product) => {
    return total + (product.price + optionsTotal(product)) * product.quantity;
  }, 0);

  const productsTTC = products.reduce((total, product) => {
    return (
      total +
      (calcTVA(product) + optionsTotal(product, true)) * product.quantity
    );
  }, 0);

  const serviceFees = productsHT * 0.1;

  const deliveryFees =
    type === 0
      ? 0
      : seller?.isFreeFees
      ? productsHT >= seller?.freeFeesMin * 1.2 || seller?.freeFeesMin === 0
        ? 0
        : seller?.fees
      : seller?.fees;

  const toReturn = {
    productsHT,
    productsTTC,
    deliveryFeesHT: deliveryFees,
    deliveryFeesTTC: deliveryFees * 1.2,
    serviceFeesHT: serviceFees,
    serviceFeesTTC: serviceFees * 1.2,
    totalHT: productsHT + deliveryFees + serviceFees,
    totalTTC: productsTTC + (deliveryFees + serviceFees) * 1.2,
    tva: productsTTC - productsHT + (deliveryFees + serviceFees) * 0.2,
  };

  return toReturn;
}

module.exports = { calcTotal: calcPrices, calcTVA };
