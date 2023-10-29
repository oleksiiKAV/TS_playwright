import * as fs from 'fs/promises';
import path from "path";

export async function readUserData(userKey: string): Promise<any> {
  const userDataPath = path.join(__dirname, "../test-data/", "signUp.json"
  );
  try {
    const data = await fs.readFile(userDataPath, 'utf8');
    const jsonData = JSON.parse(data);
    return jsonData[userKey];
  } catch (error) {
    console.error('Error reading JSON file:', error);
    return null;
  }
}