import React, { Component } from "react";
import { getTrack } from "./Spotify/SpotifyAPI";
import { Redirect } from "react-router-dom";
// import { Iframe } from "./Iframe.js";

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
const audio = new Audio();

class TrackEntryContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            loading: false,
            id: "",
            name: "",
            source:""
        };
    }
    

    componentDidMount = async() => {
        const { match } = this.props;
        const id = match.params.id;
        if (id) {
            const track = await getTrack(authOptions, id);

            this.setState({
                name: track.name,
                source: track.preview_url                
            });
        }
    };

    componentWillReceiveProps = async newProps => {
        const currentMatch = this.props.match;
        const currentId = currentMatch.params.id;

        const newMatch = newProps.match;
        const newId = newMatch.params.id;

        if (newId && newId !== currentId) {
            const track = await getTrack(authOptions, newId);

            this.setState({
                name: track.name,
                source: track.preview_url
            });
        }
    };


    audioPlay = async () => {
        if (this.state.source === null) {
            alert("Cannot play this track!");
        }
        audio.src = this.state.source;
        await audio.play();
    }

    audioPause = async () => {
        // audio.src = "";
        await audio.pause();
    }

    render() {
        if (this.state.loading) {
            return <h1>Loading...</h1>;
        }
        if (this.state.error) {
            return <Redirect to="/error"/>;
        }
        
        return (
            <div>
                <h1> Name: {this.state.name} </h1>
                <div>
                <button type="button" onClick={this.audioPlay}>Play</button>
                </div>
                <div>
                <p></p>
                <button type="button" onClick={this.audioPause}>Pause</button>
                </div>
            </div>
            
        );
    }
}

export default TrackEntryContainer;