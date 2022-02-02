import styled from "styled-components";

interface Props {
  cancel?: boolean;
  children: string;
  onClick: () => void;
}

export const SaveButton: React.VFC<Props> = props => {
  return (
    <SButton onClick={props.onClick} className={props.cancel ? "cancel" : ""}>
      {props.children}
    </SButton>
  );
};

const SButton = styled.button`
  background-color: dodgerblue;
  border: none;
  box-shadow: none;
  color: white;
  font-size: 1rem;
  height: 2rem;
  min-width: 5rem;
  padding: 0 1rem;

  &.cancel {
    background-color: white;
    border: 1px solid gray;
    color: gray;
  }
`;
