import styled from "styled-components";

interface Props {
  title: string;
  children: React.ReactNode;
}

export const Header: React.VFC<Props> = props => {
  return (
    <SHeader>
      <SHeaderTitle>{props.title}</SHeaderTitle>
      <SHeaderContainer>{props.children}</SHeaderContainer>
    </SHeader>
  );
};

const SHeader = styled.header`
  align-content: center;
  display: flex;
  height: 2rem;
  justify-content: space-between;
  line-height: 2rem;
  padding: 0.5rem 1rem;
`;

const SHeaderTitle = styled.div`
  font-size: 1.5rem;
`;

const SHeaderContainer = styled.div`
  align-content: center;
  display: flex;
  height: 2rem;
  justify-content: center;

  & > * {
    margin-left: 0.5rem;
  }
`;
