import React, { Component } from "react";
import { searchForTracks } from "./Spotify/SpotifyAPI";
import TrackList from "./TrackList";

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

class TrackListContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listOfMatchingTracks: []
        };
    }

    componentDidMount = async() => {
        const { match } = this.props;
        const track = match.params.trackName;
        if (track) {
            const matches = await searchForTracks(authOptions, track);
            this.setState({
                listOfMatchingTracks: matches
            });
        }
    };
 

    componentWillReceiveProps = async newProps => {
        const currentMatch = this.props.match;
        const currentTrack = currentMatch.params.trackName;

        const newMatch = newProps.match;
        const newTrack = newMatch.params.trackName;
        if (newTrack && newTrack !== currentTrack) {
            const matches = await searchForTracks(authOptions, newTrack);
            console.log(matches);
            this.setState({
                listOfMatchingTracks: matches
            });
        }
    };

    

    render() {
        if (!this.props.match.params.trackName) {
            return <h1>Search for tracks</h1>;
        }
        const tracks = this.state.listOfMatchingTracks;
        // console.log(tracks);
        return <TrackList trackList={tracks} />;
    }
}

export default TrackListContainer;