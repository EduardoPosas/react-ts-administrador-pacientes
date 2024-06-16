import PatientForm from "./components/PatientForm"
import PatientList from "./components/PatientList"
import { Bounce, ToastContainer } from "react-toastify"

import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <header className="container mx-auto px-2 py-8 ">
        <h1 className="text-center text-4xl md:text-6xl font-black">
          Seguimiento de pacientes {" "}
          <span className="text-indigo-600 text-4xl md:text-6xl font-black">Veterinaria</span>
        </h1>
      </header>
      <main className="container mx-auto px-2 py-8 flex flex-col gap-4 md:flex-row">
        <div className="md:w-1/2 lg:w-2/5 py-8">
          <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
          <p className="mt-5 text-lg text-center mb-10">
            Añade Pacientes y {''}
            <span className="text-indigo-600 font-bold">Administralos</span>
          </p>
          <PatientForm />
        </div>
        <div className="md:w-1/2 lg:w-3/5 py-8">
          <PatientList />
        </div>
      </main>
      <ToastContainer
        autoClose={3000}
        closeOnClick
        theme="light"
        transition={Bounce}
      />
    </>
  )
}

export default App
