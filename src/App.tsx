import { Router, Outlet, ReactLocation } from "@tanstack/react-location";
import routes from './components/Routes';
import { Toaster } from "react-hot-toast";

// Set up a ReactLocation instance
const location = new ReactLocation();

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Router
        location={location}
        routes={routes}
      >
        <Outlet />
      </Router>
    </>
  )
}

export default App
