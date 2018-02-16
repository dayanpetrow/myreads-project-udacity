import React from 'react'
import SelectShelf from './SelectShelf.js'
import PropTypes from 'prop-types'

class Book extends React.Component {
  static PropTypes = {
    addBookTo: PropTypes.func.isRequired,
    allBooks: PropTypes.array.isRequired,
    book: PropTypes.object.isRequired
  }

  render() {
    /** destructuring */
    const { book, addBookTo, allBooks } = this.props

    /** check if the book to be displayed has a cover */
    const cover = book.hasOwnProperty('imageLinks')? book.imageLinks.thumbnail : ""
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 192,
              backgroundImage: 'url(' + cover + ')' }}></div>
            <SelectShelf book={book} addBookTo={addBookTo} allBooks={allBooks} />
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">
            {book.authors && book.authors.map((author, index) =>
              <div key={index}>{author}</div>
            )}
          </div>
        </div>
      </li>
    )
  }
}

export default Book
