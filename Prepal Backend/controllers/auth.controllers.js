import User from '../models/user.models.js';
import { 
  sendVerificationEmail, 
  sendWelcomeEmail, 
  sendPasswordResetEmail, 
  sendResetSuccessEmail 
} from '../mailtrap/emails.js';
import crypto from 'crypto';

export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'All fields are mandatory' });
    }

    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Generate verification token (OTP)
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    // Create the user with the verification token and expiry set to 24 hours from now
    const user = await User.create({
      name,
      email,
      password,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
    });

    const token = await user.generateToken();

    // Fire and forget sending the verification email
    sendVerificationEmail(user.email, verificationToken)
      .catch(err => console.error("Verification Email Error:", err));

    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      user: { ...user._doc, password: undefined }
    });
  } catch (error) {
    console.log('Error', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired verification code' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    await user.save();

    // Fire and forget welcome email
    sendWelcomeEmail(user.email, user.name)
      .catch(err => console.error("Welcome Email Error:", err));

    res.status(200).json({ success: true, message: 'Code verified successfully' });
  } catch (error) {
    console.error('Error', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const token = await user.generateToken();

    res.cookie('login_cookie', token);

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({ success: true, message: 'User logged in' });
  } catch (error) {
    console.error('Error', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const logout = async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ success: true, message: 'Logged out' });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    // Generate token for password reset
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    // Fire and forget sending the password reset email
    sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`)
      .catch(err => console.error("Password Reset Email Error:", err));
      
    console.log(`${process.env.CLIENT_URL}/reset-password/${resetToken}`);
    res.status(200).json({ success: true, message: 'Password reset link sent to your email' });
  } catch (error) {
    console.error('Error', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(200).json({ success: false, message: 'Invalid or expired reset token' });
    }

    // Update the password and clear reset token fields
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    await user.save();

    // Fire and forget sending the reset success email
    sendResetSuccessEmail(user.email)
      .catch(err => console.error("Reset Success Email Error:", err));

    res.status(200).json({ success: true, message: 'Password reset success', user });
  } catch (error) {
    console.error('Error', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.error('Error', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};