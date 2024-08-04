import { Router } from 'express';
import { contactUs } from '../controllers/misc.controller.js';
 

const router = Router();

// {{URL}}/api/v1/
router.route('/contact').post(contactUs);

export default router;