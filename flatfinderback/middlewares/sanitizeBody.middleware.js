const forbiddenFields = ["ownerId", "createdAt", "updatedAt", "deletedAt", "__v", "resetPasswordToken", "resetPasswordExpire", "_id"];


export const sanitizeBody = (req, res, next) => {
  forbiddenFields.forEach((field) => {
    if (field in req.body) {
      delete req.body[field];
    }
  });
  next();
};

export const removeFieldsFromBody = (fields) => (req, res, next) => {
  fields.forEach((field) => {
    if (field in req.body) {
      delete req.body[field];
    }
  });
  next();
};

export const protectRoleField = (req, res, next) => {
  if (req.body.role && req.user.role !== "admin") {
    delete req.body.role;
  }
  next();
}
