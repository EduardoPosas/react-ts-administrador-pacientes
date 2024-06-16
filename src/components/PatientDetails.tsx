import { usePatientStore } from "../store"
import { Patient } from "../types"
import PatientDetailsItem from "./PatientDetailsItem"
import { toast } from "react-toastify"

type PatientDetailsProps = {
  patient: Patient
}

function PatientDetails({ patient }: PatientDetailsProps) {
  const { id, name, caretaker, email, date, symptoms } = patient
  const deletePatient = usePatientStore(state => state.deletePatient)
  const setActiveId = usePatientStore(state => state.setActiveId)

  return (
    <li className="bg-white p-4 rounded shadow mb-4 last:mb-0">
      <PatientDetailsItem label="id" data={id} />
      <PatientDetailsItem label="nombre" data={name} />
      <PatientDetailsItem label="propietario" data={caretaker} />
      <PatientDetailsItem label="email" data={email} />
      <PatientDetailsItem label="fecha" data={date.toString()} />
      <PatientDetailsItem label="sintomas" data={symptoms} />
      <div className=" mt-4 flex gap-4 justify-between items-center">
        <button
          onClick={() => setActiveId(patient.id)}
          className="py-2 px-4 rounded bg-indigo-600 text-white"
        >Editar</button>
        <button
          onClick={() => {
            const confirmDestroy = confirm("¿Deseas elminar al paciente?")
            if (confirmDestroy) {
              deletePatient(id)
              toast.warning("Paciente elminado")
            }
          }}
          className="py-2 px-4 rounded bg-red-600 text-white"
        >Eliminar</button>
      </div>
    </li>
  )
}

export default PatientDetails