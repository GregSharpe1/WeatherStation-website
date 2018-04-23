import React, {Component} from 'react';
import { Link } from 'react-router';
import './assets/app.css'
import AberLogo from './assets/img/aberwx.png'

class App extends Component {
    render(){
        return (
            <div>
                <header>
                    <div id="header">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <img src={AberLogo} height="100" ></img>
                            </div>
                        </div>
                    </div>
                    <div id="navbar">
                        <nav className="navbar navbar-custom navbar-fixed-top">
                            <div className="container">
                                <div className="wrapper">    
                                    <Link to="/">Home</Link>
                                    <Link to="/current">Current Weather</Link>
                                    <Link to="/last24hours">Last 24 Hours</Link>
                                    <Link to="/previous"> Previous Weather </Link>
                                </div>
                            </div>
                        </nav>
                    </div>          
                </header>
                <main>
                    {this.props.children}
                </main>
                <footer class="footer page-footer font-small">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <div className="footer-wrapper">
                                <small>Copyright &copy; 2018, Greg Sharpe. All rights reserved</small>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
          );
    }

}

export default App;