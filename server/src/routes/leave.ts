import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { addLeave, getLeaveDetail, getLeaves, updateLeaveStatus } from '../controllers/leaveController';

const router = express.Router();

router.post('/add', protect, addLeave);
router.get('/', protect, getLeaves); // Get All
router.get('/:id', protect, getLeaveDetail); // Get Detail
router.get('/emp/:id', protect, getLeaves); // Get by Employee ID
router.put('/:id', protect, updateLeaveStatus);

export default router;