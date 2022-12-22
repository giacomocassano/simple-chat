import styled from 'styled-components';
import {Button, Form} from 'react-bootstrap';

export const PageContainer = styled.div`
  background-color: ${(props) => (props.dark ? props.theme.primary : props.theme.textPrimary)};
  min-height: ${(props) => (props.fill ? '100vh' : 'auto')};
  color: ${(props) => (props.dark ? props.theme.textPrimary : props.theme.primary)};
`;

export const PrimaryButton = styled(Button)`
  border-radius: 99em;
  border: none;
  padding: 0.5rem 1rem;
  background-color: ${(p) => p.theme.accent};
  color: ${(p) => p.theme.textPrimary};
  text-transform: lowercase;
  display: flex;
  flex-direction: row;
  justify-content: center;
  transition: none !important;

  &:hover,
  &:focus {
    border: none;
    background-color: ${(p) => p.theme.secondary};
    color: ${(p) => p.theme.textSecondary};
  }
`;

export const LightButton = styled(Button)`
  border-radius: 99em;
  border: 2px solid ${(p) => p.theme.secondary};
  padding: 0.5rem;
  background-color: ${(p) => p.theme.textPrimary};
  color: ${(p) => p.theme.primary};
  text-transform: capitalize;
  display: flex;
  flex-direction: row;
  justify-content: center;
  transition: none !important;

  &:hover,
  &:focus {
    border: 2px solid ${(p) => p.theme.textPrimary};
    background-color: ${(p) => p.theme.secondary};
    color: ${(p) => p.theme.textPrimary};
  }
`;

export const Error = styled.div`
  color: red;
  background-color: ${(p) => p.theme.textPrimary};
  border-radius: 99em;
  padding: 0.5rem;
  text-align: center;
`;

const FormGroup = styled(Form.Group)`
  position: relative;
`;

const FormLabel = styled.label`
  z-index: 1;
  position: absolute;
  margin-top: -0.5rem;
  margin-left: 1.5rem;
  background-color: ${(props) => (props.dark ? props.theme.primary : props.theme.textPrimary)};
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  font-size: 0.875rem;
  border-radius: 99em;
  text-transform: capitalize;
  color: ${(props) => (props.dark ? props.theme.textPrimary : props.theme.primary)};
`;

const FormControl = styled(Form.Control)`
  border-radius: 99em;
  border: none;
  box-shadow: none;
  padding: 0.5em 1.5em;
  background-color: ${(p) => p.theme.textPrimary};
  color: ${(p) => p.theme.primary};
  border: 3px solid ${(p) => p.theme.primary};

  &::placeholder {
    text-transform: uppercase;
    color: ${(p) => p.theme.secondary};
  }

  &:focus {
    box-shadow: none;
  }

  &:disabled {
    background-color: ${(p) => p.theme.secondary};
  }

  &::file-selector-button {
    border-radius: 99em;
    transform: translateX(-1rem);
    background-color: ${(p) => p.theme.textPrimary};
    color: ${(p) => p.theme.primary};
  }
`;

export const SForm = {
  Group: FormGroup,
  Label: FormLabel,
  Control: FormControl,
};
