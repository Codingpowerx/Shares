import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from './layouts/MetaData';
import Loader from './layouts/Loader';
import { Link } from 'react-router-dom';
import { login, clearErrors } from '../actions/userActions';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(
    state => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
      alert.success(`Login Success!`)
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`Login here`} />

          <section className="container">
            <div className="form">
              <div className="host__form">
                <h2 className="h2-log">
                  Login to upload <br />
                  your files...
                </h2>
              </div>
              <div className="login-body">
                <form
                  action="#"
                  className="body-wrap"
                  onSubmit={submitHandler}
                >
                  <div className="wrap-style">
                    <input
                      className="log-input"
                      type="email"
                      placeholder="Email Address"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="wrap-style">
                    <input
                      className="log-input"
                      type="password"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <button className="btn-log" type="submit">
                      Sign In
                  </button>

                  <div className="statement">
                    <Link className="forgot-password" to="/password/forgot">
                      Forgot Password
                    </Link>
                  </div>

                  <div className="statement">
                    <p>
                      Don't Have an Account?
                      <Link className="no-account" to="/SignUp">
                        Create One
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
