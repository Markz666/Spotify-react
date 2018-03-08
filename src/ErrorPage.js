import React, { Component } from "react";
import { Link } from "react-router-dom";

class ErrorPage extends Component {
    render() {
        return (
            <div className="container">
            <h1>404 Page</h1>
            <Link to="/"><button type="button" className="btn btn-primary back">Back to homepage</button>
            </Link>
            </div>
        );
    }
}

export default ErrorPage;