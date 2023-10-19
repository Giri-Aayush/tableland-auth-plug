import "./App.css";
import LoginPage from "./Pages/LoginPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import SignupPage from "./Pages/SignupPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";

// function App() {
//   return (
//     <div>
//       <SignupPage />
//     </div>
//   );
// }

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position='top-center' />
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
