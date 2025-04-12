const calculateAge = (birthDate) => {
  const today = new Date();
  const birthDateObj = new Date(birthDate);
  let age = today.getUTCFullYear() - birthDateObj.getUTCFullYear();
  const m = today.getUTCMonth() - birthDateObj.getUTCMonth();
  if (m < 0 || (m === 0 && today.getUTCDate() < birthDateObj.getUTCDate())) {
    age -= 1;
  }
  return age;
};

export { calculateAge };