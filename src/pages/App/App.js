import './App.css';
import { Component } from 'react';
import Auth from '../Auth/Auth';
import { getToken } from '../../services/userServices';
import Panel from '../Panel/Panel';
import { getUser } from "../../services/userServices";

export default class App extends Component {
  state = {
    user: false,
    firstName : '',
    lastName : '',
    email : '',
    userType: '',
    profileImage: '',
    image: ''
  }

  setUserInState = () => {
    this.setState({ user: true})
    let user = getUser()
    this.setState({firstName: user.firstName, lastName: user.lastName, email: user.email, image: user.image})
    if(user.admin){
      this.setState({userType : 'admin'})
    }else if(user.labTech){
      this.setState({userType : 'labTech'})
    }else if(user.receptionist){
      this.setState({userType : 'receptionist'})
    }else{
      this.setState({userType : 'user'})
    }
  }

  removeUserInState =() =>{
    this.setState({user: false})
  }

  componentDidMount() {
    const user = getToken()
    if(user){
      this.setUserInState()
      this.setState({ user: true }
    )}else{
      this.setState({ user: false })
    }
    
  }

  render() {
    return (
      <div className="App">
        {!this.state.user ?
          <Auth setUserInState={this.setUserInState} />
          : (
          <Panel removeUserInState={this.removeUserInState} name={`${this.state.firstName} ${this.state.lastName}`} profileImage={this.state.profileImage}/>
          )
        }
      </div>
    );
  }
}

