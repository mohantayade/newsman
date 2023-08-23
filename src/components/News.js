import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
    document.title = this.props.category;
  }
  // functions ----------------------------------------------------------------------------
  async updateNews(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1a39dc8ab9154c31aa3863f3286758de&page=1&pageSize=${this.props.pageSize}`
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
     
    });

  }

  async componentDidMount() {
    this.updateNews();
  }



  // HandlePrevClick = async () => {
  //   this.setState({page : this.state.page - 1 });
  //   this.updateNews();
  // }
  // HandleNextClick = async () => {
  //   this.setState({page : this.state.page + 1});
  //     this.updateNews();
  // }


  fetchMoreData = async () => {
    const nextPage = this.state.page + 1; // Increment the page counter
  
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1a39dc8ab9154c31aa3863f3286758de&page=${nextPage}&pageSize=${this.props.pageSize}`;
  
    this.setState({ loading: true });
  
    try {
      const data = await fetch(url);
      const parseData = await data.json();
  
      this.setState((prevState) => ({
        articles: prevState.articles.concat(parseData.articles),
        totalResults: parseData.totalResults,
        loading: false,
        page: nextPage, // Update the page state
      }));
    } catch (error) {
      console.error("Error fetching more data:", error);
      this.setState({ loading: false });
    }
  };
  // main render window ----------------------------------------------------------------------
  render() {
    return (
      <>
      
        <h1 className="text-center" style={{ margin: '40px 0px' }}>NewsMan - Top {this.props.category} Headlines</h1>
        
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row">
            {this.state.articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title :""}
                  description={element.description ? element.description :""}
                  imageurl={element.urlToImage}
                  newsurl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
          </div>
          </div>

        </InfiniteScroll>
      
      </>
    )
  }
}

export default News;
