import React from "react";
import ReactDOM from "react-dom";
import AuthorQiuz from "./AuthorQuiz";
import Enzyme, { mount, swallow, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

const state = {
  turnData: {
    books: [
      "the Adventure of UI/UX design",
      "corel draw novice to Ninja",
      " advance excel",
    ],
    author: {
      name: "David Bookmus",
      imageUrl: "images/authors/him1.jpg",
      imageSource: "wikimedia commons",
      books: [
        "the Adventure of UI/UX design",
        "corel draw novice to Ninja",
        " level up figma fundamentals",
      ],
    },
  },
  highlight: "none",
};

describe("author quiz", () => {
  it("render without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={() => {}} />, div);
  });
  describe("when no answer has been selected", () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<AuthorQiuz {...state} onAnswerSelected={() => {}} />);
    });
    it("should have no background color", () => {
      expect(wrapper.find("div.row.turn"));
    });
  });
});
