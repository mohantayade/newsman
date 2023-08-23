import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let { title, description, imageurl, newsurl, author, date, source } = this.props;

    return (
      <div>
        <div className="card">
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: '10%', zIndex: '1' }}>
            {source}
            <span className="visually-hidden">unread messages</span>
          </span>
          <img src={!imageurl ? 'https://images.moneycontrol.com/static-mcnews/2023/06/markets-up-770x433.jpg' : imageurl} className="card-img-top" alt="..." />
          <div className="card-body">

            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsurl} target='_blank' className="btn btn-primary btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
