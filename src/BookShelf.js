import React from 'react'
import Book from './Book.js'
import PropTypes from 'prop-types'

class BookShelf extends React.Component {
  static PropTypes = {
    addBookTo: PropTypes.func.isRequired,
    allBooks: PropTypes.array.isRequired,
    book: PropTypes.object.isRequired,
    shelf: PropTypes.object.isRequired
  }

  render() {
    const { addBookTo, books, allBooks } = this.props /** destructuring props */
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.data.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            /** simple indication if there are no books on a given shelf */
            {books.length === 0 &&
              <div>This shelf is empty</div>
            }
            /** display books */
            {books.map((book) =>
              <Book key={book.id} book={book} allBooks={allBooks} addBookTo={addBookTo}/>
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
