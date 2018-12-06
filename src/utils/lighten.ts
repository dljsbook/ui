const lighten = (color: string, amount: number) => {
  const [
    h,
    s,
    l,
  ] = color.split(',');
  return `hsl(${h}, ${s}%, ${parseInt(l, 10) + amount}%)`;
};

export default lighten;
