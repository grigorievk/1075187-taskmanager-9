export const getTaskData = () => ({
  description: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ][Math.floor(Math.random() * 3)],
  dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
  repeatingDays: {
    'mo': false,
    'tu': false,
    'we': Boolean(Math.round(Math.random())),
    'th': false,
    'fr': false,
    'sa': Boolean(Math.round(Math.random())),
    'su': false,
  },
  tags: new Set([
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`,
  ]),
  color: [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`,
  ][Math.floor(Math.random() * 5)],
  isFavorite: Boolean(Math.round(Math.random())),
  isArchive: Boolean(Math.round(Math.random()))
});

/* Temporary structure for tag list while is Math.Random used */
export const generateTagList = (tags) => {
  return Array.from(tags).filter((t, i) => i === Math.floor(Math.random() * 3))
};

export const generateTaskData = (data, quant) => {
  return new Array(quant)
    .fill(``)
    .map(() => {
      const result = data();
      result.tagList = generateTagList(result.tags);
      return result;
    });
};
