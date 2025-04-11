const {login, register, getMe} = require('../controllers/auth.controllers')
const express = require("express");
const router = express.Router();
const {loginSchema, registerSchema} = require ("../validations/auth.validation")
const validate = require("../middlewares/validate")
const{requireAuth} = require ("../middlewares/authMiddleware")

router.post("/login", validate(loginSchema), login)
router.post("/register",validate(registerSchema), register)
router.get("/me", requireAuth , getMe)

module.exports= router;