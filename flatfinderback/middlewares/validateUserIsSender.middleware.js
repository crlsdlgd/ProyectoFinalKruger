export const validateUserIsSender = (req, res, next) => {
  const userId = req.user.id;
  const senderId = req.params.senderId;
  try {
    if (senderId !== userId) {
      return res.status(400).json({ message: "Bad request" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};