const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const employeeRoutes = require('./routes/employeeRoutes');
const cors = require('cors');
const AuthRoute = require('./routes/Authentication/Auth');
const cookieParser = require("cookie-parser");
const AdminRoute = require('./routes/Authentication/AdminRoute');
dotenv.config();

const app = express();

// ✅ CORS Configuration
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,              
};

app.use(cors(corsOptions));       
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", AuthRoute);
app.use("/api/admin", AdminRoute);
app.use('/api/user', employeeRoutes);

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
