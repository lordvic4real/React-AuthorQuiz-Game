import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import * as Redux from "redux";
import * as ReactRedux from "react-redux";
import "./index.css";
// import registerServiceWorker from "./registerServiceWorker";
import AuthorQuiz from "./AuthorQuiz";
import AddAuthorForm from "./AddAuthorForm";
import { shuffle, sample } from "underscore";

const authors = [
  {
    name: "Mark Twain",
    imageUrl: "images/authors/marktwain.jpg",
    imageSource: "Wikimedia Commons",
    books: ["The Adventures of Huckleberry Finn"],
  },
  {
    name: "Joseph Conrad",
    imageUrl: "images/authors/josephconrad.png",
    imageSource: "Wikimedia Commons",
    books: ["Heart of Darkness"],
  },
  {
    name: "J.K. Rowling",
    imageUrl: "images/authors/jkrowling.jpg",
    imageSource: "Wikimedia Commons",
    imageAttribution: "Daniel Ogren",
    books: ["Harry Potter and the Sorcerers Stone"],
  },
  {
    name: "Stephen King",
    imageUrl: "images/authors/stephenking.jpg",
    imageSource: "Wikimedia Commons",
    imageAttribution: "Pinguino",
    books: ["The Shining", "IT"],
  },
  {
    name: "Charles Dickens",
    imageUrl: "images/authors/charlesdickens.jpg",
    imageSource: "Wikimedia Commons",
    books: ["David Copperfield", "A Tale of Two Cities"],
  },
  {
    name: "William Shakespeare",
    imageUrl: "images/authors/williamshakespeare.jpg",
    imageSource: "Wikimedia Commons",
    books: ["Hamlet", "Macbeth", "Romeo and Juliet"],
  },
  {
    name: "David Bookmus",
    imageUrl: "images/authors/him1.jpg",
    imageSource: "wikimedia commons",
    books: [
      "the Adventure of UI/UX design",
      "corel draw basics",
      "  figma fundamentals",
    ],
  },
  {
    name: "Abiodun Suleiman",
    imageUrl: "images/authors/him2.jpg",
    imageSource: "wikimedia commons",
    books: [
      "React Native hero",
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

function reducer(
  state = { authors, turnData: getTurnData(authors), highlight: "" },
  action
) {
  switch (action.type) {
    case "ANSWER_SELECTED":
      const isCorrect = state.turnData.author.books.some(
        (book) => book === action.answer
      );
      return Object.assign({}, state, {
        highlight: isCorrect ? "correct" : "wrong",
      });
    case "CONTINUE":
      return Object.assign({}, state, {
        highlight: "",
        turnData: getTurnData(state.authors),
      });
    case "ADD_AUTHOR":
      return Object.assign({}, state, {
        authors: state.authors.concat([action.author]),
      });
    default:
      return state;
  }
}
let store = Redux.createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <BrowserRouter>
    <ReactRedux.Provider store={store}>
      <React.Fragment>
        <Route exact path="/" component={AuthorQuiz} />
        <Route path="/add" component={AddAuthorForm} />
      </React.Fragment>
    </ReactRedux.Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// registerServiceWorker();
