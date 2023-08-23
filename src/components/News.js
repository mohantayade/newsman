import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
 

export class News extends Component {
  static defaultProps ={
    country : 'in',
    pageSize : 6 ,
    category : 'general'
  }
  static propTypes ={
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading : false,
      page : 1   }
      document.title = this.props.category;
    }
// functions ----------------------------------------------------------------------------


  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1a39dc8ab9154c31aa3863f3286758de&page=1&pageSize=${this.props.pageSize}`
    this.setState({loading:true});
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({ articles: parseData.articles ,
       totalResults: parseData.totalResults,
       loading:false});
  }



    HandlePrevClick = async ()=>{
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1a39dc8ab9154c31aa3863f3286758de&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
      this.setState({loading:true});
     let data = await fetch(url);
     let parseData = await data.json();
     console.log(parseData);

      this.setState({
        page : this.state.page - 1,
        articles: parseData.articles,
        loading:false
      })

    }
    HandleNextClick = async ()=>{
      if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1a39dc8ab9154c31aa3863f3286758de&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
        this.setState({loading:true});
     let data = await fetch(url);
     let parseData = await data.json();
     





      this.setState({
        page : this.state.page + 1,
        articles: parseData.articles,
        loading:false
      })
      }

      
    }

// main render window ----------------------------------------------------------------------
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin: '40px 0px' }}>NewsMan - Top {this.props.category} Headlines</h1>
        {this.state.loading && <Spinner/>}
          <div className="row">
             {!this.state.loading && this.state.articles.map((element) => (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imageurl={element.urlToImage}
                    newsurl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                   />
             </div>
          ))}
        </div>
            <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.HandlePrevClick}>&larr; previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.HandleNextClick}>next &rarr;</button>
            </div>

      </div>
    )
  }
}

export default News;
