import styled from "styled-components";

import { Header } from "../components/Header";
import { Link } from "react-router-dom";

const SHeaderWrapper = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
`;

const SContentWrapper = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;
  padding: 0 1rem;
`;

export const History: React.VFC = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks

  return (
    <div>
      <SHeaderWrapper>
        <Header title="履歴">
          <Link to="/editor">エディタに戻る</Link>
        </Header>
      </SHeaderWrapper>
      <SContentWrapper>TODO: 履歴表示</SContentWrapper>
    </div>
  );
};
