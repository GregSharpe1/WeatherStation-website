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
                    <div class="mapInfo">
                      <div class="map-description">
                        <h1><b>Welcome to Aberystwyth Weather Station</b></h1>
                        the left you'll see a marker on the Map, 
                        this is where the first of my many Weather 
                        Station's are placed.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

          );
    }

}

export default Home;