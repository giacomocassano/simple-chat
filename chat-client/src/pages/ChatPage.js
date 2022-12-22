import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Div100vh from 'react-div-100vh';
import Chat from '../components/chat/Chat';
import Participants from '../components/participants/Participants';
import {SocketContext} from '../store/SocketContext';
import {PageContainer} from '../styles/Common.styles';

const ChatPage = () => {
  const {closeSocket} = React.useContext(SocketContext);

  React.useEffect(() => {
    return () => {
      closeSocket();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Div100vh>
      <PageContainer fill='true' dark='true' className='h-100'>
        <Container fluid className='h-100'>
          <Row className='h-100'>
            <Col md={8} sm={12} className='h-100'>
              <Chat />
            </Col>
            <Col md={4} sm={12} className='h-100'>
              <Participants />
            </Col>
          </Row>
        </Container>
      </PageContainer>
    </Div100vh>
  );
};

export default ChatPage;
