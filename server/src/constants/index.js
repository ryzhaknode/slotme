import path from 'node:path';

export const ACCESS_TOKEN_LIFETIME = 60 * 60 * 1000;
export const REFRESH_TOKEN_LIFETIME = 30 * 24 * 3600 * 1000;

export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');
