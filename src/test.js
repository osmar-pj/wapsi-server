const getWeekNumber = (date) => {
  const currentDate = date ? new Date(date) : new Date();
  const year = currentDate.getFullYear();
  const yearStart = new Date(year, 0, 1); // 1 de enero

  // Establecer el inicio del año al primer jueves a las 7:00 AM
  yearStart.setHours(7, 0, 0, 0);
  yearStart.setDate(yearStart.getDate() + (11 - yearStart.getDay()) % 7);

  if (yearStart > currentDate) {
    yearStart.setFullYear(year - 1);
    yearStart.setDate(yearStart.getDate() - 7);
  }

  const diffMilliseconds = currentDate - yearStart;
  const diffDays = Math.floor(diffMilliseconds / (1000 * 60 * 60 * 24));
  const weekNumber = Math.floor(diffDays / 7) + 1;
  return weekNumber;
}

const week = getWeekNumber('2023-01-04 00:00:00')
const week2 = getWeekNumber('2023-01-05 00:00:00')
const week3 = getWeekNumber('2023-01-11 07:00:00')
const week4 = getWeekNumber('2023-11-21 11:00:00')
const week5 = getWeekNumber('2023-11-22 07:00:00')
const week6 = getWeekNumber('2023-11-23 06:00:00')
const week7 = getWeekNumber('2023-11-23 08:00:00')

console.log(week, week2, week3, week4, week5, week6, week7)

const data = [ 
  {
    tag: 'BXJ-319',
      data: [{
        place: 'comedor',
        value: 2,
        perc: 12
      },
      {
        place: 'echadero',
        value: 4,
        perc: 24
      }
    ]
  },
  {
    tag: 'BXJ-345',
      data: [{
        place: 'comedor',
        value: 2,
        perc: 34
      },
      {
        place: 'echadero',
        value: 4,
        perc: 1
      }
    ]
  }
]