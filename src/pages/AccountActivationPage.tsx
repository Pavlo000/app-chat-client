import { Field, Form, Formik } from 'formik';
import { ChangeEvent, useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import cn from 'classnames';

import { AuthContext } from '../context/AuthContext';
import { validation } from '../utils/validation';
import { compressImage, convertToBase64 } from '../utils/compressImage';
import { usePageError } from '../hooks/usePageError';
import { IError } from '../types/IError';
import { AxiosError } from 'axios';

export const AccountActivationPage: React.FC = () => {
  const navigate = useNavigate();
  const [base64Image, setBase64Image] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [, setError] = usePageError();

  const { activate } = useContext(AuthContext);
  const { activationToken } = useParams();

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      try {
        const compressedImage = await compressImage(file);
        const base64String = await convertToBase64(compressedImage);
        setBase64Image(base64String);

        setSelectedImage(file.name);
      } catch (error) {
        console.log(error);
        setError('Error compressing or converting image');
      }
    }
  };

  return (
    <div className="Page">
      <h1 className="title">Account activation</h1>


      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
        }}
        validateOnMount={true}
        onSubmit={({ firstName, lastName }, formikHelpers) => {
          formikHelpers.setSubmitting(true);

          const userData = {
            firstName,
            lastName,
            avatar: base64Image,
          };

          if (activationToken) {
            return activate(activationToken, userData)
              .then(() => {
                navigate('/');
              })
              .catch((error: AxiosError<IError>) => {
                const { message, errors = {} } = error.response?.data || {};
                if (Object.keys(errors).length > 0) {
                  formikHelpers.setFieldError('firstName', errors?.firstName);
                  formikHelpers.setFieldError('lastName', errors?.lastName);

                } else if (message) {
                  setError(message || 'Wrong activation link');
                }
              })
              .finally(() => {
                formikHelpers.setSubmitting(false);
              });
          }
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form className="box">
            <h2 className="subtitle">Personal Info</h2>
            <div className="field">
              <label htmlFor="firstName" className="label">
                First Name
              </label>

              <div className="control has-icons-left has-icons-right">
                <Field
                  validate={validation.validateFirstName}
                  name="firstName"
                  type="text"
                  id="firstName"
                  placeholder="e.g. Bob"
                  className={cn('input', {
                    'is-danger': touched.firstName && errors.firstName,
                  })}
                />

                <span className="icon is-small is-left">
                  <i className="fa fa-user"></i>
                </span>

                {touched.firstName && errors.firstName && (
                  <span className="icon is-small is-right has-text-danger">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                )}
              </div>

              {touched.firstName && errors.firstName && (
                <p className="help is-danger">{errors.firstName}</p>
              )}
            </div>

            <div className="field">
              <label htmlFor="lastName" className="label">
                Last Name
              </label>

              <div className="control has-icons-left has-icons-right">
                <Field
                  validate={validation.validateLastName}
                  name="lastName"
                  type="text"
                  id="lastName"
                  placeholder="Last Name"
                  className={cn('input', {
                    'is-danger': touched.lastName && errors.lastName,
                  })}
                />

                <span className="icon is-small is-left">
                  <i className="fa fa-user"></i>
                </span>

                {touched.lastName && errors.lastName && (
                  <span className="icon is-small is-right has-text-danger">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                )}
              </div>

              {touched.lastName && errors.lastName && (
                <p className="help is-danger">{errors.lastName}</p>
              )}
            </div>
            <div className="field">
              <label htmlFor="avatar" className="label">
                Avatar
              </label>

              <div className="control has-icons-left has-icons-right">
                <Field
                  type="file"
                  accept="image/jpeg, image/jpg"
                  onChange={handleImageUpload}
                  multiple={false}
                  name="avatar"
                  id="avatar"
                  placeholder="Avatar"
                  className={cn('download', 'input')}
                />

                <span className="icon is-small is-left">
                  <i className="fa fa-user"></i>
                </span>
              </div>

              {selectedImage && (
                <p className="help is-success">{selectedImage}</p>
              )}
            </div>
            <div className="field">
              <div className="buttons">
                <button
                  type="submit"
                  className={cn('button is-success has-text-weight-bold', {
                    'is-loading': isSubmitting,
                  })}
                  disabled={
                    isSubmitting || !!errors.firstName || !!errors.lastName
                  }
                >
                  Activate account
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
