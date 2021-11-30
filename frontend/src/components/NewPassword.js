import React, { Fragment, useEffect, useState } from 'react';
import MetaData from './layouts/MetaData';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, clearErrors } from '../actions/userActions';

const NewPassword = ({ history, match }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, success } = useSelector(state => state.forgotPassword);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success('Password Updated Successfully');
      history.push('/login');
    }
  }, [alert, dispatch, error, success, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('password', password);
    formData.set('confirmPassword', confirmPassword);

    dispatch(resetPassword(match.params.token, formData));
  };

  return (
    <Fragment>
      <MetaData title={'New password Reset'} />

      <form className="forgot" onSubmit={submitHandler}>
        <div className="form-forgot">
          <div className="host__form">
            <h2 className="h2-log">Password Reset</h2>
          </div>

          <div className="wrap-style">
            <input
              className="log-input"
              type="password"
              placeholder="password"
                required
                value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="wrap-style">
            <input
              className="log-input"
              type="password"
              placeholder="confirm password"
                required
                value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button className="btn-forgot" type="submit">
            Confirm
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default NewPassword;
