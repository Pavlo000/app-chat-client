import { Formik, Field, Form, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import { compressImage, convertToBase64 } from '../utils/compressImage';
import { ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { usePageError } from '../hooks/usePageError';
import { AxiosError } from 'axios';
import { IErrorResponse } from '../types/IErrorResponse';
import { validation } from '../utils/validation';
import cn from 'classnames';


export const AccountActivationForm: React.FC = () => {
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

  const handleSubmit = ({ firstName, lastName }: { firstName: string, lastName: string }, formikHelpers: FormikHelpers<{ firstName: string, lastName: string }>) => {
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
        .catch((error: AxiosError<IErrorResponse>) => {
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
  };

  return (
    <div className="PageForm">
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
        }}
        validateOnMount={true}
        onSubmit={handleSubmit}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form className="PageForm__form">
            <h2 className="PageForm__title">Personal Info</h2>
            <div className="PageForm__field">
              <label htmlFor="firstName" className="PageForm__field-label">
                First Name
              </label>

              <div className="PageForm__field-control">
                <Field
                  validate={validation.validateFirstName}
                  name="firstName"
                  type="text"
                  id="firstName"
                  placeholder="e.g. Bob"
                  className={cn('PageForm__field-input', {
                    'PageForm__field-input--danger': touched.firstName && errors.firstName,
                  })}
                />

                {touched.firstName && errors.firstName ? (
                  <i className="fas fa-exclamation-triangle"></i>
                ) : (
                  <i className="fas fa-user"></i>
                )}
              </div>

              {touched.firstName && errors.firstName && (
                <p className="PageForm__field-error">{errors.firstName}</p>
              )}
            </div>

            <div className="PageForm__field">
              <label htmlFor="lastName" className="PageForm__field-label">
                Last Name
              </label>

              <div className="PageForm__field-control">
                <Field
                  validate={validation.validateLastName}
                  name="lastName"
                  type="text"
                  id="lastName"
                  placeholder="Last Name"
                  className={cn('PageForm__field-input', {
                    'PageForm__field-input--danger': touched.lastName && errors.lastName,
                  })}
                />

                {touched.lastName && errors.lastName ? (
                  <i className="fas fa-exclamation-triangle"></i>
                ) : (
                  <i className="fas fa-user"></i>
                )}
              </div>

              {touched.lastName && errors.lastName && (
                <p className="PageForm__field-error">{errors.lastName}</p>
              )}
            </div>
            <div className="PageForm__field">
              <label htmlFor="avatar" className="PageForm__field-label">
                Avatar
              </label>

              <div className="PageForm__field-control">
                <Field
                  type="file"
                  accept="image/jpeg, image/jpg"
                  onChange={handleImageUpload}
                  multiple={false}
                  name="avatar"
                  id="avatar"
                  placeholder="Avatar"
                  className={cn('PageForm__field-input', 'PageForm__field-input--download')}
                />

                <i className="fa fa-user"></i>
              </div>

              {selectedImage && (
                <p className="PageForm__field-success">{selectedImage}</p>
              )}
            </div>
            <div className="PageForm__field">
              <div className="PageForm__field-control">
                <button
                  type="submit"
                  className={cn('PageForm__button', {
                    'PageForm__button--loading': isSubmitting,
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