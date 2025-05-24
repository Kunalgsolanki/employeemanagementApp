const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const employeeRoutes = require('./routes/employeeRoutes');
const cors = require('cors');
const AuthRoute = require('./routes/Authentication/Auth');
const cookiparser = require("cookie-parser");
const AdminRoute = require('./routes/Authentication/AdminRoute');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookiparser())
app.use("/api/auth", AuthRoute);
app.use("/api/admin",AdminRoute)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

app.use('/api/user', employeeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
