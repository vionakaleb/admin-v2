export default function formatter() {
  const formatterIDR = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'IDR',
  });
  const formatter = new Intl.NumberFormat('en-US', {
    maximumSignificantDigits: 3,
  });

  return { formatterIDR, formatter };
}
