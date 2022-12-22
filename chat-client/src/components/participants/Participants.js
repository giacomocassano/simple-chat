import React, {useContext} from 'react';
import {SParticipants, SParticipantItem} from './Participants.styles';
import {SocketContext} from '../../store/SocketContext';

const Participants = () => {
  const {participants} = useContext(SocketContext);

  return (
    <SParticipants>
      <h5 className='title'>Participants ({participants.length})</h5>
      <div className='participants-list'>
        {participants.map((p, i) => (
          <Participant key={i} user={p} />
        ))}
      </div>
    </SParticipants>
  );
};

const Participant = ({user}) => {
  return (
    <SParticipantItem className='px-2 py-1'>
      <div className='d-flex flex-row justify-content-between'>
        <div className='d-flex flex-row'>
          <div className='d-flex align-items-center'>
            <i className='icon-avatar fas fa-user p-2 me-1' />
          </div>
          <span>{user}</span>
        </div>
      </div>
    </SParticipantItem>
  );
};

export default Participants;
