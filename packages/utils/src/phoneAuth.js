export function removeSpaces(string) {
  return string.replace(/\s/g, '');
}

export function formatPhoneNumber(phone) {
  const formatPhone = [];
  phone.split('').map((number, index) => {
    if (index % 2 === 0) {
      formatPhone.push('  ');
    }
    formatPhone.push(number);
  });
  return formatPhone.join('');
}
