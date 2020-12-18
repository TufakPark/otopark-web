import { Router } from 'express';

import User from '../../../models/User';

const router = Router();

/**
 * @route   GET api/v1/users
 * @desc    Getting all users
 * @access  Private
 */
router.get('/', async function(req, res){
    try {
        const users = await User.find();
        
        if (!users) {
            throw Error(`No Users Exist`);
        }

        res.json(users);

    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
});


export default router;