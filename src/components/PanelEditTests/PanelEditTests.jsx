import { Component } from "react";
import { getAllTests } from "../../services/testServises";
import { getAllCategories } from "../../services/categoryServices";

export default class PanelEditTests extends Component {

    state = {
        tests: {},
        testName: '',
        error: '',
        categories: '',
        categoryId: ''
    }

    handleChange = (evt) => {
        console.log(evt.target.name)
        this.setState({ [evt.target.name]: evt.target.value, });
    }

    handleAddTest = async (evt) => {
        console.log('create')
        evt.preventDefault();
        this.setState({ error: '' })
        if(!this.state.categoryId){
            this.setState({error: 'Choose a category'})
            return
        }
        try {
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: this.state.testName,
                    categoryId: this.state.categoryId
                }),
            };
            const fetchResponse = await fetch("/api/tests/createtest", options);
            let responseMessage = await fetchResponse.json();
            if (!fetchResponse.ok) {
                this.setState({ error: responseMessage });
                throw new Error(responseMessage);
            }
            const tests = await getAllTests().then(tests => tests.json())
            this.setState({ error: 'Tests created', testName: '', tests })
            console.log('cleared')

        } catch (err) {
            this.setState({ error: err.message });
        }
    }

    handleDeleteTest = async (id) => {
        try {
            const options = {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id
                }),
            };
            const fetchResponse = await fetch("/api/tests/deletetest", options);
            let responseMessage = await fetchResponse.json();
            if (!fetchResponse.ok) {
                this.setState({ error: responseMessage });
                throw new Error(responseMessage);
            }
            const tests = await getAllTests().then(tests => tests.json())
            this.setState({ tests })
            console.log('cleared')

        } catch (err) {
            this.setState({ error: err.message });
        }
    }


    async componentDidMount() {
        const tests = await getAllTests().then(tests => tests.json())
        const categories = await getAllCategories().then(categories => categories.json())

        this.setState({ tests, categories })
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
                                        <p className="text-primary m-0 fw-bold">Add Test</p>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={this.handleAddTest} className="row row-cols-lg-auto g-4 align-items-center">
                                            <div className="col-12">
                                                <div className="input-group">
                                                    <input onChange={this.handleChange} name="testName" value={this.state.testName} type="text" className="form-control" id="test-name" placeholder="Test name" />
                                                    <select className="form-select" name="categoryId" onChange={this.handleChange}>
                                                        <option value=''  onSelect={this.handleChange}>Choose Category</option>
                                                        {this.state.categories.length ? (

                                                            this.state.categories.map((category) => (
                                                                <option value={category._id}>{category.name}</option>
                                                            ))
                                                        ) : (
                                                            <option >No category found</option>
                                                        )}
                                                    </select>

                                                </div>
                                            </div>
                                            
                                            <div className="col-12">
                                                <button className="btn btn-primary">Add</button>
                                            </div>
                                            {this.state.error && <div>{this.state.error}</div>}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="content">
                            <div className="container-fluid">
                                <div className="card shadow">
                                    <div className="card-header py-3">
                                        <p className="text-primary m-0 fw-bold">Tests</p>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                                            <table className="table my-0" id="dataTable">
                                                <thead>
                                                    <tr>
                                                        <th>No.</th>
                                                        <th>Test</th>
                                                        <th>Category</th>
                                                        <th></th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.tests.length ? (

                                                        this.state.tests.map((test, index) => (
                                                            <tr key={test._id} className='align-middle'>
                                                                <td>
                                                                    {index + 1}
                                                                </td>
                                                                <td>
                                                                    {test.name}
                                                                </td>
                                                                <td>
                                                                    {test.category.name}
                                                                </td>
                                                                <td>
                                                                    <button className="btn btn-primary d-block">update</button>
                                                                </td>
                                                                <td>
                                                                    <button onClick={() => this.handleDeleteTest(test._id)} className="btn btn-danger d-block">X</button>
                                                                </td>

                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td>
                                                                <div>no test found</div>
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