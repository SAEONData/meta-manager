import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  GoogleAuth: PropTypes.object.isRequired,
};

const LoginPage = ({GoogleAuth}) => {
  return(
    <div>
      You need to <a onClick={() => { GoogleAuth.signIn() }}>sign in</a> to continue
    </div>
  )
};

LoginPage.propTyes = propTypes;
export default LoginPage;
