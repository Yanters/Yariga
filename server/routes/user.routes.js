import experss from 'express';

import {
  getAllUsers,
  createUser,
  getUserInfoById,
} from '../controllers/user.controller.js';

const router = experss.Router();

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUserInfoById);

export default router;
