import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from './components/NavigationBar/navigationBar.component';
import routes from './contants/routes';
const Home = lazy(() => import("./pages/Home.page"))

function App() {
  return (
    <div id="App" style={{overflowX: "hidden"}}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <NavigationBar />
          <Routes>
            <Route path={routes.Home.path} element={<Home />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
