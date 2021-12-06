import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import HomeIndex from "./components/home";
import YoutubeIndex from "./components/youtube";
import DownloadIndex from "./components/download";
import YoutubeDl from "./components/youtubedl";

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App />} >
                <Route index element={<HomeIndex />} />
                  <Route path="/download" element={<DownloadIndex/>}>
                      <Route index element={<YoutubeIndex />} />
                      <Route path={"old"} element={<YoutubeDl />} />
                  </Route>
              </Route>
          </Routes>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);