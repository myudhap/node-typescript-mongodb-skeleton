import { Request, Response, Router } from 'express';

const router = Router();

// Add Route
router.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Welcome'
    });
});

export default router;