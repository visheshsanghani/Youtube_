import React , { Component } from 'react';
import _ from 'lodash';
import reactDom from 'react-dom';
import SearchBar from './Components/Search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './Components/video_list';
import VideoDetail from './Components/video_detail';
const youtubeAPI = 'AIzaSyA88eLD3Et33WMopJUs04mk1GEbWnx1D8o';

class App extends Component {
  constructor(props){
    super(props);
    this.state= {
    videos : [] ,
    SelectedVideo :  null
  };
this.VideoSearch("manchester United");
    }

VideoSearch(term){
  YTSearch( { key : youtubeAPI , term:term} , (videos) => {
    this.setState({ videos : videos ,
    SelectedVideo : videos[0] });
      // console.log(this.state.videos);
  });
}
    render(){
      const VideoSearch= _.debounce((term)=>{this.VideoSearch(term)},300);
        return (
          <div>
            <SearchBar onSearchTermChange= { term =>VideoSearch(term)} />
            <VideoDetail video={this.state.SelectedVideo} />
            <VideoList
              onVideoSelect = {SelectedVideo => this.setState({SelectedVideo})}
              videos={this.state.videos} />
          </div>
        );
      }
    }

// Execute the component in the Dom.

reactDom.render(<App />, document.querySelector('.container'));
