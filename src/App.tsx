import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from './contants/routes';

function App() {
  return (
    <div id="App">
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path={routes.Home.path}></Route>
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
