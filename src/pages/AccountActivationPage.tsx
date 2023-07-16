import { Field, Form, Formik } from 'formik';
import { ChangeEvent, useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import cn from 'classnames';

import { AuthContext } from '../components/AuthContext';
import { Loader } from '../components/Loader';
import { validation } from '../utils/validation';
import { compressImage, convertToBase64 } from '../utils/compressImage';


export const AccountActivationPage: React.FC = () => {
  const navigate = useNavigate();
  const [base64Image, setBase64Image] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(true);

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

  if (!done) {
    return <Loader />
  }

  return (
    <>
      <h1 className="title">Account activation</h1>

      {error ? (
        <p className="notification is-danger is-light">
          {error}
        </p>
      ) : (
        <Formik
          initialValues={{
            name: '',
            surname: '',
          }}
          validateOnMount={true}
          onSubmit={({ name, surname }) => {
            const userData = {
              name,
              surname,
              avatar: base64Image,
            };

            if (activationToken) {
              setDone(false);
              return activate(activationToken, userData)
                .catch(error => {
                  setError(error.response?.data?.message || 'Wrong activation link');
                })
                .finally(() => {
                  setDone(true);
                  navigate('/');
                });
            }
          }}
        >
          {({ touched, errors, isSubmitting }) => (
            <Form className="box">
              <h2 className="subtitle">Personal Info</h2>
              <div className="field">
                <label htmlFor="name" className="label">
                  Name
                </label>

                <div className="control has-icons-left has-icons-right">
                  <Field
                    validate={validation.validateName}
                    name="name"
                    type="text"
                    id="name"
                    placeholder="e.g. Bob"
                    className={cn('input', {
                      'is-danger': touched.name && errors.name,
                    })}
                  />

                  <span className="icon is-small is-left">
                    <i className="fa fa-user"></i>
                  </span>

                  {touched.name && errors.name && (
                    <span className="icon is-small is-right has-text-danger">
                      <i className="fas fa-exclamation-triangle"></i>
                    </span>
                  )}
                </div>

                {touched.name && errors.name && (
                  <p className="help is-danger">{errors.name}</p>
                )}
              </div>

              <div className="field">
                <label htmlFor="surname" className="label">
                  Surrname
                </label>

                <div className="control has-icons-left has-icons-right">
                  <Field
                    validate={validation.validateSurname}
                    name="surname"
                    type="text"
                    id="surname"
                    placeholder="Surname"
                    className={cn('input', {
                      'is-danger': touched.surname && errors.surname,
                    })}
                  />

                  <span className="icon is-small is-left">
                    <i className="fa fa-user"></i>
                  </span>

                  {touched.surname && errors.surname && (
                    <span className="icon is-small is-right has-text-danger">
                      <i className="fas fa-exclamation-triangle"></i>
                    </span>
                  )}
                </div>

                {touched.surname && errors.surname && (
                  <p className="help is-danger">{errors.surname}</p>
                )}
              </div>
              <div className="field">
                <label htmlFor="surname" className="label">
                  Avatar
                </label>

                <div className="control has-icons-left has-icons-right">
                  <Field
                    type="file"
                    accept="image/jpeg, image/jpg"
                    onChange={handleImageUpload}
                    name="avatar"
                    id="avatar"
                    placeholder="Avatar"
                    className={cn('download','input')}
                  />

                  <span className="icon is-small is-left">
                    <i className="fa fa-user"></i>
                  </span>
                </div>

                {selectedImage && (
                  <p className="help is-success">{selectedImage}</p>
                )}

                {error && (
                  <p className="help is-danger">{error}</p>
                )}
              </div>
              <div className="field">
                <div className="buttons">
                  <button
                    type="submit"
                    className={cn('button is-success has-text-weight-bold', {
                      'is-loading': isSubmitting,
                    })}
                    disabled={isSubmitting || !!errors.surname || !!errors.surname}
                  >
                    Activate account
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};
