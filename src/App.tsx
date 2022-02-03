import { Navigate, Route, Routes } from "react-router-dom";

import { Editor } from "./pages/Editor";
import { History } from "./pages/History";
import { useStateWithStorage } from "./hooks/useStateWithStorage";

const StorageKey = "/editor:text";

function App() {
  const [text, setText] = useStateWithStorage("", StorageKey);

  return (
    <div>
      <Routes>
        <Route path="/editor" element={<Editor text={text} setText={setText} />} />
        <Route path="/history" element={<History setText={setText} />}></Route>
        <Route path="*" element={<Navigate to="/editor" />} />
      </Routes>
    </div>
  );
}

export default App;
