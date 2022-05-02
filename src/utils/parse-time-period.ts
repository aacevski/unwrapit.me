const parseTimePeriod = (timePeriod: string) => {
  switch (timePeriod) {
    case 'short_term':
      return 'Short Term';
    case 'medium_term':
      return 'Medium Term';
    case 'long_term':
      return 'Long Term';
  }
};

export default parseTimePeriod;
