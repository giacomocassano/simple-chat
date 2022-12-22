import styled from 'styled-components';

export const SChat = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;

  .content {
    flex-grow: 1;
    overflow-y: scroll;
    margin-bottom: 1.5rem;
  }

  .copy {
    color: ${(p) => p.theme.accent};
    cursor: pointer;

    &:hover {
      transform: scale(1.2);
    }
  }
`;

export const SMessage = styled.div`
  position: relative;
  padding: 0.5em;
  margin: auto 0.3rem;

  .message-title {
    font-weight: light;
    padding: 0.2em 0.2em 0.2em 0.4em;
    color: ${(p) => p.theme.primary};
  }

  .card {
    border: none;
    background-color: rgba(${(p) => p.theme.accentRGB}, 0.4);
    border-radius: ${(props) => (props.isUser ? '1em 0.15em 1em 1em' : '0.15em 1em 1em 1em')};

    .card-body {
      padding: 0.5em;
    }

    .card-title {
      color: ${(p) => p.theme.primary};
    }
  }
`;
