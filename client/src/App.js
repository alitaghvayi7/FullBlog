import HomePage from "./Pages/Home/HomePage";
import SinglePostPage from "./Pages/Single/SinglePostPage";
import WritePage from "./Pages/Write/WritePage";
import UserPage from "./Pages/User/UserPage";
import LoginPage from "./Pages/Login/LoginPage";
import SignupPage from "./Pages/Signup/Signup";
import {Routes,Route,Navigate} from "react-router-dom";
import {useUserState} from "./Context/AuthContext";

function App() {
  const {user} = useUserState();
  return (
    <Routes>
      <Route path="/post/:id"  element={<SinglePostPage />}/>
      <Route path="/write"  element={user? <WritePage /> : <Navigate to="/signup"/>}/>
      <Route path="/user/:id" element={user ? <UserPage /> : <SignupPage />}/>
      <Route path="/login" element={user? <HomePage /> : <LoginPage />}/>
      <Route path="/signup" element={user? <HomePage /> : <SignupPage />}/>
      <Route path="/" exact element={user? <HomePage /> : <SignupPage />}/>
    </Routes>
  );
}

export default App;
