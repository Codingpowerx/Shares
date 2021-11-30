import React, { Fragment, useEffect, useState } from 'react';
import MetaData from './layouts/MetaData';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, clearErrors } from '../actions/userActions';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, message, loading } = useSelector(
    state => state.forgotPassword
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }
  }, [alert, dispatch, error, message]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('email', email);

    dispatch(forgotPassword(formData));
  };

  return (
    <Fragment>
      <MetaData title={'Forgot password'} />

      <form className="forgot" onSubmit={submitHandler}>
        <div className="form-forgot">
          <div className="host__form">
            <h2 className="h2-log">forgot password?</h2>
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

          <button
            className="btn-forgot"
            type="submit"
            disabled={loading ? true : false}
          >
            Send Email
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default ForgotPassword;
