// Exercise 1: Get the array of all directors.
function getAllDirectors(movies) {
  let result = movies.map((movie) => movie.director); //map returns a new array
  console.log('EXERCICE 1 ->', result, typeof result);
  return result;
}

// Exercise 2: Get the films of a certain director
function getMoviesFromDirector(movies, director) {
  //should return a new array, not update the original one

  let newArray = [...movies];
  let fromDirector = newArray.filter((movie) => movie.director === director);

  return fromDirector;
}

// Exercise 3: Calculate the average of the films of a given director.
function toTwoDecimal(number) {
  if (Number.isInteger(number)) {
    return parseFloat(Math.trunc(number));
  } else {
    return parseFloat(Number(number).toFixed(2));
  }
}

function moviesAverageOfDirector(movies, director) {
  let movieArray = getMoviesFromDirector(movies, director);
  let totalScores = [...movieArray].reduce((acc, item) => acc + item.score, 0);
  totalScores = parseFloat(totalScores / movieArray.length).toFixed(2);

  console.log('EXERCICE 3 ->', totalScores);
  return toTwoDecimal(totalScores);
}

// Exercise 4:  Alphabetic order by title
function orderAlphabetically(movies) {
  //should only return the title of the movies, each value should be a string
  let movieTitlesArray = [...movies].reduce((acc, { title }) => {
    acc.push({ title });
    return acc;
  }, []); 

  //Alphabetic order by title
  let sortedMovieTitles = movieTitlesArray.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  }); 

  //max array.length = 20
  if (sortedMovieTitles.length >= 20) {
    sortedMovieTitles.length = 20;
  }
  console.log('EXERCICE 4 ->', typeof sortedMovieTitles[0]); //element == string

  return sortedMovieTitles.map(({ title }) => title);
}

// OK Exercise 5: Order by year, ascending
function orderByYear(movies) {
  let sortedByYear = [...movies].sort((a, b) => {
    if (a.year < b.year) {
      return -1;
    }
    if (a.year > b.year) {
      return 1;
    }
    if (a.year == b.year) {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    }
  });
  console.log('EXERCICE 5 ->', sortedByYear);

  return sortedByYear;
}

// Exercise 6: Calculate the average of the movies in a category
function moviesAverageByCategory(movies, genre) {
  let movieArray = [...movies].filter((movie) => movie.genre.includes(genre));
  let onlyScore = movieArray.filter((movie) => movie.score); //this filter will only return items that return true to the statement
  let totalScores = onlyScore.reduce((acc, item) => acc + item.score, 0);
  totalScores = totalScores / onlyScore.length;

  return toTwoDecimal(totalScores);
}

// Exercise 7: Modify the duration of movies to minutes
function formatDuration(duration) {
  const [hours, minutes] = duration
    .split(' ') //removes space between hours and minutes [2h 34min]
    .map((item) => //gets only characters matching 0-9 [2h, 34min]
    item.match(/[0-9]/g) //g for global (all matching characters, not just first found) ['2', ['3','4']]
    .join('')); //joins charactes in every position of the array

    return hours * 60 + minutes;
}

function hoursToMinutes(movies) {
    return [...movies].map(movie => {
      return {
        ...movie, //nuevo OBJETO que esparce todo los campos
        duration: formatDuration(duration)
      };
    })
}

// Exercise 8: Get the best film of a year
function bestFilmOfYear(movies, year) {
  const moviesByYear = [...movies].filter(movie => movie.year === year);
  return moviesByYear.sort((a, b) => b.score - a.score)[0];
}

// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    getMoviesFromDirector,
    moviesAverageOfDirector,
    orderAlphabetically,
    orderByYear,
    moviesAverageByCategory,
    hoursToMinutes,
    bestFilmOfYear
  };
}

console.log(
  moviesAverageOfDirector(
    [
      {
        title: 'Paths of Glory',
        year: 1957,
        director: 'Stanley Kubrick',
        duration: '1h 28min',
        genre: ['Drama', 'War'],
        score: 8.4
      },
      {
        title: 'Django Unchained',
        year: 2012,
        director: 'Quentin Tarantino',
        duration: '2h 45min',
        genre: ['Drama', 'Western'],
        score: 8.4
      },
      {
        title: 'Pulp Fiction',
        year: 1994,
        director: 'Quentin Tarantino',
        duration: '2h 34min',
        genre: ['Crime', 'Drama'],
        score: 8.9
      }
    ],
    'Quentin Tarantino'
  )
);
