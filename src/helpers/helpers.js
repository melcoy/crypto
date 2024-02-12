const getDomain = (rows: Candle[]): [number, number] => {
  const values = rows.map(({high, low}) => [high, low]).flat();
  console.log('values', values);
  return [Math.min(...values), Math.max(...values)];
};

export {getDomain};
