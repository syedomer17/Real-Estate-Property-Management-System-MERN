import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./components/public/ Welcome";
import SignUp from "./components/public/SignUp";
import SignIn from "./components/public/SignIn";
import NotFound from "./components/public/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </Router>
  );
}

export default App;
