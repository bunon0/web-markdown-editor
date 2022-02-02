import styled from "styled-components";
import ReactMarkdown from "react-markdown";

import { useStateWithStorage } from "../hooks/useStateWithStorage";
import { SaveButton } from "../components/SaveButton";
import { putMemo } from "../indexedDb/memos";

export const Editor: React.VFC = () => {
  const StorageKey = "pages/editor:text";

  const [text, setText] = useStateWithStorage("", StorageKey);

  const saveMemo = (): void => {
    putMemo("TITLE", text);
  };

  return (
    <div>
      <SHeader>
        MarkDown Editor
        <SHeaderContainer>
          <SaveButton onClick={saveMemo}>保存する</SaveButton>
        </SHeaderContainer>
      </SHeader>
      <SContainer>
        <STextArea
          value={text}
          onChange={event => {
            setText(event.target.value);
          }}
        />
        <SPreview>
          <ReactMarkdown>{text}</ReactMarkdown>
        </SPreview>
      </SContainer>
    </div>
  );
};

const SHeader = styled.header`
  font-size: 1.5rem;
  height: 2rem;
  left: 0;
  line-height: 2rem;
  padding: 0.5rem 1rem;
  position: fixed;
  right: 0;
  top: 0;
  align-content: center;
  display: flex;
  justify-content: space-between;
`;

const SHeaderContainer = styled.div`
  height: 2rem;
  display: flex;
  align-content: center;
`;

const SContainer = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;
`;

const STextArea = styled.textarea`
  border-right: 1px solid silver;
  border-top: 1px solid silver;
  bottom: 0;
  font-size: 1rem;
  left: 0;
  padding: 0.5rem;
  position: absolute;
  top: 0;
  width: 50vw;
`;

const SPreview = styled.div`
  border-top: 1px solid silver;
  bottom: 0;
  overflow-y: scroll;
  padding: 1rem;
  position: absolute;
  right: 0;
  top: 0;
  width: 50vw;
`;
