import React from "react";
import "./AddAuthorForm.css";
import { render } from "enzyme";

class AuthorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageUrl: "",
      books: [],
    };
    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddBook = this.handleAddBook.bind(this);
  }

  onFieldChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.onAddAuthor(this.state);
  }
  handleAddBook(event) {
    this.setState({
      book: this.state.books.concat([this.state.bookTemp]),
      bookTemp: "",
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="AddAuthorForm_input">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.onFieldChange}
          />
        </div>
        <div className="AddAuthorForm_input">
          <label htmlFor="imageUrl">imageUrl</label>
          <input type="text" name="name" value={this.state.imageUrl} />
        </div>
        <div className="AddAuthorForm_input">
          {this.state.books.map((book) => (
            <p key={book}>{book}</p>
          ))}
          <label htmlFor="bookTemp">Books</label>
          <input type="text" name="bookTemp" value={this.state.bookTemp} />
          <input type="button" value="+" onClick={this.handleAddBook} />
        </div>
        <input type="submit" name="submit" value="Add" />
      </form>
    );
  }
}

function AddAuthorForm({ match, onAddAuthor }) {
  return (
    <div>
      <h1>Add Author</h1>
      <AuthorForm onAddAuthor={onAddAuthor} />
    </div>
  );
}
export default AuthorForm;
