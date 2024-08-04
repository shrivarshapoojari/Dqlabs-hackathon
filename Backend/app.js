
import dotenv from 'dotenv'
dotenv.config();
 import cookieParser from 'cookie-parser';
 
import express from 'express'
import userRoutes from './routes/user.routes.js'
import miscRoutes from './routes/misc.routes.js'
import courseRoutes from './routes/course.routes.js';
import paymentRoutes from './routes/payment.routes.js'
import jobRoutes from './routes/job.routes.js';
const app=express();
import cors from 'cors'
import  errorMiddleware from   './middlewares/error.middleware.js'
 
import  connectToDB from "./config/dbConnection.js"
import morgan  from 'morgan'
app.use(express.json())
const allowedOrigin = 'http://localhost:3000';
 
app.use(cors({
    origin: allowedOrigin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true  
}))

app.use(morgan('dev'))

connectToDB();
app.use(cookieParser());

app.use('/ping',(req,res)=>{
    res.send('pong')
})


app.use('/api/user',userRoutes);
app.use('/api/misc',miscRoutes);
app.use('/api/courses',courseRoutes)
app.use('/api/payments',paymentRoutes)
app.use('/api/jobs', jobRoutes); 

// if any route not found

app.all('*',(req,res)=>{
    res.status(404).send('OOPS !! Page  Not Found')
})

app.use(errorMiddleware);

 export default app;



// import express from 'express';
// import jobRoutes from './routes/job.routes.js'; // Ensure this path is correct

// const app = express();

// app.use(express.json());

// app.use('/api/jobs', jobRoutes); // Ensure this line is present and correct

// app.all('*', (req, res) => {
//   res.status(404).send('OOPS !! Page Not Found');
// });

// app.listen(5000, () => {
//   console.log('Server running on port 5000');
// });
