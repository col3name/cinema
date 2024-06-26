const router = require("express").Router();
const { cinemas, movies, reviews } = require("./mock");
const { reply, getById } = require("./utils");

router.get("/cinemas", (req, res) => {
  reply(res, cinemas);
});

router.get("/movies", (req, res) => {
  const { cinemaId } = req.query;
  let result = movies;

  if (cinemaId) {
    const cinema = getById(cinemas)(cinemaId);

    if (cinema) {
      result = cinema.movieIds.map(getById(result));
    }
  }

  reply(res, result);
});

router.get("/movie", (req, res) => {
  const { movieId } = req.query;
  let result = null;

  if (movieId) {
    result = getById(movies)(movieId);
  }

  reply(res, result);
});

router.get("/reviews", (req, res) => {
  const { movieId } = req.query;

  console.log({movieId})
  let result = reviews;

  if (movieId) {
    const movie = getById(movies)(movieId);
    if (movie) {
      result = movie.reviewIds.map(getById(result));
    }
  }

  reply(res, result);
});

module.exports = router;
