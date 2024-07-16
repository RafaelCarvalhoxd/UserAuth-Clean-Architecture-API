import { Response } from 'express';

export const handleError = {
  notFound: (
    res: Response,
    message: string = 'Resource not found',
  ): Response => {
    return res.status(404).json({ error: message });
  },
  unauthorized: (res: Response, message: string = 'Unauthorized'): Response => {
    return res.status(401).json({ error: message });
  },
  conflict: (res: Response, message: string = 'Conflict'): Response => {
    return res.status(409).json({ error: message });
  },
  internalServerError: (
    res: Response,
    message: string = 'Internal server error',
  ): Response => {
    return res.status(500).json({ error: message });
  },
};
