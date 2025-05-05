const forbiddenFields = ["ownerId", "createdAt", "updatedAt", "deletedAt", "__v", "resetPasswordToken", "resetPasswordExpire", "_id"];


export const sanitizeBody = (req, res, next) => {
  forbiddenFields.forEach((field) => {
    if (field in req.body) {
      delete req.body[field];
    }
  });
  next();
};

export const removeFieldFromBody = (field) => (req, res, next) => {
  delete req.body[field];
  next();
};
