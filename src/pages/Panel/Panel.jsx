import { Component } from "react";
import PanelSideNav from "../../components/PanelNav/PanelNav";
import PanelTopNav from "../../components/PanelTopNav/PanelTopNav";
import PanelDashboard from "../../components/PanelDashboard/PanelDashboard";
import PanelProfile from "../../components/PanelProfile/PanelProfile";

export default class Panel extends Component {

    state ={
        activeTab :'dashboard'
    }

    setDefaultTab = (activeTab) =>{
        this.setState({activeTab})
    }

    render() {
        return (
            <div id="page-top">
                <div id="wrapper">
                    <PanelSideNav setDefaultTab={this.setDefaultTab} activeTab={this.state.activeTab}/>
                    <div className="d-flex flex-column" id="content-wrapper">
                        <div id="content">
                        <PanelTopNav removeUserInState ={this.props.removeUserInState } name={this.props.name}/>
                        {this.state.activeTab === 'dashboard' && <PanelDashboard />}
                        {this.state.activeTab === 'profile' && <PanelProfile />}
                        </div>
                        <footer className="bg-white sticky-footer">
                            <div className="container my-auto">
                                <div className="text-center my-auto copyright"><span>Copyright © Brand 2022</span></div>
                            </div>
                        </footer>
                    </div><a className="border rounded d-inline scroll-to-top" href="#page-top"><i className="fas fa-angle-up"></i></a>
                </div>
            </div>
        )
    }
}