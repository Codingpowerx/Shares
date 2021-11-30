import React, { Fragment, useState, useEffect } from 'react';
import MetaData from './layouts/MetaData';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useSelector, useDispatch } from 'react-redux';
import { register, clearErrors } from '../actions/userActions';
import Loader from './layouts/Loader';

const SignUp = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
      alert.success(
        `Welcome happy to have you here For the very first time🚀!`
      );
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password, passwordConfirm));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`Register User`} />

          <section className="container-reg">
            <div className="form">
              <div className="host__form">
                <h2 className="h2-log">You can sign up here!</h2>
              </div>
              <div className="login-body">
                <form action="#" className="body-wrap" onSubmit={submitHandler}>
                  <div className="wrap-style">
                    <input
                      className="log-input"
                      type="name"
                      placeholder="Your Name:-)"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
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
                  <div className="wrap-style">
                    <input
                      className="log-input"
                      type="password"
                      placeholder="Password Confirm"
                      required
                      value={passwordConfirm}
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                  </div>

                  <button className="btn-log" type="submit">
                    Sign Up
                  </button>

                  <div className="statement">
                    <p>
                      Already have an account?
                      <Link className="no-account" to="/login">
                        Sign In
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

export default SignUp;
