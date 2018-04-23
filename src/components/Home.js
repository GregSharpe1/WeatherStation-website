import React, {Component} from 'react';
import SimpleMap from './GoogleMap';
import '../assets/home.css'

class Home extends Component {
    render(){
        return (
          <div class="mapSection">
            <div class="map-wrapper">
              <div class="row">
                <div class="col-sm-12 text-center">
                  <div class="mapBox">
                    <div className="chart">
                        <SimpleMap />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row d-none d-md-block">
                <div class="text-center">
                  <div class="mapInfo">
                    <div class="map-description">
                      <h3><b>Welcome.</b></h3>
                      This microsite provides accurate and regular weather data
                      from an observation station located in Aberystwyth Wales.
                    </div>
                  </div>
                </div>
              </div>
              <div className="row d-md-none">
                <div class="text-center">
                  <div class="mapInfo">
                    <div class="map-description">
                      <h3><b>Welcome.</b></h3>
                      This microsite provides accurate and regular weather data
                      from an observation station located in Aberystwyth Wales.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          );
    }

}

export default Home;