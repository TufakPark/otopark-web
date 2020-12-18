import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import auth from '../../../middleware/auth';

// Importing User Model
import User from '../../../models/User';


const router = Router();

/**
 * @route   GET api/v1/auth
 * @desc    Login user
 * @access  Public
 */
router.post('/login', async function(req, res) {
    const JWT_SECRET = process.env.JWT_SECRET;

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw Error('User does not exist');
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw Error('Invalid credentials');
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 3600 });
        if (!token) {
            throw Error('Couldnt sign the token');
        }

        res.status(200).json({
            token,
                user: {
                id: user._id,
                email: user.email
            }
        });

      } catch (e) {
        res.status(400).json({ msg: e.message });
      }
});

/**
 * @route   POST api/v1/auth
 * @desc    Register new user
 * @access  Public
 */
router.post('/register', async function(req, res) {
    const JWT_SECRET = process.env.JWT_SECRET;
    
    const { email, password, password_check } = req.body;
  
    // Simple validation
    if (!email || !password || !password_check) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    if (password !== password_check) {
        return res.status(400).json({ msg: 'Please enter same password' });
    }
  
    try {
        const user = await User.findOne({ email });
        if (user) {
            throw Error('User already exists');
        }

        const salt = await bcrypt.genSalt(10);
        if (!salt) {
            throw Error('Something went wrong with bcrypt');
        }

        const hash = await bcrypt.hash(password, salt);
        if (!hash) {
            throw Error('Something went wrong hashing the password');
        }

        const newUser = new User({
            email,
            password: hash
        });
  
        const savedUser = await newUser.save();
        if (!savedUser) {
            throw Error('Something went wrong saving the user');
        }

        const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, {
            expiresIn: 3600
        });
  
        res.status(200).json({
            token,
            user: {
                id: savedUser.id,
                email: savedUser.email
            }
        });

    } catch (e) {
        res.status(400).json({ error: e.message });
    }
  });

/**
 * @route   GET api/v1/auth/
 * @desc    Get user data
 * @access  Private
 */
router.get('/user', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            throw Error('User does not exist');
        }

        res.json(user);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});

export default router;