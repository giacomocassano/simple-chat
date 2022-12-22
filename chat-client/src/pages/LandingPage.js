import React, {useContext, useEffect} from 'react';
import {PageContainer, PrimaryButton, SForm, LightButton} from '../styles/Common.styles';
import {Container, Row, Col} from 'react-bootstrap';
import {AuthContext} from '../store/AuthContext';
import {useNavigate} from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const {username, tryLoginFromStorage, login, logout} = useContext(AuthContext);

  const [inputUsername, setInputUsername] = React.useState('');

  useEffect(() => {
    if (!username) tryLoginFromStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onConfirmHandle = () => {
    if (inputUsername) {
      login(inputUsername);
      navigate('/home');
    }
  };

  return (
    <PageContainer fill='true' dark='true' className='d-flex flex-column justify-content-center'>
      <Container>
        <Row className='d-flex justify-content-center'>
          <Col xs={12} sm={6}>
            <h1 className='text-center'>Simple chat</h1>
            {username ? (
              <>
                <p className='fs-5'>Welcome back {username}</p>
                <PrimaryButton className='mt-2 w-100' onClick={() => navigate('/home')}>
                  Go to home
                </PrimaryButton>
                <LightButton className='mt-2 w-100' onClick={logout}>
                  Logout
                </LightButton>
              </>
            ) : (
              <>
                <SForm.Group className='mt-3'>
                  <SForm.Label>Username</SForm.Label>
                  <SForm.Control type='text' placeholder='Enter username' value={inputUsername} onChange={(e) => setInputUsername(e.target.value)} />
                </SForm.Group>
                <PrimaryButton className='mt-2 w-100' onClick={onConfirmHandle}>
                  Confirm
                </PrimaryButton>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </PageContainer>
  );
};

export default LandingPage;
