import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Analysis from './pages/Analysis';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Login from './pages/Login';
import Register from './pages/Register';
import Upload from './pages/UploadResume';

function app(){
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Dashboard/>}/>
          <Route path='login' element ={<Login/>}/>
          <Route path='analysis' element={<Analysis/>} />
          <Route path='history' element={<History/>} />
          <Route path='register' element={<Register/>} />
          <Route path='upload' element={<Upload/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default app;
