export const validateFlatData = (req, res, next) => {
  const yearBuilt = req.body.yearBuilt;
  const dateAvailable = new Date(req.body.dateAvailable);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (new Date().getFullYear() - yearBuilt > 50) {
    return res.status(400).json({ message: "Year built must be at least 50 years ago" });
  }

  if (dateAvailable < today) {
    return res.status(400).json({ message: "Date available must be from today onwards" });
  }
  next();
} 