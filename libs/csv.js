import { readFile, writeFile } from 'fs/promises';

const parseCsvLine = (csvLine) => csvLine.split(',').map((value) => value.trim());

const parseCsv = (csv) => {
  const lines = csv.split(/[\r\n]+/).filter((line) => line);
  const [headers, ...content] = lines.map(parseCsvLine);

  return content.map((row) => headers.reduce((acc, key, i) => ({ ...acc, [key]: row[i] }), {}));
};

const generateCsv = (data) => {
  const headers = Object.keys(data[0]);
  const content = data.map((row) => headers.map((key) => row[key]).join(','));

  return [headers.join(','), ...content, ''].join('\n');
};

const readCsv = async (file) => {
  try {
    const csv = await readFile(file, 'utf8');

    return parseCsv(csv);
  } catch (error) {
    throw error;
  }
};

const writeCsv = async (file, data) => {
  const csv = generateCsv(data);

  try {
    return writeFile(file, csv, 'utf8');
  } catch (error) {
    throw error;
  }
};

export { parseCsv, generateCsv, readCsv, writeCsv };
