import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
        exposedHeaders : ["Set-Cookie"],
    }
))
app.set('trust proxy', 1);
  app.use(json());
  app.use(
    session({
      name: 'access_token',
      store: new RedisStore({ client: redisClient }),
      secret: options.sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: true,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: "None",
        domain: process.env.CORS_ORIGIN,
      },
    })
  );

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended:true , limit : "10kb"}))
app.use(cookieParser())
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });


import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import postRoutes from './routes/post.routes.js'
import commentRoutes from './routes/comment.routes.js'

app.use('/api/comments' , commentRoutes)
app.use("/api/post" , postRoutes)
app.use("/api/user" , userRoutes)
app.use("/api/auth" , authRoutes)

export {app}