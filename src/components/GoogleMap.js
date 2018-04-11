// Example taken from https://github.com/google-map-react/google-map-react
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const Marker = ({ text }) => <div class="mapMarker" >{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 52.4181,
      lng: -4.0157
    },
    zoom: 13
  };

  render() {
    return (
      // Using the Marker tag, place the marker depending on lng and lat
      <div style={{ height: '300px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <Marker
            lat={52.41644364690917}
            lng={-4.065938763229383}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;