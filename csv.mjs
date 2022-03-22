const parse = (csv) => {
  const lines = csv.split('\n').filter((line) => line);
  const [headers, ...content] = lines.map((line) => line.split(',').map((value) => value.trim()));

  return content.map((row) => headers.reduce((acc, key, i) => ({ ...acc, [key]: row[i] }), {}));
};

const write = async (data) => {
  const headers = Object.keys(data[0]);
  const content = data.map((row) => headers.map((key) => row[key]).join(','));

  return [headers.join(','), ...content, ''].join('\n');
};

export { parse, write };
