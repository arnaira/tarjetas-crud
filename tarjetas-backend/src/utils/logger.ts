import * as fs from 'fs';
import * as path from 'path';

export function logToFile(data: any) {
  const logPath = path.join(__dirname, '../../logs/activity.log');

  // Convertir el objeto en JSON + salto de línea
  const logLine = JSON.stringify(data) + '\n';

  // Crear carpeta logs si no existe
  if (!fs.existsSync(path.dirname(logPath))) {
    fs.mkdirSync(path.dirname(logPath));
  }

  // Escribir o append
  fs.appendFileSync(logPath, logLine, 'utf8');
}
