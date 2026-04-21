export const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
export const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const DEFAULT_DATA = {
  days: DAY_NAMES.map((name, i) => ({
    id: i,
    name,
    category: i === 0 ? 'UPPER' : i === 3 ? 'LOWER' : '',
    isRest: i === 2 || i === 6,
    exercises: i === 0 ? [
      {
        id: 1, name: 'Jalón al pecho en polea',
        pr: [10, 10, 9],
        sets: [
          { id: 1, reps: 10, weight: 18 },
          { id: 2, reps: 10, weight: 18 },
          { id: 3, reps: 9, weight: 20.3 },
        ],
      },
      {
        id: 2, name: 'Press con mancuernas inclinado',
        pr: [12, 12, 10],
        sets: [
          { id: 1, reps: 12, weight: 6 },
          { id: 2, reps: 12, weight: 8 },
          { id: 3, reps: 10, weight: 8 },
        ],
      },
      {
        id: 3, name: 'Curl de bíceps con mancuernas',
        pr: [10],
        sets: [{ id: 1, reps: 10, weight: 3 }],
      },
    ] : i === 3 ? [
      {
        id: 4, name: 'Sentadilla con barra',
        pr: [8, 8, 6],
        sets: [
          { id: 1, reps: 8, weight: 60 },
          { id: 2, reps: 8, weight: 65 },
          { id: 3, reps: 6, weight: 70 },
        ],
      },
      {
        id: 5, name: 'Prensa de pierna',
        pr: [12, 10],
        sets: [
          { id: 1, reps: 12, weight: 80 },
          { id: 2, reps: 10, weight: 90 },
        ],
      },
    ] : [],
  })),
};
