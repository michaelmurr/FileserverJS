import express from "express";
import bcrypt from "bcrypt";

const router = express.Router();
import User from "../models/userSchema.js";
const saltRounds = 12;
const message = "Wrong Username or Password";

//Since this is only used for my own personal fileserver, we will check if a user
//already exists in the DB. If true, we will not allow the creation of another user
//and return the error code 401 Unauthorized
router.post("/register", async (req, res) => {
  const foundUser = await User.find({});
  if (foundUser.length > 0) return res.status(401).send();

  //No user yet? Hash the password and save in DB
  bcrypt.hash(req.body.password, saltRounds, (e, hash) => {
    if (e) return res.status(400).send({ e });

    try {
      const user = new User({
        username: req.body.username,
        password: hash,
      });
      user.save();
      req.session.isAuth = true;
      res.status(200).send();
    } catch (e) {
      console.log(e);
      return res.status(400).send({ e });
    }
  });
});

router.post("/login", async (req, res) => {
  const foundUser = await User.findOne({ username: req.body.username });
  if (!foundUser) {
    return res.status(400).send({ message });
  }

  bcrypt.compare(req.body.password, foundUser.password, (e, valid) => {
    if (e) return res.status(400).send({ e });

    if (!valid) return res.status(400).send({ message });

    req.session.isAuth = true;
    res.status(200).send();
  });
});

router.get("/logout", (req, res) => {
  req.session.user = null;
  req.session.save((e) => {
    if (e) return res.status(400), send({ e });
  });

  req.session.regenerate((e) => {
    if (e) return res.status(400).send({ e });
    return res.send(200);
  });
});

export default router;
