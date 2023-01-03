export default function PanelNav(props) {
    return (
        <nav className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
            <div className="container-fluid d-flex flex-column p-0"><a className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="#">
                <div className="sidebar-brand-icon rotate-n-15"><i className="fas fa-laugh-wink"></i></div>
                <div className="sidebar-brand-text mx-3"><span>Brand</span></div>
            </a>
                <hr className="sidebar-divider my-0" />
                <ul className="navbar-nav text-light" id="accordionSidebar">
                    <li onClick={() => props.setDefaultTab('dashboard')} className="nav-item"><div className={props.activeTab === 'dashboard' ? "nav-link active" : "nav-link"}><i className="fas fa-tachometer-alt"></i><span>Dashboard</span></div></li>
                    <li onClick={() => props.setDefaultTab('profile')} className="nav-item"><div className={props.activeTab === 'profile' ? "nav-link active" : "nav-link"} ><i className="fas fa-user"></i><span>Profile</span></div></li>
                    <li onClick={() => props.setDefaultTab('table')} className="nav-item"><div className={props.activeTab === 'table' ? "nav-link active" : "nav-link"} ><i className="fas fa-table"></i><span>Table</span></div></li>
                    <li onClick={() => props.setDefaultTab('login')} className="nav-item"><div className={props.activeTab === 'login' ? "nav-link active" : "nav-link"} ><i className="far fa-user-circle"></i><span>Login</span></div></li>
                    <li onClick={() => props.setDefaultTab('register')} className="nav-item"><div className={props.activeTab === 'register' ? "nav-link active" : "nav-link"} ><i className="fas fa-sign-out-alt"></i><span>Register</span></div></li>
                </ul>
                <div className="text-center d-none d-md-inline"><button className="btn rounded-circle border-0" id="sidebarToggle" type="button"></button></div>
            </div>
        </nav>
    )
}