import bcrypt from "bcrypt";
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

export const login = async(req, res) => {
  //db operations
  const {username, password} = req.body;

  try {
    
   //CHECK IF THE USER EXIST
   const user = await prisma.user.findUnique({
    where:{username}
   })

   if(!user) return res.status(404).json({messgae:'Invalid Credentials!'});

  //CHECK IF THE PASSWORD IS CORRECT

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if(!isPasswordValid) return res.status(401).json({messgae: "Invalid Credentials! "});

  //GENERATE COOKIE TOKEN AND SEND TO THE USER 

  res.setHeader("Set-Cookie", "test=" + "myValue")
  }catch(err){
    console.log(err)
    res.status(500).json({messgae:"Failed to login!"})
  }
};

export const logout = (req, res) => {
  //db operations
};
