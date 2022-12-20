import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const PORT = process.env.PORT || 3000;
const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pathToStaticFolder = path.join(__dirname, 'dist');
app.use(express.static(pathToStaticFolder));

app.listen(PORT, () => console.log(`Express server is listening on port ${PORT}`));

app.get('/', (req, res) => {
  res.send(`${pathToStaticFolder}/index.html`);
});
