import { Component } from "react";
import { getAllUsers } from "../../services/userServices";
import { timeFormat } from "../../services/utilities";


export default class PanelUserList extends Component {



    state = {
        users: {}
    }


    componentDidMount = async () => {
        const users = await getAllUsers()
        this.setState({ users })
    }

    render() {
        return (
            <div id="page-top">
                <div id="wrapper">
                    <div className="d-flex flex-column" id="content-wrapper">
                        <div id="content">
                            <div className="container-fluid">
                                <h3 className="text-dark mb-4">Team</h3>
                                <div className="card shadow">
                                    <div className="card-header py-3">
                                        <p className="text-primary m-0 fw-bold">Employee Info</p>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6 text-nowrap">

                                            </div>
                                            <div className="col-md-6">
                                                <div className="text-md-end dataTables_filter" id="dataTable_filter"><label className="form-label"><input type="search" className="form-control form-control-sm" aria-controls="dataTable" placeholder="Search" /></label></div>
                                            </div>
                                        </div>
                                        <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                                            <table className="table my-0" id="dataTable">
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th>Name</th>
                                                        <th>Position</th>
                                                        <th>Email</th>
                                                        <th>Registration date</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.users.length &&
                                                        this.state.users.map((user) => (
                                                            <tr key={user._id}>
                                                                <td><img className="rounded-circle me-2" width="30" height="30" src={user.image ? user.img : 'profile-logo.png'} /></td>
                                                                <td>{user.firstName + " " + user.lastName}</td>
                                                                <td>
                                                                    {user.admin ? "admin" : user.labTech ? "Lab Technician" : user.receptionist ? "Receptionist" : "Customer"}
                                                                </td>
                                                                <td>{user.email}</td>
                                                                <td>{timeFormat(user.createdAt)}</td>
                                                            </tr>
                                                        ))}


                                                </tbody>

                                            </table>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 align-self-center">
                                                <p id="dataTable_info" className="dataTables_info" role="status" aria-live="polite">Showing 1 to 10 of 27</p>
                                            </div>
                                            <div className="col-md-6">
                                                <nav className="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers">
                                                    <ul className="pagination">
                                                        <li className="page-item disabled"><a className="page-link" aria-label="Previous" href="#"><span aria-hidden="true">«</span></a></li>
                                                        <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                                        <li className="page-item"><a className="page-link" aria-label="Next" href="#"><span aria-hidden="true">»</span></a></li>
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div><a className="border rounded d-inline scroll-to-top" href="#page-top"><i className="fas fa-angle-up"></i></a>
                </div>
            </div>

        )
    }
}