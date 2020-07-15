export const getRandomDiceRoll = (): [number, number] => {
  return [getRandomIntBetween(1, 6), getRandomIntBetween(1, 6)];
};

export const sumRoll = (diceRoll: [number, number]): number =>
  diceRoll.reduce((a, b) => a + b, 0);

const getRandomIntBetween = (min: number, max: number): number => {
  const difference = max - min + 1;
  return Math.ceil(Math.random() * difference);
};
