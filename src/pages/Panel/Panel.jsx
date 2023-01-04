import { Component } from "react";
import PanelSideNav from "../../components/PanelNav/PanelNav";
import PanelTopNav from "../../components/PanelTopNav/PanelTopNav";
import PanelDashboard from "../../components/PanelDashboard/PanelDashboard";
import PanelProfile from "../../components/PanelProfile/PanelProfile";
import PanelUserList from "../../components/PanelUserList/PanelUserList";
import PanelEditCategories from "../../components/PanelEditCategories/PanelEditCategories";
import PanelEditTests from "../../components/PanelEditTests/PanelEditTests";

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
                        <PanelTopNav removeUserInState ={this.props.removeUserInState } name={this.props.name} profileImage={this.props.profileImage}/>
                        {this.state.activeTab === 'dashboard' && <PanelDashboard />}
                        {this.state.activeTab === 'users' && <PanelUserList profileImage={this.props.profileImage}/>}
                        {this.state.activeTab === 'profile' && <PanelProfile />}
                        {this.state.activeTab === 'edit-categoiries' && <PanelEditCategories />}
                        {this.state.activeTab === 'edit-tests' && <PanelEditTests />}
                        </div>
                        <footer className="bg-white sticky-footer">
                            <div className="container my-auto">
                                <div className="text-center my-auto copyright"><span>Copyright © RK LIMS</span></div>
                            </div>
                        </footer>
                    </div><a className="border rounded d-inline scroll-to-top" href="#page-top"><i className="fas fa-angle-up"></i></a>
                </div>
            </div>
        )
    }
}