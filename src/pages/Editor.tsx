import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";

import { Button } from "../components/Button";
import { putMemo } from "../indexedDb/memos";
import { SaveModal } from "../components/SaveModal";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
// eslint-disable-next-line import/no-webpack-loader-syntax
import ConvertMarkdownWorker from "worker-loader!../worker/convert_markdown_worker";

interface Props {
  text: string;
  setText: (text: string) => void;
}

export const Editor: React.VFC<Props> = props => {
  const { text, setText } = props;
  const [showModal, setShowModal] = useState(false);
  const [html, setHtml] = useState("");

  const convertMarkdownWorker = new ConvertMarkdownWorker();

  useEffect(() => {
    convertMarkdownWorker.onmessage = event => {
      setHtml(event.data.html);
    };
  }, [convertMarkdownWorker]);

  useEffect(() => {
    convertMarkdownWorker.postMessage(text);
  }, [text, convertMarkdownWorker]);

  return (
    <div>
      <SHeaderWrapper>
        <Header title="MarkDown Editor">
          <Button onClick={() => setShowModal(true)}>保存する</Button>
          <Link to="/history">履歴を見る</Link>
        </Header>
      </SHeaderWrapper>
      <SContainer>
        <STextArea
          value={text}
          onChange={event => {
            setText(event.target.value);
          }}
        />
        <SPreview>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </SPreview>
        {showModal && (
          <SaveModal
            onSave={(title: string): void => {
              putMemo(title, text);
              setShowModal(false);
            }}
            onCancel={() => setShowModal(false)}
          />
        )}
      </SContainer>
    </div>
  );
};

const SContainer = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;
`;

const SHeaderWrapper = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
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
