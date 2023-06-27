import 'express-async-errors'
import express, { application } from 'express'
import cookieSession from "cookie-session";
import { NotFoundError, errorHandler } from '@prnv404/todo'

import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { currentUserRouter } from './routes/current.user';



const app = express()

app.set("trust proxy", true);

app.use(express.json())

app.use(
    cookieSession({
      signed: false,
      secure: false,
    })
);

app.use(signupRouter)
app.use(signinRouter)  
app.use(signoutRouter)  
app.use(currentUserRouter)  




app.all("*", async (req, res) => {
    
    throw new NotFoundError();
});
  


app.use(errorHandler)
  
  

export default app

