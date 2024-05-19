import { Routes, Route } from "react-router-dom"
import AppCRUD from "./components/AppCRUD"
import FormAddData from "./components/FormAddData"
import FormEditData from "./components/FormEditData"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
    <h1 className="title">Aplikasi CRUD Mahasiswa</h1>

    <Routes>
      <Route path="/" Component={AppCRUD}></Route>
      <Route path="/add-data" Component={FormAddData}></Route>
      <Route path="/edit-data/:id" Component={FormEditData}></Route>
    </Routes>

    <ToastContainer position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition: Bounce />
    </>
  )
}

export default App
