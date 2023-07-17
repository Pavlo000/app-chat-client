/* eslint-disable react-hooks/exhaustive-deps */
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../components/AuthContext";
import { useParams } from "react-router-dom";
import { MessageList } from "../components/DirectPage/MessageList";
import { IChat, IMessage, IUser } from "../types";
import { Loader } from "../components/Loader";
import { ErrorMessage } from "../components/ErrorMessage";
import { messageService } from "../services/messageService";
import socket from "../socket";

export const DirectPage: React.FC = () => {
  const { chatId } = useParams();
  const { user: currentUser } = useContext(AuthContext);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [chat, setChat] = useState<IChat | null>(null);
  const [receiver, setReceiver] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    }
  }, []);

  useEffect(() => {
    if (chatId) {
      (async () => {
        try {
          setIsLoading(true);
          const { messages: messagesFromServer, chat: chatFromServer } =
            await messageService.getAll(chatId) as any as { messages: IMessage[], chat: IChat };

          setMessages(messagesFromServer);
          setChat(chatFromServer);
          setIsLoading(false);
        } catch (error: any) {
          setError(error);
          setIsLoading(false);
        }
      })();

      if (chat && currentUser) {
        setReceiver(chat.users.find(user => user.id !== currentUser.id) || null);
      }
    }
  }, [!!chat]);

  useEffect(() => {
    if (box.current) {
      box.current.scrollTop = box.current.scrollHeight;
    }

    if (chat) {
      socket.on(`sendMessageTo-${chat.id}`, (message) => {
        setMessages([...messages, message]);
      });

      return () => {
        socket.off(`sendMessageTo-${chat.id}`);
      }
    }
  }, [messages.length]);

  const handleSubmit = ({ message }: { message: string }, formikHelpers: FormikHelpers<{ message: string }>) => {
    formikHelpers.setSubmitting(true);
    if (message && chat && currentUser && receiver) {

      socket.emit('sendMessage', {
        label: message,
        userId: currentUser.id,
        chatId: chat.id,
        receiverId: receiver.id,
      });
    }

    formikHelpers.resetForm();
  }

  return (
    <>
      {isLoading && !receiver && <Loader />}
      {error && <ErrorMessage error={error} />}
      {receiver && (
        <>
          <div className="box">
            <h2 className="subtitle">{receiver.name} {receiver.surname}</h2>
          </div>

          <div ref={box} className="box has-background-success-light chat-box">
            <MessageList messages={messages} />
          </div>

          <Formik
            initialValues={{
              message: '',
            }}
            onSubmit={handleSubmit}>
            {(touched) => (
              <Form>
                <div className="field has-addons">
                  <div className="control is-expanded">
                    <Field
                      className="input"
                      type="text"
                      name="message"
                      id="message"
                      placeholder="Send a message..."
                    />
                  </div>
                  <div className="control">
                    <button className="button is-primary" type="submit" disabled={!touched.values.message}>
                      Send
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </>
      )}
    </>
  )
}