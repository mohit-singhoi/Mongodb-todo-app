import express from 'express';

import {createTodo,deleteTodo,updateTodo,allTodos } from '../controllers/todo.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.post('/create',authMiddleware, createTodo);
router.delete('/delete/:id',authMiddleware, deleteTodo);
router.put('/update/:id',authMiddleware, updateTodo);
router.get('/all-todos',authMiddleware, allTodos);



export default router;