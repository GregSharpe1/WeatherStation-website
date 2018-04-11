import React, {Component} from 'react';
import { Link } from 'react-router';

import './assets/app.css'

class App extends Component {
    render(){
        return (
            <div>
                <header>
                    <div id="header">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    some info within the header section
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="navbar">
                        <nav className="navbar navbar-custom navbar-fixed-top">
                            <div className="container">
                                <div className="wrapper">    
                                    <Link to="/">Home</Link>
                                    <Link to="/current">Current Weather</Link>
                                    <Link to="/previous">Previous Weather</Link>
                                </div>
                            </div>
                        </nav>
                    </div>          
                </header>
              <main>
                {this.props.children}
              </main>
            </div>
          );
    }

}

export default App;