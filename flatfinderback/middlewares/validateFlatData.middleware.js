export const validateFlatData = (req, res, next) => {
  const yearBuilt = req.body.yearBuilt;
  const dateAvailable = new Date(req.body.dateAvailable);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1); // Set to tomorrow at 00:00:00

  if (new Date().getFullYear() - yearBuilt > 50) {
    return res.status(400).json({ message: "Year built must be at least 50 years ago" });
  }

  if (dateAvailable < tomorrow) {
    return res.status(400).json({ message: "Date available must be from tomorrow onwards" });
  }
  next();
} 