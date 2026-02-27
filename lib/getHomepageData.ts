import fs from 'fs';
import path from 'path';

export function getHomepageData() {
    const filePath = path.join(process.cwd(), 'data/content/homepage.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
}
