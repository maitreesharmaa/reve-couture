const express = require ('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const {errorHandler} = require ('./middleware/error');
const cookiePrser = require ('cookie-parser');

const authRoutes = require ('./routes/auth.routes');
const cartRoutes = require ('./routes/cart.routes');
const orderRoutes = require ('./routes/order.routes');
const categoryRoutes = require ('./routes/category.routes');
const productRoutes = require ('./routes/product.routes');

const app = express();

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json({limit: '10kb'}));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookiePrser(process.env.COOKIE_SECRET || ''));
if (process.env.NODE_ENV === 'test'){
    app.use(morgan('dev'));
}

app.get('/api/health', (req, res) => {
    res.json({success: true, message: 'OK'});
})

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

app.use((req, res) => {
    res.status(404).json({success: false, message: 'Not found'});
})

app.use(errorHandler);

module.exports = app;