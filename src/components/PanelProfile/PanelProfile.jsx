import { Component } from "react"
import { getUser } from "../../services/userServices"

export default class PanelProfile extends Component {

    state = {
        user: '',
        message: ''
    }

    handleChange = (evt) => {
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                [evt.target.name]: evt.target.value,
            }
        }));
    }

    setUser = ()=>{
        const user = getUser()
        this.setState({ user })
    }

    componentDidMount() {
        this.setUser()
    }

    
    handleSubmit = async (evt) => {
        console.log('submiot')
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
            this.setState({message: fetchResponseJson.message})
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
                        <div className="card mb-3">
                            <div className="card-body text-center shadow"><img className="rounded-circle mb-3 mt-4" src="assets/img/dogs/image2.jpeg" width="160" height="160" />
                                <div className="mb-3"><button className="btn btn-primary btn-sm" type="button">Change Photo</button></div>
                            </div>
                        </div>
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="text-primary fw-bold m-0">Projects</h6>
                            </div>
                            <div className="card-body">
                                <h4 className="small fw-bold">Server migration<span className="float-end">20%</span></h4>
                                <div className="progress progress-sm mb-3">
                                    <div className="progress-bar bg-danger" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style={{ "width": "20%" }}><span className="visually-hidden">20%</span></div>
                                </div>
                                <h4 className="small fw-bold">Sales tracking<span className="float-end">40%</span></h4>
                                <div className="progress progress-sm mb-3">
                                    <div className="progress-bar bg-warning" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{ "width": "40%" }}><span className="visually-hidden">40%</span></div>
                                </div>
                                <h4 className="small fw-bold">Customer Database<span className="float-end">60%</span></h4>
                                <div className="progress progress-sm mb-3">
                                    <div className="progress-bar bg-primary" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ "width": "60%" }}><span className="visually-hidden">60%</span></div>
                                </div>
                                <h4 className="small fw-bold">Payout Details<span className="float-end">80%</span></h4>
                                <div className="progress progress-sm mb-3">
                                    <div className="progress-bar bg-info" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{ "width": "80%" }}><span className="visually-hidden">80%</span></div>
                                </div>
                                <h4 className="small fw-bold">Account setup<span className="float-end">Complete!</span></h4>
                                <div className="progress progress-sm mb-3">
                                    <div className="progress-bar bg-success" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{ "width": "100%" }}><span className="visually-hidden">100%</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="row mb-3 d-none">
                            <div className="col">
                                <div className="card text-white bg-primary shadow">
                                    <div className="card-body">
                                        <div className="row mb-2">
                                            <div className="col">
                                                <p className="m-0">Peformance</p>
                                                <p className="m-0"><strong>65.2%</strong></p>
                                            </div>
                                            <div className="col-auto"><i className="fas fa-rocket fa-2x"></i></div>
                                        </div>
                                        <p className="text-white-50 small m-0"><i className="fas fa-arrow-up"></i>&nbsp;5% since last month</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card text-white bg-success shadow">
                                    <div className="card-body">
                                        <div className="row mb-2">
                                            <div className="col">
                                                <p className="m-0">Peformance</p>
                                                <p className="m-0"><strong>65.2%</strong></p>
                                            </div>
                                            <div className="col-auto"><i className="fas fa-rocket fa-2x"></i></div>
                                        </div>
                                        <p className="text-white-50 small m-0"><i className="fas fa-arrow-up"></i>&nbsp;5% since last month</p>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                                        <input onChange={this.handleChange} className="form-control" type="text" id="first_name" placeholder="John" name="firstName" defaultValue={this.state.user.firstName} required/>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="mb-3">
                                                        <label className="form-label" htmlFor="last_name"><strong>Last Name</strong></label>
                                                        <input onChange={this.handleChange} className="form-control" type="text" id="last_name" placeholder="Doe" name="lastName" defaultValue={this.state.user.lastName} required/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="mb-3">
                                                        <label className="form-label" htmlFor="email"><strong>Email Address</strong></label>
                                                        <input className="form-control" type="email" id="email" placeholder="user@example.com" name="email" defaultValue={this.state.user.email} required/>
                                                    </div>
                                                </div>
                                            </div>
                                            {this.state.message && <div className="text-center medium "><span className='cursor-pointer' >{this.state.message}</span></div>}
                                            <div className="mb-3"><button className="btn btn-primary btn-sm">Save Settings</button></div>
                                        </form>
                                    </div>
                                </div>
                                <div className="card shadow">
                                    <div className="card-header py-3">
                                        <p className="text-primary m-0 fw-bold">Contact Settings</p>
                                    </div>
                                    <div className="card-body">
                                        <form >
                                            <div className="mb-3"><label className="form-label" htmlFor="address"><strong>Address</strong></label><input className="form-control" type="text" id="address" placeholder="Sunset Blvd, 38" name="address" /></div>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="mb-3"><label className="form-label" htmlFor="city"><strong>City</strong></label><input className="form-control" type="text" id="city" placeholder="Los Angeles" name="city" /></div>
                                                </div>
                                                <div className="col">
                                                    <div className="mb-3"><label className="form-label" htmlFor="country"><strong>Country</strong></label><input className="form-control" type="text" id="country" placeholder="USA" name="country" /></div>
                                                </div>
                                            </div>
                                            <div className="mb-3"><div className="btn btn-primary btn-sm">Save&nbsp;Settings</div></div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card shadow mb-5">
                    <div className="card-header py-3">
                        <p className="text-primary m-0 fw-bold">Forum Settings</p>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <form>
                                    <div className="mb-3"><label className="form-label" htmlFor="signature"><strong>Signature</strong><br /></label><textarea className="form-control" id="signature" rows="4" name="signature"></textarea></div>
                                    <div className="mb-3">
                                        <div className="form-check form-switch"><input className="form-check-input" type="checkbox" id="formCheck-1" /><label className="form-check-label" htmlFor="formCheck-1"><strong>Notify me about new replies</strong></label></div>
                                    </div>
                                    <div className="mb-3"><button className="btn btn-primary btn-sm" type="submit">Save Settings</button></div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}