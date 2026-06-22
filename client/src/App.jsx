import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Analysis from './pages/Analysis';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Login from './pages/Login';
import Register from './pages/Register';
import Upload from './pages/UploadResume';
import ProtectedRoute from './components/ProtectedRoute';

function app(){
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
          <Route path='login' element ={<Login/>}/>
          <Route path='analysis/:id' element={<ProtectedRoute><Analysis/></ProtectedRoute>} />
          <Route path='history' element={<ProtectedRoute><History/></ProtectedRoute>} />
          <Route path='register' element={<Register/>} />
          <Route path='upload' element={<ProtectedRoute><Upload/></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default app;
