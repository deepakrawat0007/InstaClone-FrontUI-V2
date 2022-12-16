import './App.css';
import Registration from "./components/Registration/Registration"
import LoginPage from './components/Login/Login';
import PostView from './components/PostView/PostView';
import Upload from './components/Upload/upload';
import { BrowserRouter,Routes , Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Registration/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/posts' element={<PostView/>}/>
        <Route path='/upload' element={<Upload/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
