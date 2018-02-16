import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import Search from './Search.js'
import BookShelf from './BookShelf.js'
import PageHeader from './PageHeader.js'
import SearchBtn from './SearchBtn.js'
import * as BooksAPI from './BooksAPI.js'

class BooksApp extends React.Component {
  state = {
    /** Preset information about the book shelves */
    shelves: [
      {"id":"currentlyReading", "title":"Currently Reading"},
      {"id":"wantToRead", "title":"Want to Read"},
      {"id":"read", "title":"Already Read"}
    ],
    /** contains the books which are to be displayed on the shelves */
    allBooks: []
  }

  componentDidMount() {
    /** GET all the books to be displayed on the shelves */
    BooksAPI.getAll().then((response) => {
      this.setState({ allBooks: response })
    })
  }

  /** Function for moving books between shelves
  +++ or adding a new one from the search page */
  addBookTo = (selectedBook, toShelf) => {
    BooksAPI.update(selectedBook, toShelf).then(response => {
      selectedBook.shelf = toShelf /** update the book shelf */
      let newBooks = this.state.allBooks.filter(book =>
        book.id !== selectedBook.id) /** filter out the book if present in allBooks */
      newBooks.push(selectedBook) /* push the updated book */
      this.setState({ allBooks: newBooks }) /** update the app state */
    })
  }

  render() {
    const { allBooks, shelves } = this.state /** destructuring */
    return (
      <div className="app">

          <Route path='/search' render={() => (
            <Search addBookTo={this.addBookTo} allBooks={allBooks}/>
          )}/>

          <Route exact path='/' render={() => (
            <div>
              <PageHeader/>
              {this.state.shelves.map((shelf) => {
                  const filteredBooks = allBooks.filter((book) => book.shelf === shelf.id);
                  return (
                    <BookShelf
                      key={shelf.id}
                      data={shelf}
                      allBooks={allBooks}
                      books={filteredBooks}
                      addBookTo={this.addBookTo}/>
                  )
              })}
              <SearchBtn />
            </div>
          )}/>

          <Route exact path='/reading' render={() => (
            <div>
              <PageHeader/>
              <BookShelf
                  key={shelves[0].id}
                  data={shelves[0]}
                  allBooks={allBooks}
                  books={allBooks.filter((book) => book.shelf === shelves[0].id)}
                  addBookTo={this.addBookTo}
              />
              <SearchBtn />
            </div>
          )}/>

          <Route exact path='/toread' render={() => (
            <div>
              <PageHeader/>
              <BookShelf
                  key={shelves[1].id}
                  data={shelves[1]}
                  allBooks={allBooks}
                  books={allBooks.filter((book) => book.shelf === shelves[1].id)}
                  addBookTo={this.addBookTo}
              />
              <SearchBtn />
            </div>
          )}/>

          <Route exact path='/haveread' render={() => (
            <div>
              <PageHeader/>
              <BookShelf
                  key={shelves[2].id}
                  data={shelves[2]}
                  allBooks={allBooks}
                  books={allBooks.filter((book) => book.shelf === shelves[2].id)}
                  addBookTo={this.addBookTo}
              />
              <SearchBtn />
            </div>
          )}/>


      </div>
    )
  }
}

export default BooksApp
