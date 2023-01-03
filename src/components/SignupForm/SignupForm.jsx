import { Component } from "react";

export default class SignUpForm extends Component {
    state = {
        firstName: 'roozbeh',
        lastName: 'karimi',
        email: 'roozbeh.karimi@gmail.com',
        password: '',
        rePassword: '',
        error: ''
    }

    handleChnage = (evt) => {
        this.setState({ [evt.target.id]: evt.target.value })
    }

    handleSubmit = async (evt) => {
        evt.preventDefault();
        if (this.state.password !== this.state.rePassword) {
            this.setState({ error: "passwords do not match" })
            return
        }
        try {
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    password: this.state.password,
                }),
            };
            const fetchResponse = await fetch("/api/users/register", options);
            let responseMessage = await fetchResponse.json();
            if (!fetchResponse.ok) {
                this.setState({ error: responseMessage });
                throw new Error(responseMessage);
            }
            localStorage.setItem("token", responseMessage);
            let user = JSON.parse(atob(responseMessage.split(".")[1])).user;
            this.props.setUserInState(user);
            
        } catch (err) {
            console.log(err)
        }

    };


    render() {
        return (
            <div className="col-lg-6">
                <div className="p-5">
                    <div className="text-center">
                        <h4 className="text-dark mb-4">Create an Account!</h4>
                    </div>
                    <form className="user" onSubmit={this.handleSubmit}>
                        <div className="row mb-3">
                            <div className="col-sm-6 mb-3 mb-sm-0">
                                <input onChange={this.handleChnage} className="form-control form-control-lg  rounded-pill " type="text" id="firstName" placeholder="First Name" name="first_name" value={this.state.firstName} required />
                            </div>
                            <div className="col-sm-6">
                                <input onChange={this.handleChnage} className="form-control form-control-lg  rounded-pill " type="text" id="lastName" placeholder="Last Name" name="last_name" value={this.state.lastName} required />
                            </div>
                        </div>
                        <div className="mb-3">
                            <input onChange={this.handleChnage} className="form-control form-control-lg  rounded-pill " type="email" id="email" aria-describedby="emailHelp" placeholder="Email Address" name="email" value={this.state.email}  />
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-6 mb-3 mb-sm-0">
                                <input onChange={this.handleChnage} className="form-control form-control-lg  rounded-pill " type="password" id="password" placeholder="Password" name="password" value={this.state.password} required />
                            </div>
                            <div className="col-sm-6">
                                <input onChange={this.handleChnage} className="form-control form-control-lg  rounded-pill " type="password" id="rePassword" placeholder="Repeat Password" name="password_repeat" value={this.state.rePassword} required />
                            </div>
                        </div>
                        {this.state.error && <div className="text-center medium "><span className='cursor-pointer' >error: {this.state.error}</span></div>}
                        <button className="btn btn-primary d-block w-100 rounded-pill btn-lg mb-3">Register Account</button>
                        {/* <hr />
                        <button className="btn btn-primary btn-block text-white rounded-pill btn-lg" role="button"><i className="fab fa-google"></i>&nbsp; Register with Google</button>
                        <hr /> */}
                    </form>
                    <hr />
                    {/* <div className="text-center medium "><span className='cursor-pointer' >Forgot Password?</span></div> */}
                    <div className="text-center medium" onClick={() => this.props.handleForm(true)}><span className='cursor-pointer' >Already have an account? Login!</span></div>
                </div>
            </div>
        )
    }
}