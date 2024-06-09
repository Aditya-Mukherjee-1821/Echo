const palette = {
  primary: {
    dark: '#22272E',
    selected: '#394049',
    text: '#FFFFFF',
    ok: '#1976D2',
    sender: '#0097a7',
    receiver: '#00796b',
    time: '#bdbdbd',
    error: '#C0372F',
    success: '#4caf50',
  },
  secondary: {
    dark: '#1C2128',
    text: '#808080',
  },
};

const randomColourGenerator = (n) => {
  const colors = [
    '#757575',
    '#FF5722',
    '#673AB7',
    '#085C25',
    '#1F6CFA',
    '#FD7E97',
  ];
  return colors[n % colors.length];
};

export { palette, randomColourGenerator };
