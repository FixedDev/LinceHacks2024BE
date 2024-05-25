import { Router } from 'express';
import { Collegiate, ICollegiate } from '../models/collegiate';
import { loadUser, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// Middleware para cargar el usuario en la solicitud
router.use(loadUser);

// Get all collegiates
router.get('/', async (req, res) => {
    try {
        const collegiates = await Collegiate.find();
        res.json(collegiates);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Get a single collegiate by ID
router.get('/:id', async (req, res) => {
    try {
        const collegiate = await Collegiate.findById(req.params.id);
        if (!collegiate) {
            return res.status(404).json({ message: 'Collegiate not found' });
        }
        res.json(collegiate);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Create a new collegiate
router.post('/', async (req: AuthenticatedRequest, res) => {
    try {
        const newCollegiate: ICollegiate = new Collegiate(req.body);
        await newCollegiate.save();
        res.status(201).json(newCollegiate);
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

// Update a collegiate by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedCollegiate = await Collegiate.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedCollegiate) {
            return res.status(404).json({ message: 'Collegiate not found' });
        }
        res.json(updatedCollegiate);
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

// Delete a collegiate by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedCollegiate = await Collegiate.findByIdAndDelete(req.params.id);
        if (!deletedCollegiate) {
            return res.status(404).json({ message: 'Collegiate not found' });
        }
        res.json({ message: 'Collegiate deleted' });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

export default router;
