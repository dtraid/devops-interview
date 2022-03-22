import { readFile, writeFile } from 'fs/promises';

const parseCsv = (csv) => {
  const lines = csv.split('\n').filter((line) => line);
  const [headers, ...content] = lines.map((line) => line.split(',').map((value) => value.trim()));

  return content.map((row) => headers.reduce((acc, key, i) => ({ ...acc, [key]: row[i] }), {}));
};

const createCsv = (data) => {
  const headers = Object.keys(data[0]);
  const content = data.map((row) => headers.map((key) => row[key]).join(','));

  return [headers.join(','), ...content, ''].join('\n');
};

const readCsvFile = async (file) => {
  try {
    const csv = await readFile(file, 'utf8');

    return parseCsv(csv);
  } catch (error) {
    throw error;
  }
};

const writeCsvFile = async (file, data) => {
  const csv = createCsv(data);

  try {
    return writeFile(file, csv, 'utf8');
  } catch (error) {
    throw error;
  }
};

export { parseCsv, createCsv, readCsvFile, writeCsvFile };
