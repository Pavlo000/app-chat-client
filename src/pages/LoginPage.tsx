import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';

import { AuthContext } from '../components/AuthContext';
import { usePageError } from '../hooks/usePageError';
import { validation } from '../utils/validation';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = usePageError('');
  const { login, loginWithGoogle } = useContext(AuthContext);

  const handleClickGoogle = () => {
    loginWithGoogle()
      .then(() => navigate(location.state?.from?.pathname || "/"))
      .catch((error) => {
        if (error.response?.data?.message) {
          setError(error.response?.data?.message);
        }
      });
  };

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validateOnMount={true}
        onSubmit={({ email, password }) => {
          return login({ email, password })
            .then(() => {
              navigate(location.state?.from?.pathname || '/');
            })
            .catch((error) => {
              setError(error.response?.data?.message);
            });
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form className="box">
            <h1 className="title">Log in</h1>
            <div className="field">
              <label htmlFor="email" className="label">
                Email
              </label>

              <div className="control has-icons-left has-icons-right">
                <Field
                  validate={validation.validateEmail}
                  name="email"
                  type="email"
                  id="email"
                  placeholder="e.g. bobsmith@gmail.com"
                  className={cn('input', {
                    'is-danger': touched.email && errors.email,
                  })}
                />

                <span className="icon is-small is-left">
                  <i className="fa fa-envelope"></i>
                </span>

                {touched.email && errors.email && (
                  <span className="icon is-small is-right has-text-danger">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                )}
              </div>

              {touched.email && errors.email && (
                <p className="help is-danger">{errors.email}</p>
              )}
            </div>
            <div className="field">
              <label htmlFor="password" className="label">
                Password
              </label>

              <div className="control has-icons-left has-icons-right">
                <Field
                  validate={validation.validatePassword}
                  name="password"
                  type="password"
                  id="password"
                  placeholder="*******"
                  className={cn('input', {
                    'is-danger': touched.password && errors.password,
                  })}
                />

                <span className="icon is-small is-left">
                  <i className="fa fa-lock"></i>
                </span>

                {touched.password && errors.password && (
                  <span className="icon is-small is-right has-text-danger">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                )}
              </div>

              {touched.password && errors.password ? (
                <p className="help is-danger">{errors.password}</p>
              ) : (
                <p className="help">At least 6 characters</p>
              )}
            </div>

            <div className="field">
              <div className="buttons">
                <button
                  type="submit"
                  className={cn('button is-success has-text-weight-bold', {
                    'is-loading': isSubmitting,
                  })}
                  disabled={isSubmitting || !!errors.email || !!errors.password}
                >
                  Log in
                </button>

                <button
                  type="button"
                  className="button is-warning has-text-weight-bold"
                  onClick={handleClickGoogle}
                >
                  With Google
                </button>
              </div>
            </div>
            Do not have an account? <Link to="/sign-up">Sign up</Link>
          </Form>
        )}
      </Formik>

      {error && <p className="notification is-danger is-light">{error}</p>}
    </>
  );
};
