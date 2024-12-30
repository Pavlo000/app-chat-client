import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import cn from 'classnames';

import { AuthContext } from '../context/AuthContext';
import { usePageError } from '../hooks/usePageError';
import { validation } from '../utils/validation';
import { IErrorResponse } from '../types/IErrorResponse';
import { AxiosError } from 'axios';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [, setError] = usePageError();
  const { login } = useContext(AuthContext);

  const handleSubmit = ({ email, password }: { email: string, password: string }, formikHelpers: FormikHelpers<{ email: string, password: string }>) => {
    formikHelpers.setSubmitting(true);

    return login({ email, password })
      .then(() => {
        navigate(location.state?.from?.pathname || '/');
      })
      .catch((error: AxiosError<IErrorResponse>) => {
        const { message, errors = {} } = error.response?.data || {};
        if (Object.keys(errors).length > 0) {
          formikHelpers.setFieldError('email', errors?.email);
          formikHelpers.setFieldError('password', errors?.password);
        } else if (message) {
          setError(message);
        }
      })
      .finally(() => {
        formikHelpers.setSubmitting(false);
      });
  };

  return (
    <div className="PageForm">
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validateOnMount={true}
        onSubmit={handleSubmit}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form className="PageForm__form">
            <h2 className="PageForm__title">Log in</h2>
            <div className="PageForm__field">
              <label htmlFor="email" className="PageForm__field-label">
                Email
              </label>

              <div className="PageForm__field-control">
                <Field
                  validate={validation.validateEmail}
                  name="email"
                  type="email"
                  id="email"
                  placeholder="e.g. bobsmith@gmail.com"
                  className={cn('PageForm__field-input', {
                    'PageForm__field-input--danger': touched.email && errors.email,
                  })}
                />

                {touched.email && errors.email ? (
                  <i className="fas fa-exclamation-triangle"></i>
                ) : (
                  <i className="fa fa-envelope"></i>
                )}
              </div>

              {touched.email && errors.email && (
                <p className="PageForm__field-error">{errors.email}</p>
              )}
            </div>
            <div className="PageForm__field">
              <label htmlFor="password" className="PageForm__field-label">
                Password
              </label>

              <div className="PageForm__field-control">
                <Field
                  validate={validation.validatePassword}
                  name="password"
                  type="password"
                  id="password"
                  placeholder="*******"
                  className={cn('PageForm__field-input', {
                    'PageForm__field-input--danger': touched.password && errors.password,
                  })}
                />

                {touched.password && errors.password ? (
                  <i className="fas fa-exclamation-triangle"></i>
                ) : (
                  <i className="fa fa-lock"></i>
                )}
              </div>

              {touched.password && errors.password ? (
                <p className="PageForm__field-error">{errors.password}</p>
              ) : (
                <p className="PageForm__field-help">At least 6 characters</p>
              )}
            </div>
            <div className="PageForm__buttons">
              <button
                type="submit"
                className={cn('PageForm__button', {
                  'PageForm__button--loading': isSubmitting,
                })}
                disabled={isSubmitting || !!errors.email || !!errors.password}
              >
                Log in
              </button>
            </div>
            <p className="PageForm__clue">Do not have an account? 
              <Link to="/sign-up" className="PageForm__clue-link">Sign up</Link>
            </p>
          </Form>
        )}
      </Formik>
  </div>
  );
};
