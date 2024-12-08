import crypto from 'crypto';

export function generateUniqueCode(length: number = 24): string {
  // Generate a random string of the specified length using crypto
  return crypto.randomBytes(length).toString('hex').substring(0, length);
}
