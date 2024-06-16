import { usePatientStore } from "../store"
import PatientDetails from "./PatientDetails"

function PatientList() {

  const patients = usePatientStore(state => state.patients)

  return (
    <>
      {
        patients.length ? (
          <>
            <h2 className="font-black text-3xl text-center">Listado de pacientes</h2>
            <p className="mt-5 text-lg text-center mb-10">
              Administra tus pacientes {''}
              <span className="text-indigo-600 font-bold">y citas</span>
            </p>
            <ul className="max-h-[40rem] overflow-auto">
              {
                patients.map(patient => (<PatientDetails key={patient.id} patient={patient} />))
              }
            </ul>
          </>
        ) : (
          <>
            <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
            <p className="mt-5 text-lg text-center mb-10">
              Comienza agregando pacientes {''}
              <span className="text-indigo-600 font-bold">y apareceraán en este lugar</span>
            </p>
          </>
        )
      }
    </>
  )
}

export default PatientList