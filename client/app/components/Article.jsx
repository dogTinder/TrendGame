import React from 'react';

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      media: this.props.story.media
    };
  }

  handleBrokenImage(event) {
    this.setState({media: ''});
  }

  render() {
    return (
      <div className="col-12 col-md-6">
        <a href={this.props.story.url} className="card-clickable" target="_blank">
          <div className="card">
            <img
              className="card-img-top img-fluid"
              src={this.state.media}
              onError={e => { this.handleBrokenImage(e); }}
            />
            <div className="card-block">
              <h3 className="h4 card-title">{this.props.story.headline}</h3>
              <p className="card-text">{this.props.story.summary}</p>
            </div>
          </div>
        </a>
      </div>
    );
  }
}

export default Article;
