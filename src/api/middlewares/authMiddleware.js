const AdminModel = require('../models/admin.model')
const jwt = require('jsonwebtoken')

const requireAuth = async (req, res) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.starsWith('Bearer')) {
        token = req.haders.authorization.split('')[1];
        if(!token) {
            return res.status(401).json({message:'Unauthorized'});
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded ;
             next();
        }catch(error) {
            return res.status(401).json({message:'Unauthorized'});
        }
    }
    else {
       return res.status(401).json({message:' Unauthorized'});
    }
}   

module.exports = {
    requireAuth
}