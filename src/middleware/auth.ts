import { Request, Response, NextFunction } from 'express';
import { IUser, UserRole, User } from '../models/user';

export interface AuthenticatedRequest extends Request {
    user?: IUser;
}

export const loadUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userId = req.header('userId'); // Se supone que el ID del usuario se pasa en el encabezado para este ejemplo

    if (!userId) {
        return res.status(400).json({ message: 'UserId header is required' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const authorize = (roles: UserRole[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (!roles.includes(user.role)) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        next();
    };
};
