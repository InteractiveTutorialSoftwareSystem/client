import React, { Component } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { authFetch } from "./auth";

class PrivateRoute extends Component {
  state = {
    role: "",
    serverResponse: false,
    logged: false,
    id: "",
  }

  componentDidMount() {
    authFetch(process.env.REACT_APP_AUTH_URL + '/auth/protected').then(response => {
      return response.json();
    }).then(response => {
      if (response.role) {
        this.setState({role: response.role, serverResponse: true, logged: true, id: response.id})
      } else {
        this.setState({serverResponse: true, logged: false})
        window.localStorage.removeItem('REACT_TOKEN_AUTH_KEY');
        window.location.href='/login';
      }
    }).catch(()=>{
      this.setState({serverResponse: true, logged: false})
    })
  }

  render() {
    const { component: Component, roles, ...rest } = this.props;
    return <Route {...rest} render = {props => {
      if (this.state.serverResponse) {
        if (!this.state.logged) {
          return <Redirect to='/login' />
        }
        if (this.props.roles && this.props.roles.indexOf(this.state.role) === -1) {
          if (this.state.role == "author") {
            return (
              <Redirect
                to= {{
                  pathname: '/tutorial',
                  state: { 
                    role: this.state.role,
                    userId: this.state.id
                  }
                }}
              />
            )
          } else if (this.state.role == "learner") {
            return (
              <Redirect
                to= {{
                  pathname: '/tutorial',
                  state: { 
                    role: this.state.role,
                    userId: this.state.id
                  }
                }}
              />
            )
          }
        }
        return <Component {...props} userId={this.state.id} role={this.state.role}/>
      }
    }}/>
  }
}

export default withRouter(PrivateRoute);