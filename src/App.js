import HomeWithHiddenCreatePost from "./pages/homeWithHiddenPage/HomeWithHiddenCreatePost";
import "./App.css";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import  Admin from "./pages/admin/Admin";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomeWithHiddenCreatePost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
    </div>

  );
}

export default App;




















  // var showCreatePost = useRef();
  // const dataToParent = (data) => {
  //   showCreatePost.current = data;
  //   console.log(showCreatePost)
  // }
  // const [showCreatePost,setShowCreatePost] = useState(childState);