import { Field, Form, Formik, FormikHelpers } from 'formik';
import { ChangeEvent, useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { userService } from '../../services/userService';
import { usePageError } from '../../hooks/usePageError';
import { AxiosError } from 'axios';
import { IErrorResponse } from '../../types/IErrorResponse';
import { compressImage, convertToBase64 } from '../../utils/compressImage';
import { validation } from '../../utils/validation';
import cn from 'classnames';


export const ProfileForm: React.FC = () => {
  const { user, setUser } = useContext(AuthContext);
  const [base64Image, setBase64Image] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [, setError] = usePageError();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/" />;
  }

  const onSubmit = (values: { avatar: string; firstName: string; lastName: string }, formikHelpers: FormikHelpers<{ avatar: string; firstName: string; lastName: string }>) => {
    formikHelpers.setSubmitting(true);

    const userData = {
      firstName: values.firstName,
      lastName: values.lastName,
      avatar: base64Image,
    };

    userService.update(user.id, userData)
      .then((response) => {
        const { data } = response;

        setUser(data);
        navigate('/profile');
      })
      .catch((error: AxiosError<IErrorResponse>) => {
        setError(error.response?.data.message || 'Error updating user');
      })
      .finally(() => {
        formikHelpers.setSubmitting(false);
      });
  };

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
    <div className="ScreenForm">
      <Formik
        initialValues={{
          avatar: '',
          firstName: user.firstName,
          lastName: user.lastName,
        }}
        validateOnMount={true}
        onSubmit={onSubmit}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form className="ScreenForm__form">
            <h1 className="ScreenForm__title">Edit Profile</h1>

            <div className="ScreenForm__field">
              <label htmlFor="avatar" className="ScreenForm__label">
                Avatar
              </label>

              <div className="ScreenForm__control">
                <Field
                  name="avatar"
                  type="file"
                  id="avatar"
                  multiple={false}
                  accept="image/jpeg, image/jpg"
                  onChange={handleImageUpload}
                  placeholder="Upload avatar"
                  className={cn('ScreenForm__input', 'ScreenForm__input--download')}
                />

                {touched.avatar && errors.avatar ? (
                  <span className="ScreenForm__icon ScreenForm__icon--danger">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                ): (
                  <span className="ScreenForm__icon">
                    <i className="fa fa-user-circle"></i>
                  </span>
                )}

                {selectedImage && (
                  <p className="ScreenForm__message">{selectedImage}</p>
                )}
              </div>

              {touched.avatar && errors.avatar && (
                <p className="ScreenForm__message ScreenForm__message--danger">{errors.avatar}</p>
              )}
            </div>
            <div className="ScreenForm__field">
              <label htmlFor="firstName" className="ScreenForm__label">
                First Name
              </label>

              <div className="ScreenForm__control">
                <Field
                  name="firstName"
                  type="text"
                  id="firstName"
                  placeholder="e.g. Bob"
                  validate={validation.validateFirstName}
                  className={cn('ScreenForm__input', {
                    'ScreenForm__input--danger': touched.firstName && errors.firstName,
                  })}
                />

                {touched.firstName && errors.firstName ? (
                  <span className="ScreenForm__icon ScreenForm__icon--danger">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                ) : (
                  <span className="ScreenForm__icon">
                    <i className="fa fa-user"></i>
                  </span>
                )}
              </div>

              {touched.firstName && errors.firstName && (
                <p className="ScreenForm__message ScreenForm__message--danger">{errors.firstName}</p>
              )}
            </div>
            <div className="ScreenForm__field">
              <label htmlFor="lastName" className="ScreenForm__label">
                Last Name
              </label>

              <div className="ScreenForm__control">
                <Field
                  name="lastName"
                  type="text"
                  id="lastName"
                  placeholder="e.g. Smith"
                  validate={validation.validateLastName}
                  className={cn('ScreenForm__input', {
                    'ScreenForm__input--danger': touched.lastName && errors.lastName,
                  })}
                />

                {touched.lastName && errors.lastName ? (
                  <span className="ScreenForm__icon ScreenForm__icon--danger">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                ) : (
                  <span className="ScreenForm__icon">
                    <i className="fa fa-user"></i>
                  </span>
                )}
              </div>

              {touched.lastName && errors.lastName && (
                <p className="ScreenForm__message ScreenForm__message--danger">{errors.lastName}</p>
              )}
            </div>
            <div className="ScreenForm__submit">
              <button
                type="submit"
                className={cn('ScreenForm__button', {
                  'ScreenForm__button--loading': isSubmitting,
                })}
                disabled={isSubmitting || !!errors.avatar || !!errors.firstName || !!errors.lastName}
              >
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};