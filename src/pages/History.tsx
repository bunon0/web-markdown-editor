import styled from "styled-components";

import { Header } from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMemoPageCount, getMemos, MemoRecord } from "../indexedDb/memos";

interface Props {
  setText: (text: string) => void;
}

export const History: React.VFC<Props> = props => {
  const { setText } = props;
  const [memos, setMemos] = useState<MemoRecord[]>([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    getMemos(1).then(setMemos);
    getMemoPageCount().then(setMaxPage);
  }, []);

  const canNextPage: boolean = page < maxPage;
  const canPrevPage: boolean = page > 1;
  const movePage = (targetPage: number) => {
    if (targetPage < 1 || maxPage < targetPage) {
      return;
    }
    setPage(targetPage);
    getMemos(targetPage).then(setMemos);
  };

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
      <SPaging>
        <SPagingButton onClick={() => movePage(page - 1)} disabled={!canPrevPage}>
          前へ
        </SPagingButton>
        <SPagingButton onClick={() => movePage(page + 1)} disabled={!canNextPage}>
          次へ
        </SPagingButton>
      </SPaging>
    </div>
  );
};

const SHeaderWrapper = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
`;

const SContentWrapper = styled.div`
  bottom: 3rem;
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;
  padding: 0 1rem;
  overflow-y: scroll;
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

const SPaging = styled.div`
  bottom: 0;
  height: 3rem;
  left: 0;
  line-height: 2rem;
  padding: 0.5rem;
  position: fixed;
  right: 0;
  text-align: center;
`;

const SPagingButton = styled.button`
  background: none;
  border: none;
  display: inline-block;
  height: 2rem;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:disabled {
    color: silver;
    cursor: auto;
  }
`;
