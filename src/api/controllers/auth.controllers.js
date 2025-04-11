const authService = require('../services/auth.services');

//Post login

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authService.register(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(401).json({message:error.message});
    }
}

//POST Register

const register = async (req, res) => {
    try {
        const result = await authService.register(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

//POST forget password

const forgotPassword = async (req, res) => {
    try {
        const result = await authService.forgotPassword(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({message:error.message});
    } 
}       
//POST Reset password

const resetPassword = async (req, res) => {
    try {
        const result = await authService.resetPassword(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({message:error.message});
    } 
}    

const getMe = async (req, res) => {
    try {
        const result = await authService.getMe(req.user);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message:error.message });
    } 
}
module.exports = {login, resetPassword, forgotPassword, register, getMe}