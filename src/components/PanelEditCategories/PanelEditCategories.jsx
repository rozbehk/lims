import { Component } from "react";
import { timeFormat } from "../../services/utilities";
import { getAllCategories } from "../../services/testServices";
import { get } from "mongoose";
import userEvent from "@testing-library/user-event";

export default class PanelEditCategories extends Component {

    state = {
        categories: {},
        categoryName: '',
        error: ''

    }

    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value, });
    }

    handleAddCategory = async (evt) => {
        console.log('create')
        evt.preventDefault();
        this.setState({ error: '' })
        try {
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: this.state.categoryName,
                }),
            };
            const fetchResponse = await fetch("/api/tests/createcategory", options);
            let responseMessage = await fetchResponse.json();
            console.log(fetchResponse)
            if (!fetchResponse.ok) {
                this.setState({ error: responseMessage });
                throw new Error(responseMessage);
            }
            const categories = await getAllCategories().then(categories => categories.json())
            this.setState({ error: 'Category created', categoryName: '', categories: categories })
            console.log('cleared')

        } catch (err) {
            this.setState({ error: err.message });
        }
    }

    handleDeleteCategory = async (id) => {
        try {
            const options = {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id
                }),
            };
            const fetchResponse = await fetch("/api/tests/deletecategory", options);
            let responseMessage = await fetchResponse.json();
            if (!fetchResponse.ok) {
                this.setState({ error: responseMessage });
                throw new Error(responseMessage);
            }
            const categories = await getAllCategories().then(categories => categories.json())
            this.setState({ categories: categories })
            console.log('cleared')

        } catch (err) {
            this.setState({ error: err.message });
        }
    }


    async componentDidMount() {
        const categories = await getAllCategories().then(categories => categories.json())
        this.setState({ categories })
    }

    render() {
        return (
            <div id="page-top">
                {/* -------------------------------- */}
                <div id="wrapper">
                    <div className="d-flex flex-column" id="content-wrapper">
                        <div id="content" className="mb-4">
                            <div className="container-fluid">
                                <div className="card shadow">
                                    <div className="card-header py-3">
                                        <p className="text-primary m-0 fw-bold">Add Category</p>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={this.handleAddCategory} className="row row-cols-lg-auto g-4 align-items-center">
                                            <div className="col-12">
                                                <div className="input-group">
                                                    <input onChange={this.handleChange} name="categoryName" value={this.state.categoryName} type="text" className="form-control" id="category-name" placeholder="Category name" />
                                                </div>
                                            </div>
                                            {this.state.error && <div>{this.state.error}</div>}
                                            <div className="col-12">
                                                <button className="btn btn-primary">Add</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="content">
                            <div className="container-fluid">
                                <div className="card shadow">
                                    <div className="card-header py-3">
                                        <p className="text-primary m-0 fw-bold">Categories</p>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                                            <table className="table my-0" id="dataTable">
                                                <thead>
                                                    <tr>
                                                        <th>No.</th>
                                                        <th>Category</th>
                                                        <th>Number of tests</th>
                                                        <th></th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.categories.length ? (

                                                        this.state.categories.map((category, index) => (
                                                            <tr key={category._id} className='align-middle'>
                                                                <td>{index+1}</td>
                                                                <td class>{category.name}</td>
                                                                <td>
                                                                    {category.tests.length}
                                                                </td>
                                                                <td>
                                                                    <button className="btn btn-primary d-block">update</button>
                                                                </td>
                                                                <td><button onClick={() => this.handleDeleteCategory(category._id)} className="btn btn-danger d-block">X</button></td>

                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td>
                                                                <div>no category found</div>
                                                            </td>
                                                            <td></td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
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