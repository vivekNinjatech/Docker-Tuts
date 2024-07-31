import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import Task from '../models/task';

const router = Router();

const taskValidationRules = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('completed').isBoolean().withMessage('Completed must be a boolean'),
];

// Get all tasks
router.get('/', async (req: Request, res: Response) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Get a task by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send('Task not found');
        }
        res.json(task);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new task
router.post('/', taskValidationRules, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, completed } = req.body;

    const task = new Task({
        title,
        description,
        completed: completed ?? false,
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Update a task by ID
router.put('/:id', taskValidationRules, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send('Task not found');
        }

        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.completed = req.body.completed ?? task.completed;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a task by ID
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send('Task not found');
        }

        await task.deleteOne();
        res.status(204).send(`Task with id ${req.params.id} deleted`);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Delete all tasks
router.delete('/purge/:key', async (req: Request, res: Response) => {
    try {
        if (req.params.key === "PURGE") {
            const tasks = (await Task.find()).length;
            console.log(tasks);
            if (tasks <= 0) {
                return res.status(404).send('no tasks to purge');
            }
            await Task.deleteMany();
            return res.status(204).send(`purged ${tasks} tasks`);
        }else{
            return res.status(404).send('invalid key');
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
