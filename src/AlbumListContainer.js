import React, { Component } from "react";
import { getAlbum } from "./Spotify/SpotifyAPI";
import { Redirect } from "react-router-dom";

const client_id = '1b928fbd0fa94506adbe02fce20a52e6'; // Your client id
const client_secret = '93eebdb827e441fba621ba95a89866ca'; // Your secret
// your application requests authorization
const authOptions = {
    url: 'https://cs-554-spotify-proxy.herokuapp.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
};

class AlbumListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            artist: "",
            copyrights:"",
            image:"",
            loading: false
        };
    };

    componentWillMount() {
        this.setState({id: this.props.match.params.id});
    }

    async componentDidMount() {
        const albumInfo = await getAlbum(authOptions, this.state.id);
        console.log(albumInfo);
        this.setState({
            name: albumInfo.name,
            popularity:albumInfo.popularity,
            copyrights: albumInfo.copyrights[0].text,
            image:albumInfo.images[1].url,
            loading: false
        });
    }

    render() {
        if (this.state.error) {
            return <Redirect to="/error"/>;
        }
        if (this.state.loading) {
            return <h1>Loading...</h1>;
        }
        return (
          <div className="container">
            <h1> ID: {this.state.id} </h1>
            <h1> Name: {this.state.name} </h1>
            <h1> Copyrights: {this.state.copyrights} </h1>
            <h1> Popularity: {this.state.popularity} </h1>
            <img className="img" src={this.state.image} alt={this.state.name}/>;
          </div>
        );
    }
}

export default AlbumListContainer;