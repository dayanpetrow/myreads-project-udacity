import React from 'react'
import Book from './Book.js'
import PropTypes from 'prop-types'

class BookShelf extends React.Component {
  static propTypes = {
    addBookTo: PropTypes.func.isRequired,
    allBooks: PropTypes.array.isRequired,
    books: PropTypes.array.isRequired,
    data: PropTypes.object.isRequired
  }

  render() {
    const { addBookTo, books, allBooks } = this.props /** destructuring props */
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.data.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">

            {books.length === 0 &&
              <div>This shelf is empty</div>
            }

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
