import React from 'react';
import { Button } from 'react-bootstrap';
import './Header.css';
import {withRouter} from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: props.isLogin,
            onLogout: props.onLogout
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.isLogin !== prevProps.isLogin) {
          this.setState({
            isLogin: this.props.isLogin
          });
        }
      }

    renderButton() {
        if (this.state.isLogin) {
            return (
                <Button
                    variant="primary"
                    className="Header-button"
                    onClick={this.state.onLogout}
                >
                    <span>
                        Log out
                    </span>
                </Button>
            );
        } else {
            return (
                <div className="Header-buttons">
                    <Button
                        variant="primary"
                        className="Header-button"
                        onClick={()=> this.props.history.push('/login')}
                    >
                        <span>
                            Log in
                        </span>
                    </Button>
                    <Button
                        variant="secondary"
                        className="Header-button"
                        onClick={() => this.props.history.push('/registration')}
                    >
                        <span>
                            Registrate
                        </span>
                    </Button>
                </div>
            );

        }
    }

    render() {
        return (
            <div className="Header">
                <img className="Header-img" src="logo192.png" 
                    onClick={() => this.props.history.push('/')}/>

                {this.renderButton()}

            </div >
        );
    }
}

export default withRouter(Header);