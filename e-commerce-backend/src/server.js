import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.route.js'
import productRoute from './routes/product.route.js'
import { ConnectDb } from './lib/db.js';
import cartRoute from './routes/cart.route.js'
import orderRoute from './routes/order.route.js'
import dotenv from 'dotenv';
dotenv.config();
const app = express();

const port = process.env.Port || 5000;

app.use(cors({origin:"http://localhost:5173",
    credentials:true
}))

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoute)
app.use('/api/product',productRoute)
app.use('/api/cart',cartRoute)
app.use('/api/order',orderRoute)

app.listen(port,()=>{
    console.log(`server running on port ${port}`)
   ConnectDb();
})
