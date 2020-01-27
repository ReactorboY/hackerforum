import React from 'react'
import AuthUserContext from './context'
import {withFirebase} from '../firebase'


const withAuthentication = Component => {
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                authUser :null
            }
        }

        componentDidMount() {
            this.listerner = this.props.firebase.auth.onAuthStateChanged(authUser => {
                authUser ? this.setState({authUser})
                    : this.setState({authUser:null})
            })
        }

        componentWillUnmount() {
            this.listerner()
        }

        render() {
            console.log(this.state.authUser)
            return (
                <AuthUserContext.Provider value={this.state.authUser}>
                    <Component {...this.props} />
                </AuthUserContext.Provider>
            )
        }
    }

    return withFirebase(WithAuthentication)
}

export default withAuthentication