import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { 
    addDepartment, 
    getDepartments, 
    getDepartment, 
    updateDepartment, 
    deleteDepartment 
} from '../controllers/departmentController';

const router = express.Router();

// Get all & Add new
router.get('/', protect, getDepartments);
router.post('/add', protect, addDepartment);

// Single object operations
router.get('/:id', protect, getDepartment);
router.put('/:id', protect, updateDepartment);
router.delete('/:id', protect, deleteDepartment);

export default router;