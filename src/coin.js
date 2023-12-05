module.exports = {
  coin: () => {
    const fatum = Math.random();
    if (fatum >= 0.5) return "орел";
    return "решка";
  },
};
