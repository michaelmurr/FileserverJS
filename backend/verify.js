import jwt from "jsonwebtoken";

const verify = (req, res, next) => {
  if (!req.session.isAuth)
    return res.status(401).send({ message: "Access Denied" });

  next();
};

export { verify };
