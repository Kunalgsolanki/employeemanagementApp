const express = require("express");
const getUser = require("../../controllers/Admin");
const { isAdmin } = require("../../middleware/verifyToken");
const { deleteUser } = require("../../controllers/Authentication/Auth");

const AdminRoute = express.Router();

AdminRoute.get("/getuser",isAdmin,getUser)
AdminRoute.post("/delete/:id",isAdmin,deleteUser)

module.exports = AdminRoute