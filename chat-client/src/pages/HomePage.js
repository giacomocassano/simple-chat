import React from 'react';
import {Error, PageContainer, PrimaryButton, SForm} from '../styles/Common.styles';
import {Container, Row, Col} from 'react-bootstrap';
import {SocketContext} from '../store/SocketContext';
import {AuthContext} from '../store/AuthContext';

const HomePage = () => {
  const [joinRoom, setJoinRoom] = React.useState('');
  const [createRoom, setCreateRoom] = React.useState('');

  const {username} = React.useContext(AuthContext);
  const {initSocket, error, resetError} = React.useContext(SocketContext);

  const onCreateNewRoomHandle = () => {
    initSocket(username, createRoom, null, 'create');
  };

  const onJoinRoomHandle = () => {
    initSocket(username, null, joinRoom, 'join');
  };

  React.useEffect(() => {
    return () => resetError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContainer fill='true' dark='true' className='d-flex flex-column justify-content-center'>
      <Container>
        <Row className='d-flex justify-content-center'>
          <Col xs={12} sm={6}>
            <h1 className='text-center'>Simple chat</h1>
            <p className='fs-5'>Please {username}, choose whether to create a new room or join one.</p>
            <h2 className='mt-5'>Create a new room</h2>
            <div className='d-flex flex-row justify-content-between align-items-center gap-2 mt-3'>
              <SForm.Group className='flex-grow-1'>
                <SForm.Label>Room name</SForm.Label>
                <SForm.Control type='text' placeholder='Enter room name' value={createRoom} onChange={(e) => setCreateRoom(e.target.value)} />
              </SForm.Group>
              <PrimaryButton disabled={createRoom.length === 0} onClick={onCreateNewRoomHandle}>
                Create
              </PrimaryButton>
            </div>

            <h2 className='mt-5'>Join an existing room</h2>
            <div className='d-flex flex-row justify-content-between align-items-center gap-2 mt-3'>
              <SForm.Group className='flex-grow-1'>
                <SForm.Label>Room code</SForm.Label>
                <SForm.Control type='text' placeholder='Enter room code' value={joinRoom} onChange={(e) => setJoinRoom(e.target.value)} />
              </SForm.Group>
              <PrimaryButton disabled={joinRoom.length === 0} onClick={onJoinRoomHandle}>
                Join
              </PrimaryButton>
            </div>
            {error && <Error className='mt-3'>{error}</Error>}
          </Col>
        </Row>
      </Container>
    </PageContainer>
  );
};

export default HomePage;
