import 'express-async-errors'
import express, { application } from 'express'
import cookieSession from "cookie-session";
import { NotFoundError, errorHandler } from '@prnv404/todo'
import { CreateTaskRequest } from './routes/add.task';
import { UpdateTaskRequest } from './routes/update.task';
import { DeleteTaskRequest } from './routes/delete.task';
import { QueryTaskRequest } from './routes/query.task';
import {ElasticRequest} from './routes/elasticsearch'


const app = express()

app.set("trust proxy", true);

app.use(express.json())

app.use(
    cookieSession({
      signed: false,
      secure: false,
    })
);



app.use('/api/task',CreateTaskRequest)
app.use('/api/task',UpdateTaskRequest)
app.use('/api/task',DeleteTaskRequest)
app.use('/api/task',QueryTaskRequest)
app.use('/api/task/query',ElasticRequest)

app.all("*", async (req, res) => {
    
    throw new NotFoundError();
});
  


app.use(errorHandler)
  
  

export default app

