import { Component } from "react";

export default class LoginForm extends Component {
    state = {
        email: '',
        password: '',
        error: ''
    }

    handleChnage = (evt) => {
        this.setState({ [evt.target.id]: evt.target.value })
    }

    handleSubmit = async (evt) => {
        console.log('submit)')
        evt.preventDefault();
        try {
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                }),
            };
            const fetchResponse = await fetch("/api/users/login", options);
            let responseMessage = await fetchResponse.json();
            if (!fetchResponse.ok) {
                this.setState({ error: responseMessage });
                throw new Error(responseMessage);
            }
            localStorage.setItem("token", responseMessage);

            let user = JSON.parse(atob(responseMessage.split(".")[1])).user;
            this.props.setUserInState(user);
        } catch (err) {
            this.setState({ error: err.message });
        }
    }




    render() {
        return (
            <div className="col-lg-6">
                <div className="p-5">
                    <div className="text-center">
                        <h4 className="text-dark mb-4">Welcome Back!</h4>
                    </div>
                    <form className="user" onSubmit={this.handleSubmit}>
                        <div className="mb-3">
                            <input onChange={this.handleChnage} id="email" className="form-control form-control-lg  rounded-pill " type="email" aria-describedby="emailHelp" placeholder="Enter Email Address..." name="email" value={this.state.email} />
                        </div>
                        <div className="form-group mb-3">
                            <input onChange={this.handleChnage} id="password" className="form-control form-control-lg  rounded-pill " type="password" placeholder="Password" name="password" value={this.state.password} />
                        </div>
                        {this.state.error && <div className="text-center medium "><span >error: {this.state.error}</span></div>}
                        <button className="btn btn-primary d-block w-100 rounded-pill btn-lg mb-3" type="submit">Login</button>
                        <button className="btn btn-danger d-block w-100 rounded-pill btn-lg mb-2" role="button"><i className="fab fa-google"></i>&nbsp; Login with Google</button>
                       </form>
                    <hr />
                    {/* <div className="text-center medium my-2" ><span className='cursor-pointer' >Forgot Password?</span></div> */}
                    <div className="text-center medium" onClick={() => this.props.handleForm(false)} ><span className='cursor-pointer' > Create an Account!</span></div>
                </div>
            </div>
        )
    }
}