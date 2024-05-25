import {Router} from 'express';
import {BaseUser, IBaseUser} from '../models/user';

const router = Router();

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await BaseUser.find().populate('collegiate');
        res.json(users);
    } catch (error) {
        res.status(500).json({error: error});
    }
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await BaseUser.findById(req.params.id).populate('collegiate');
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({error: error});
    }
});

// Create a new user
router.post('/', async (req, res) => {
    try {
        const newUser: IBaseUser = new BaseUser(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({error: error});
    }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await BaseUser.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true}).populate('collegiate');
        if (!updatedUser) {
            return res.status(404).json({message: 'User not found'});
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({error: error});
    }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await BaseUser.findByIdAndDelete(req.params.id).populate('collegiate');
        if (!deletedUser) {
            return res.status(404).json({message: 'User not found'});
        }
        res.json({message: 'User deleted'});
    } catch (error) {
        res.status(500).json({error: error});
    }
});

export default router;