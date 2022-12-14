import { exec } from 'child_process';
import { join } from 'path';

export async function checkBadWord(comment: string): Promise<boolean> {
  let checkBadWordScriptPath = join(process.cwd(), '/src/infra/py');

  let { stdout } = await exec(`python model.py ${comment}`, {
    cwd: checkBadWordScriptPath,
  });
  return new Promise((resolve) => {
    stdout.on('data', (data) => {
      let isBad = data.toString().toUpperCase().includes('1.0');
      resolve(isBad);
    });
  });
}
