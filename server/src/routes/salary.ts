import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { addSalary, getSalary } from '../controllers/salaryController';

const router = express.Router();

router.post('/add', protect, addSalary);
router.get('/:id', protect, getSalary);

export default router;