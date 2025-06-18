require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const userRouter = require('./routes/user');
const gearRouter = require('./routes/gear');
const packageRouter = require('./routes/package');
const bookingRouter = require('./routes/booking');
const aiConsultationRouter = require('./routes/aiConsultation');
const packageGearRouter = require('./routes/packageGear');
const rentalRouter = require('./routes/rental');
const paymentRouter = require('./routes/payment');
const cartRouter = require('./routes/cart');
const orderBookingRouter = require('./routes/orderBooking');
const orderBookingItemRouter = require('./routes/orderBookingItem');
const statsRouter = require('./routes/stats');

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.DB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Camping Management API',
      version: '1.0.0',
      description: 'API for managing camping bookings and gear rentals with MongoDB',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 8080}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Serve static files for uploads
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/users', userRouter);
app.use('/gears', gearRouter);
app.use('/packages', packageRouter);
app.use('/bookings', bookingRouter);
app.use('/ai-consultations', aiConsultationRouter);
app.use('/package-gears', packageGearRouter);
app.use('/rentals', rentalRouter);
app.use('/payments', paymentRouter);
app.use('/cart', cartRouter);
app.use('/order-bookings', orderBookingRouter);
app.use('/order-booking-items', orderBookingItemRouter);
app.use('/stats', statsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'Kích thước file vượt quá 5MB' });
    }
    return res.status(400).json({ error: err.message });
  } else if (err.message === 'Chỉ hỗ trợ file JPEG hoặc PNG') {
    return res.status(400).json({ error: err.message });
  }
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Docs available at http://localhost:${PORT}/api-docs`);
});