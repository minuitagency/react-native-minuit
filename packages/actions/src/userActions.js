import numbro from 'numbro';

let fr = require('numbro/dist/languages/fr-FR.min');
numbro.registerLanguage(fr, true);
numbro.setLanguage('fr-FR');

export const formatNumber = (x) => {
  if (isNaN(x) || !x) {
    return 0;
  }

  const formattedNumber = numbro(x).format({
    thousandSeparated: true,
    mantissa: 0,
  });

  return formattedNumber;
};
