import React, { Component } from "react";
export class Iframe extends Component {     
    render() {
      return (         
        <div>          
          <iframe title="myiframe" src={this.props.src} height={this.props.height} width={this.props.width}></iframe>         
        </div>
      );
    }
}
