const validateUser = (schema, omitName = false) => async (req, res, next) => {
  try {
    if (omitName) {
      await schema.omit({ username: true }).parseAsync(req.body);
    } else {
      await schema.parseAsync(req.body);
    }
    return next();
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  validateUser,
};
