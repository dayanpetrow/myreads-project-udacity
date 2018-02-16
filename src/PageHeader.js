import React from 'react'
import { Link } from 'react-router-dom'

class PageHeader extends React.Component {
  render() {
    return (
      <div className="list-books-title">
        <h1>MyReads</h1>
        <div className="header-links">
          <Link to='/'>All books</Link>
          <Link to='/reading'>Currently reading</Link>
          <Link to='/toread'>Want to read</Link>
          <Link to='/haveread'>Already read</Link>
        </div>
      </div>
    )
  }
}

export default PageHeader
