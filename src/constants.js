export const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
export const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const DEFAULT_DATA = {
  days: DAY_NAMES.map((name, i) => ({
    id: i,
    name,
    category: '',
    isRest: false,
    exercises: [],
  })),
};
