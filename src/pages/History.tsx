import styled from "styled-components";

import { Header } from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMemos, MemoRecord } from "../indexedDb/memos";

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

const SMemo = styled.button`
  display: block;
  background-color: white;
  border: 1px solid gray;
  width: 100%;
  padding: 1rem;
  margin: 1rem 0;
  text-align: left;
`;

const SMemoTitle = styled.div`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const SMemoText = styled.div`
  font-size: 0.85rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

interface Props {
  setText: (text: string) => void;
}

export const History: React.VFC<Props> = props => {
  const { setText } = props;
  const [memos, setMemos] = useState<MemoRecord[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMemos().then(setMemos);
  }, []);

  return (
    <div>
      <SHeaderWrapper>
        <Header title="履歴">
          <Link to="/editor">エディタに戻る</Link>
        </Header>
      </SHeaderWrapper>
      <SContentWrapper>
        {memos.map(memo => (
          <SMemo
            key={memo.datetime}
            onClick={() => {
              setText(memo.text);
              navigate("/editor");
            }}>
            <SMemoTitle>{memo.title}</SMemoTitle>
            <SMemoText>{memo.text}</SMemoText>
          </SMemo>
        ))}
      </SContentWrapper>
    </div>
  );
};
