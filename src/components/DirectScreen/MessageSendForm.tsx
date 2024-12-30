import { Formik, Form, Field, FormikHelpers } from 'formik';
import socket from '../../socket';
import { IChat, IUser } from '../../types';

type Props = {
  currentUser: IUser;
  chat: IChat;
}

export const MessageSendForm: React.FC<Props> = ({ currentUser, chat }) => {
  const onSubmit = (
    { message, chatId, userId }: { message: string, chatId: string, userId: string },
    formikHelpers: FormikHelpers<{ message: string, chatId: string, userId: string }>,
  ) => {

    socket.emit('sendMessage', { message, chatId, userId });
    formikHelpers.resetForm();
  };

  return (
    <div className="MessageSendForm">
      <Formik
        initialValues={{
          message: '',
          chatId: chat.id,
          userId: currentUser.id,
        }}
        onSubmit={onSubmit}
      >
        {(touched) => (
          <Form className="MessageSendForm__form">
            <div className="MessageSendForm__input-wrapper">
              <Field
                className="MessageSendForm__input"
                type="text"
                name="message"
                id="message"
                placeholder="Send a message..."
              />
            </div>
            <div className="MessageSendForm__button-wrapper">
              <button
                className="MessageSendForm__button"
                type="submit"
                disabled={!touched.values.message}
              >
                Send
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
