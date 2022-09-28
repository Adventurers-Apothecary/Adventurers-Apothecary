import React from "react";
import { connect } from "react-redux";

/**
 * COMPONENT
 */
export const Home = (props, { isLoggedIn }) => {
  const { username } = props;

  return (
    <div className="home">
      {props.isLoggedIn ? (
        <div>
          <h2>Welcome to your apothecary, {username}!</h2>
          {props.isAdmin && (
            <div>
              <h3>You are an ADMIN.</h3>
              <p>You can add products and edit products!</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2>Welcome to your apothecary!</h2>
        </div>
      )}
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
    isLoggedIn: state.auth.id,
    isAdmin: !!state.auth.isAdmin,
  };
};

export default connect(mapState)(Home);
