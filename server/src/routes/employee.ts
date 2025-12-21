import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { 
    addEmployee, 
    upload, 
    getEmployees, 
    getEmployee, 
    updateEmployee, 
    deleteEmployee
} from '../controllers/employeeController';

const router = express.Router();

router.get('/', protect, getEmployees);
router.post('/add', protect, upload.single('image'), addEmployee);
router.get('/:id', protect, getEmployee);
router.put('/:id', protect, updateEmployee);
router.delete('/:id', protect, deleteEmployee);

export default router;