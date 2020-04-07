import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AuthorQuiz from "./AuthorQuiz";
import * as serviceWorker from "./serviceWorker";
import { shuffle, sample } from "underscore";

const authors = [
  {
    name: "David Bookmus",
    imageUrl: "images/authors/him1.jpg",
    imageSource: "wikimedia commons",
    books: [
      "the Adventure of UI/UX design",
      "corel draw novice to Ninja",
      " level up figma fundamentals",
    ],
  },
  {
    name: "Abiodun Suleiman",
    imageUrl: "images/authors/him2.jpg",
    imageSource: "wikimedia commons",
    books: [
      "React Native from zero to hero",
      " Advance Javascript ",
      "life of a fullstack Developer",
    ],
  },
  {
    name: "Victor David",
    imageUrl: "images/authors/groomsmen-1.jpg",
    imageSource: "wikimedia commons",
    books: [
      "the Adventure of React js",
      "Javascript novice to Ninja",
      "CSS and Html for all",
    ],
  },
  {
    name: "Franklin Ekpe",
    imageUrl: "images/authors/groomsmen-2.jpg",
    imageSource: "wikimedia commons",
    books: [
      "advance Excel ",
      "Javascript novice to Ninja",
      "Laravel fundamentals",
    ],
  },
  {
    name: "Bidemi Ani",
    imageUrl: "images/authors/groomsmen-3.jpg",
    imageSource: "wikimedia commons",
    books: [
      "getting stated with node js",
      "HTML novice to Ninja",
      "life on the gwagwalada",
    ],
  },
  {
    name: "Joseph Conrad",
    imageUrl: "images/authors/groomsmen-4.jpg",
    imageSource: "wikimedia commons",
    books: ["family reunion", "react novice to Ninja", "heart of Darkness"],
  },
];
function getTurnData(authors) {
  const allBooks = authors.reduce(function (p, c, i) {
    return p.concat(c.books);
  }, []);
  const fourRandomBooks = shuffle(allBooks).slice(0, 4);
  const answer = sample(fourRandomBooks);
  return {
    books: fourRandomBooks,
    author: authors.find((author) =>
      author.books.some((title) => title === answer)
    ),
  };
}
const state = {
  turnData: getTurnData(authors),
  highlight: "",
};
function onAnswerSelected(answer) {
  const isCorrect = state.turnData.author.books.some((book) => book === answer);
  state.highlight = isCorrect ? "correct" : "wrong";
  render();
}
function render() {
  ReactDOM.render(
    <React.StrictMode>
      <AuthorQuiz {...state} onAnswerSelected={onAnswerSelected} />
    </React.StrictMode>,
    document.getElementById("root")
  );
}
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
