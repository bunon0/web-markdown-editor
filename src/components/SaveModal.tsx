import styled from "styled-components";
import { Button } from "./Button";
import { useState } from "react";

interface Props {
  onSave: (title: string) => void;
  onCancel: () => void;
}

export const SaveModal: React.VFC<Props> = props => {
  const { onCancel, onSave } = props;
  const [title, setTitle] = useState(new Date().toISOString());

  return (
    <SContainer>
      <SModal>
        <p>テキストの内容を保存します。</p>
        <p>保存内容のタイトルを入力して「保存」ボタンを押してください。</p>
        <p>
          <STitleInput value={title} onChange={event => setTitle(event.target.value)} />
        </p>
        <SButtonWrapper>
          <Button onClick={onCancel} cancel>
            キャンセル
          </Button>
          <Button onClick={() => onSave(title)}>保存</Button>
        </SButtonWrapper>
      </SModal>
    </SContainer>
  );
};

const SContainer = styled.div`
  align-items: center;
  background-color: #0002;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
`;

const SModal = styled.div`
  background: #fff;
  padding: 1rem;
  width: 32rem;
`;

const STitleInput = styled.input`
  width: 29rem;
  padding: 0.5rem;
`;

const SButtonWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 1rem;
`;
