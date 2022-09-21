import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Home = (props, {isLoggedIn}) => {
  const {username} = props

  return (
    <div className="home">
      {isLoggedIn ? (
        <div>
          <h2>Welcome to your apothecary!</h2>
        </div>
      ) : (
        <div>
          <h2>Welcome to your apothecary {username}!</h2>
        </div>
      )}
    </div>
    

  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username
  }
}

export default connect(mapState)(Home)
