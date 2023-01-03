import { Component } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignupForm/SignupForm";

export default class Auth extends Component {
    state = {
        showLogin: true
    }


    handleForm = (val) => {
        val ? this.setState({ showLogin: true }) : this.setState({ showLogin: false })
    }



    render() {
        return (
            <div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-9 col-lg-12 col-xl-10">
                            <div className="card shadow-lg o-hidden border-0 my-5">
                                <div className="card-body p-0">
                                    <div className="row">
                                        <div className="col-lg-6 d-none d-lg-flex">
                                            <img className="flex-grow-1 bg-login-image" src="logo.png" alt="" />
                                        </div>
                                        {this.state.showLogin && <LoginForm handleForm={this.handleForm} setUserInState={this.props.setUserInState} />}
                                        {!this.state.showLogin && <SignUpForm handleForm={this.handleForm} setUserInState={this.props.setUserInState} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

