import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import cn from 'classnames';

import { authService } from '../services/authService';
import { usePageError } from '../hooks/usePageError';
import { validation } from '../utils/validation';
import { AxiosError } from 'axios';
import { IErrorResponse } from '../types/IErrorResponse';

export const RegistrationForm: React.FC = () => {
  const [, setError] = usePageError();
  const [registered, setRegistered] = useState(false);

  if (registered) {
    return (
      <section className="PageForm__message">
        <h1 className="PageForm__message-title">Check your email</h1>
        <p className="PageForm__message-text">We have sent you an email with the activation link</p>
      </section>
    );
  }

  const handleSubmit = ({ email, password }: { email: string, password: string }, formikHelpers: FormikHelpers<{ email: string, password: string }>) => {
    formikHelpers.setSubmitting(true);

    authService
      .register({ email, password })
      .then(() => {
        setRegistered(true);
      })
      .catch((error: AxiosError<IErrorResponse>) => {
        const { errors = {}, message } = error.response?.data || {};

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
            <h1 className="PageForm__title">Sign up</h1>
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

              {touched.email && errors.email ? (
                <p className="PageForm__field-error">{errors.email}</p>
              ) : (
                <p className="PageForm__field-help">Enter your email</p>
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
                  Sign up
              </button>
            </div>
            <p className="PageForm__clue">
              Already have an account? <Link className="PageForm__clue-link" to="/login">Log in</Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};
