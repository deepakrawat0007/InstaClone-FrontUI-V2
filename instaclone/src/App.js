import './App.css';
import Registration from "./components/Registration/Registration"
import {ToastContextProvider} from "./components/context/ToastContext"
import LoginPage from './components/Login/Login';
import PostView from './components/PostView/PostView';
import Upload from './components/Upload/upload';
import Account from './components/Account/Account';
import { BrowserRouter,Routes , Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ToastContextProvider>
      <Routes>
        <Route path='/' element={<Registration/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/posts' element={<PostView/>}/>
        <Route path='/upload' element={<Upload/>}/>
        <Route path='/user' element={<Account/>}/>
      </Routes>
      </ToastContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
