import { Router } from 'express';
import { House, IHouse } from '../models/house';

const router = Router();

// Get all houses
router.get('/', async (req, res) => {
    try {
        const houses = await House.find().populate('owner');
        res.json(houses);
    } catch (error) {
        res.status(500).json({ error: error});
    }
});

// Get a single house by ID
router.get('/:id', async (req, res) => {
    try {
        const house = await House.findById(req.params.id).populate('owner');
        if (!house) {
            return res.status(404).json({ message: 'House not found' });
        }
        res.json(house);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Create a new house
router.post('/', async (req, res) => {
    try {
        const newHouse: IHouse = new House(req.body);
        await newHouse.save();
        res.status(201).json(newHouse);
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

// Update a house by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedHouse = await House.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedHouse) {
            return res.status(404).json({ message: 'House not found' });
        }
        res.json(updatedHouse);
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

// Delete a house by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedHouse = await House.findByIdAndDelete(req.params.id);
        if (!deletedHouse) {
            return res.status(404).json({ message: 'House not found' });
        }
        res.json({ message: 'House deleted' });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

export default router;
