import styled from 'styled-components';

export const SParticipants = styled.div`
  color: ${(p) => p.theme.textPrimary};
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  overflow: auto;

  .participants-list {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    height: 100%;
    overflow-y: auto;
  }

  .title {
    font-size: 1.2rem;
    margin: 0.5rem auto;
    font-weight: bold;
  }

  .icon-avatar {
    background-color: ${(p) => p.theme.textPrimary};
    color: ${(p) => p.theme.accent};

    border-radius: 99em;
    height: 2rem;
    width: 2rem;

    display: flex;
    justify-items: center;
    align-items: center;
  }

  .icon-button {
    color: red;
    cursor: pointer;
  }
`;

export const SParticipantItem = styled.div`
  font-size: 1.2rem;
  padding: 0.2rem;
`;
