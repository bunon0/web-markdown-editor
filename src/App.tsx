import { Route, Routes } from "react-router-dom";
import { Editor } from "./pages/Editor";
import { History } from "./pages/History";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/editor" element={<Editor />} />
        <Route path="/history" element={<History />}></Route>
        <Route path="*" element={<Editor />} />
      </Routes>
    </div>
  );
}

export default App;
