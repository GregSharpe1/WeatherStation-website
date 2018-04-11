import React, {Component} from 'react';
import SimpleMap from './GoogleMap';


class Home extends Component {
    render(){
        return (
            <div id="graphSection">
            <div class="container">
              <div class="row">
                <div class="col-sm-6 text-center">
                  <div id="graphBox">
                    <div className="chart">
                        <SimpleMap />
                    </div>
                  </div>
                </div>
                <div class="col-sm-6 text-center">
                  <div id="graphInfo">
                    Let's add some random info here 
                  </div>
                </div>
              </div>
            </div>
          </div>
          );
    }

}

export default Home;