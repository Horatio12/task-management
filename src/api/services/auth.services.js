const AdminModel = require('../models/admin.model')
const {decryptPassword} = require('../utils/password.helper')
const jwt = require('jsonwebtoken')
const getByEmail = async (email) => {
    const admin = AdminModel.findOne({email});
    return admin 
}

const getByUsername = async (username) => {
    const admin = AdminModel.findOne({username});
    return admin 
}
const generateToken = (id, email) => {
    const token = jwt.sign({id, email}, process.env.JWT_SECRET, {
      expiresIn:'2min'  
    })
    return token
}

const login = async (data) => {
    const admin = await getByEmail(data.email);
    if(!admin){
        throw new Error('Email or password incorrect')
    }
    if  (!decryptPassword(admin.password, data.email)){
        throw new Error('Email or password incorrect')
    }
    const token = generateToken(admin._id, admin.email)
    return {admin, token}
}

const register = async (data) => {
    const emailExist = await getByEmail(data.email);
    const usernameExist = await getByUsername(data.username);
    if (emailExist){
        throw new Error('Email already exists')
    }
    if (usernameExist){
        throw new Error('Username already exists')
    }
    const admin = await AdminModel.create(data);
    return admin
}


// Forgot Password functionality
const forgotPassword = async (data) => {
    const admin = await getByEmail(data.email);
    if (!admin) {
        throw new Error('No account found with this email');
    }

    const resetToken = generateResetToken();
    admin.resetPasswordToken = resetToken;
    admin.resetPasswordExpires = Date.now() + 3600000; 

    await admin.save();

    await sendResetPasswordEmail(data.email, resetToken);

    return { message: 'Reset password link sent to your email' };
};

// Reset Password functionality
const resetPassword = async (data) => {
    const admin = await AdminModel.findOne({
        resetPasswordToken: data.token,
        resetPasswordExpires: { $gt: Date.now() }, 
    });

    if (!admin) {
        throw new Error('Invalid or expired reset token');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    admin.password = hashedPassword;
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpires = undefined;

    await admin.save();

    return { message: 'Password has been successfully reset' };
};
 const getMe = async(data) => {
    const admin = await getByEmail(data.email);
    if(!admin) {
        throw new Error ('Admin not found')
    }
    return admin
 }

module.exports = {
    login,
    register,
    forgotPassword,
    resetPassword,
    getMe,
};
