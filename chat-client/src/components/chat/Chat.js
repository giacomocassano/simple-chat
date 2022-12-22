import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {SocketContext} from '../../store/SocketContext';
import {AuthContext} from '../../store/AuthContext';
import classNames from 'classnames';
import moment from 'moment';
import {Card} from 'react-bootstrap';
import {SChat, SMessage} from './Chat.styles';
import {PrimaryButton, SForm} from '../../styles/Common.styles';
import CopyToClipboard from 'react-copy-to-clipboard';
import {toast} from 'react-hot-toast';

const Chat = () => {
  const {messages, room, emit} = useContext(SocketContext);

  const [message, setMessage] = useState('');
  const bottomRef = useRef(null);
  const messageList = useMemo(() => Object.values(messages), [messages]);

  useEffect(() => {
    //Scroll to bottom every time the component appears
    bottomRef.current?.scrollIntoView();
  }, []);

  const onSendHandler = () => {
    if (message) {
      emit('chat:message', {message});
      setMessage('');
    }
  };

  return (
    <SChat>
      <div className='d-flex gap-1 fs-2'>
        <span>Chat room:</span>
        <span className='fw-bold'>{room.name}</span>
      </div>
      <div className='d-flex gap-1'>
        <span>Room code:</span>
        <span className='fst-italic'>{room.uuid}</span>
        <CopyToClipboard text={room.uuid} onCopy={() => toast('Code copied to clipboard')}>
          <i className='copy fas fa-copy fs-5' />
        </CopyToClipboard>
      </div>
      <div className='content'>
        {messageList.map((item, index) => (
          <Message key={index} message={item} />
        ))}
        <div ref={bottomRef} />
      </div>
      <div className='d-flex justify-content-between align-items-center'>
        <SForm.Control className='p-3 fs-5' type='text' placeholder='Message' value={message} onChange={(e) => setMessage(e.target.value)} />
        <PrimaryButton className='h-100 d-flex align-items-center' onClick={onSendHandler}>
          <i className='fas fa-paper-plane fs-4' />
        </PrimaryButton>
      </div>
    </SChat>
  );
};

const Message = ({message}) => {
  const {username} = useContext(AuthContext);

  const isUser = message.username === username;

  return (
    <SMessage isUser={isUser}>
      {!isUser && <span className='fw-bold'>{message.username}</span>}
      <Card
        className={classNames({
          'ms-4': isUser,
          'me-4': !isUser,
        })}
      >
        <Card.Body>
          <Card.Text className='fs-5'>{message.text}</Card.Text>
          <div className='d-flex justify-content-end fst-italic'>
            <span>{moment(message.updatedAt).format('DD/MM/YYYY hh:mm')}</span>
          </div>
        </Card.Body>
      </Card>
    </SMessage>
  );
};

export default Chat;
