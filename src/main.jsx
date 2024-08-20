import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../src/store/index.js";
import PageNotFound from "./pages/PageNotFound/PageNotFound.jsx";
import NoteBrowser from "./pages/NoteBrowser/NoteBrowser.jsx";
import Note from "./pages/Note/Note.jsx";
import NoteCreate from "./pages/Notecreate/NoteCreate.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<NoteBrowser />} />
            <Route path="/note/:noteId" element={<Note />} />
            <Route path="/note/new" element={<NoteCreate />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  // </StrictMode>
);
