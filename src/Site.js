import React, { Component } from 'react';
import { Route, Link, Switch } from "react-router-dom";
import { Helmet } from 'react-helmet';
import TrackListContainer from "./TrackListContainer";
import TrackEntryContainer from "./TrackEntryContainer";
import ArtistListContainer from "./ArtistListContainer";
import AlbumListContainer from "./AlbumListContainer";
import HomeSearchPage from "./HomeSearchPage";
import ErrorPage from "./ErrorPage";
import "./App.css"
class Site extends Component {
  constructor(props) {
    super(props);
    this.state = {
      track: ""
    };
  }

  onSearch = (searchQuery) => {
    this.setState({
      track: searchQuery
    });
  };

  render() {
    return (

      <div className="App">
        <header>
        {/* <meta httpEquiv="Content-Security-Policy" content="default-src 'self'"/> */}
            <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
              <h5 className="my-0 mr-md-auto font-weight-normal">Track Search</h5>
              <nav className="my-2 my-md-0 mr-md-3">
                <Link className="p-2 text-dark" to="/">
                  Home
                </Link>
                <Link className="p-2 text-dark" to="/error">
                  Bad Route
                </Link>
              </nav>
            </div>
        </header>

        <div className="container">
          <Switch>
            <Route path="/" exact={true} component={HomeSearchPage} />
            <Route
              path="/search/:trackName"
              component={TrackListContainer}
            />
            <Route
              path="/track/:id"
              component={TrackEntryContainer}
            />
            <Route
              path="/artists/:id"
              component={ArtistListContainer}
            />
             <Route
              path="/albums/:id"
              component={AlbumListContainer}
            />
            <Route path="/error" component={ErrorPage}/>
          </Switch>
        </div>
        <div className="body">
          <Helmet>
              <style>{'body { background-color: #E3DFDB; }'}</style>
          </Helmet>
        </div>
      </div>
    );
  }
}

export default Site;
