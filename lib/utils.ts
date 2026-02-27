export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Helper to get correct image path for both dev and production
export function getImagePath(path: string): string {
  const basePath = process.env.NODE_ENV === 'production' ? '/careers-business-resource' : '';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
}
