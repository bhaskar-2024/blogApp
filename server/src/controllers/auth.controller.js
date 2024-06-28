import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import cookie from "cookie"

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
  
    if (
      !username ||
      !email ||
      !password ||
      username === '' ||
      email === '' ||
      password === ''
    ) {
      next(errorHandler(400, 'All fields are required'));
    }
  
    const hashedPassword = bcryptjs.hashSync(password, 10);
  
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
  
    try {
      await newUser.save();
      res.json('Signup successful');
    } catch (error) {
      next(error);
    }
  };

  export const signin = async (req, res, next) => {
    const { email, password } = req.body;
  
    if (!email || !password || email === '' || password === '') {
      next(errorHandler(400, 'All fields are required'));
    }
  
    try {
      const validUser = await User.findOne({ email });
      if (!validUser) {
        return next(errorHandler(404, 'User not found'));
      }
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) {
        return next(errorHandler(400, 'Invalid password'));
      }
      const token = jwt.sign(
        { id: validUser._id, isAdmin: validUser.isAdmin },
        process.env.JWT_SECRET
      );
  
      const { password: pass, ...rest } = validUser._doc;
      const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        partitioned : true
      };
      
      res
        .status(200)
        .cookie('access_token', token, options)
        .json(rest);
    } catch (error) {
      next(error);
    }
  };

  export const google = async (req, res, next) => {
    const { email, name, googlePhotoUrl } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user) {
        const token = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          process.env.JWT_SECRET
        );
        const { password, ...rest } = user._doc;
        
        const options = {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          partitioned : true,
          domain :  process.env.CORS_ORIGIN
        };
        res
          .status(200)
          .setHeader(
            'Set-Cookie',
             cookie.serialize('access_token', token, { 
               sameSite: 'lax', 
               httpOnly: true, // must be true in production
               path: '/',
               secure: true, // must be true in production
               maxAge: 60 * 60 * 24 * 7 * 52, // 1 year
               domain: "https://blog-app-bhaskar-2024s-projects.vercel.app/", // the period before is important and intentional
             })
           )
          .json(rest);
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = new User({
          username:
            name.toLowerCase().split(' ').join('') +
            Math.random().toString(9).slice(-4),
          email,
          password: hashedPassword,
          profilePicture: googlePhotoUrl,
        });
        await newUser.save();
        const options = {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          partitioned : true,
          domain : process.env.CORS_ORIGIN
        };
        const token = jwt.sign(
          { id: newUser._id, isAdmin: newUser.isAdmin },
          process.env.JWT_SECRET
        );
        const { password, ...rest } = newUser._doc;
        res
          .status(200)
          .setHeader(
            'Set-Cookie',
             cookie.serialize('access_token', token, { 
               sameSite: 'lax', 
               httpOnly: true, // must be true in production
               path: '/',
               secure: true, // must be true in production
               maxAge: 60 * 60 * 24 * 7 * 52, // 1 year
               domain: "https://blog-app-bhaskar-2024s-projects.vercel.app/", // the period before is important and intentional
             })
           )
          .json(rest);
      }
    } catch (error) {
      next(error);
    }
  };