import { Component } from "react"
import { getUser } from "../../services/userServices"
import axios from "axios"

export default class PanelProfile extends Component {

    state = {
        user: '',
        message: '',
        image: '',
        imageData: ''
    }

    handleChange = (evt) => {
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                [evt.target.name]: evt.target.value,
            }
        }));
    }

    setUser = () => {
        const user = getUser()
        this.setState({ user })
    }

    componentDidMount() {
        this.setUser()
    }

    handleImage = (evt) => {
        this.setFileToBase(evt.target.files[0])
        let reader = new FileReader()

        reader.readAsDataURL(evt.target.files[0])
        reader.onload = () => {
            this.setState({
                image: reader.result
            })
        }
    }

    setFileToBase = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            this.setState({ imageData: reader.result })
        }
    }


    handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const options = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: this.state.user.firstName,
                    lastName: this.state.user.lastName,
                    email: this.state.user.email,
                    _id: this.state.user._id,
                }),
            };
            const fetchResponse = await fetch("/api/users/update", options)
            let fetchResponseJson = await fetchResponse.json();
            localStorage.setItem("token", fetchResponseJson.token);
            this.setState({ message: fetchResponseJson.message })
            this.setUser()
        } catch (err) {
            this.setState({ error: err.message });
        }
    }

    render() {

        return (
            <div className="container-fluid">
                <h3 className="text-dark mb-4">Profile</h3>
                <div className="row mb-3">
                    <div className="col-lg-4">
                        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <div className="card-body p-sm-5">
                                            <h2 className="text-center mb-4">Upload image</h2>
                                            <form method="post">
                                                <div className="mb-3">
                                                    <input id="name-1" onChange={this.handleImage} className="form-control" type="file" name="name" placeholder="Name" accept="image/*" required />
                                                </div>
                                                <div></div>
                                            </form>
                                            {this.state.imageData && <img className="img-thumbnail" src={this.state.imageData} alt="upload" />}
                                        </div>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary">Change</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card shadow mb-3">
                            <div className="card-header py-3">
                                <p className="text-primary m-0 fw-bold">Profile Image</p>
                            </div>
                            <div className="card-body text-center">
                                <img className="rounded-circle mb-3 mt-4" src={this.props.profileImage ? this.props.profileImage : 'profile-logo.png'} width="160" height="160" />
                                <div className="mb-3">
                                    <button className="btn btn-primary btn-sm" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Change Photo</button>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-lg-8">
                        <div className="row">
                            <div className="col">
                                <div className="card shadow mb-3">
                                    <div className="card-header py-3">
                                        <p className="text-primary m-0 fw-bold">User Settings</p>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={this.handleSubmit}>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="mb-3">
                                                        <label className="form-label" htmlFor="first_name"><strong>First Name</strong></label>
                                                        <input onChange={this.handleChange} className="form-control" type="text" id="first_name" placeholder="John" name="firstName" defaultValue={this.state.user.firstName} required />
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="mb-3">
                                                        <label className="form-label" htmlFor="last_name"><strong>Last Name</strong></label>
                                                        <input onChange={this.handleChange} className="form-control" type="text" id="last_name" placeholder="Doe" name="lastName" defaultValue={this.state.user.lastName} required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="mb-3">
                                                        <label className="form-label" htmlFor="email"><strong>Email Address</strong></label>
                                                        <input className="form-control" type="email" id="email" placeholder="user@example.com" name="email" defaultValue={this.state.user.email} required />
                                                    </div>
                                                </div>
                                            </div>
                                            {this.state.message && <div className="text-center medium "><span className='cursor-pointer' >{this.state.message}</span></div>}
                                            <br/>
                                            <div className="mb-3"><button className="btn btn-primary btn-sm">Save Settings</button></div>
                                        </form>
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