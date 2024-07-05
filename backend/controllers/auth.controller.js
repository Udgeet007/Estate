import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Hash The Password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    //CREATE A NEW USER AND SAVE TO DB
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    console.log(newUser);
    res.status(201).json({ messgae: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ messgae: "Failed to create user!" });
  }
};

export const login = async (req, res) => {
  //db operations
  const { username, password } = req.body;

  try {
    //CHECK IF THE USER EXIST
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) return res.status(404).json({ messgae: "Invalid Credentials!" });

    //CHECK IF THE PASSWORD IS CORRECT

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(401).json({ messgae: "Invalid Credentials! " });

    //GENERATE COOKIE TOKEN AND SEND TO THE USER
    // res.setHeader("Set-Cookie", "test=" + "myValue").json("success")
    const age = 1000 * 60 * 60 * 24 * 7;

    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: true,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const { password: userPassword, ...userInfo } = user;

    res
      .cookie("token", token, {
        httpOnly: true,
        // secure:true
        maxAge: age,
      })
      .status(200)
      .json({ messgae: "Login Successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ messgae: "Failed to login!" });
  }
};

export const logout = (req, res) => {
  //db operations
  res.clearCookie("token").status(200).json({ messgae: "Logout Successfull!" });
};
