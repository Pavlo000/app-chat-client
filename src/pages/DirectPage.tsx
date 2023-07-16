/* eslint-disable react-hooks/exhaustive-deps */
import { Field, Form, Formik } from "formik";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../components/AuthContext";
import { useParams } from "react-router-dom";
import socket from "../socket";
import { MessageList } from "../components/DirectPage/MessageList";
import { chatService } from "../services/chatService";
import { IChat, IMessage, IUser } from "../types";
import { Loader } from "../components/Loader";
import { ErrorMessage } from "../components/ErrorMessage";

export const DirectPage: React.FC = () => {
  const { chatId } = useParams();
  const { user: currentUser } = useContext(AuthContext);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [receiver, setReceiver] = useState<IUser | null>(null);
  const [chat, setChat] = useState<IChat | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      const token = localStorage.getItem('accessToken');

      socket.emit('authSocket', token);
    });

    socket.emit('getAllMessages', chatId);
    socket.on('getAllMessages', setMessages);

    console.log(messages);

    return () => {
      socket.off('authSocket');
      socket.off('getAllMessages');
      socket.off('connect');
    }
  
  }, [messages.length]);


  useEffect(() => {
    if (chatId && currentUser) {
      (async () => {
        try {
          setIsLoading(true);
          const chatFromServer = await chatService.getById(chatId) as any as IChat;

          setChat(chatFromServer);
          setIsLoading(false);
          const receiver = chat?.users.find(user => user.id !== currentUser.id) as IUser;
          setReceiver(receiver);
        } catch (error: any) {
          setIsLoading(false);
          setError(error.response?.data?.message);
        }
      })();

      socket.on('chatMessage', (message: IMessage) => {
        setMessages([...messages, message])
      });
    }

    return () => {
      socket.off('chatMessage');
    }
  }, [!!chat, messages.length]);

  useEffect(() => {
    if (box.current) {
      box.current.scrollTop = box.current.scrollHeight;
    }
  }, [messages.length]);

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
            onSubmit={({ message }, formikHelpers) => {
              formikHelpers.setSubmitting(true);
              if (currentUser) {
                socket.emit('chatMessage', {
                  label: message,
                  chatId: chat?.id,
                  userId: currentUser.id,
                });
              }
              formikHelpers.resetForm();
            }}>
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