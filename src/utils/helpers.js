export const format_date = (dateString) => {
  if (!dateString) return "(Empty)";

  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export const format_phone = (phoneNumber) => {
  if (!phoneNumber) return "(Empty)";

  const digits = phoneNumber.replace(/\D/g, "");

  if (digits.length !== 11) return phoneNumber;

  const country = digits.slice(0, 1);
  const area = digits.slice(1, 4);
  const part1 = digits.slice(4, 8);
  const part2 = digits.slice(8, 12);

  return `+${country}(${area})-${part1}-${part2}`;
};