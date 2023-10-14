import Auth from './components/auth/Auth';
import Content from './components/content/Content';
import FileUpload from './components/file-upload/FileUpload';
import HomePage from './components/home-page/HomePage';
import Layout from './components/main-navigation/Layout';

import { Route, Routes } from "react-router-dom";
import UpdateGame from './components/edit-game/UpdateGame';

function App() {

 const thereisToken =  localStorage.getItem("token");

  return (
    <Layout >
        <Routes>
          <Route path='/' element={<HomePage />} />
          {!thereisToken && <Route path='/auth' element={< Auth/>} />}
          <Route path='/file-upload' element={<FileUpload />} />
          <Route path='/content' element={<Content />} />
          <Route path='/content/:id' element={<UpdateGame />} />
        </Routes>
    </Layout>
  );
}

export default App;
