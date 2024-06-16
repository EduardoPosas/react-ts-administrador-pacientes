import { useEffect } from "react"
import { useForm } from "react-hook-form"
import type { DraftPatient } from "../types"
import { usePatientStore } from "../store"
import FormError from "./FormError"
import { toast } from "react-toastify"

export default function PatientForm() {

  // State with Zustand
  // const {addPatient } = usePatientStore() // one way to access state and actions from store
  const addPatient = usePatientStore(state => state.addPatient)
  const activeId = usePatientStore(state => state.activeId)
  const patients = usePatientStore(state => state.patients)
  const updatePatient = usePatientStore(state => state.updatePatient)

  // React hook form
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<DraftPatient>()

  useEffect(() => {
    if (activeId) {
      const activePatient = patients.find(patient => patient.id === activeId)
      if (activePatient) {
        setValue("name", activePatient?.name)
        setValue("caretaker", activePatient?.caretaker)
        setValue("email", activePatient?.email)
        setValue("date", activePatient?.date)
        setValue("symptoms", activePatient?.symptoms)
      }
    }
  }, [activeId])

  const newPatient = (data: DraftPatient) => {
    // update patient
    if (activeId) {
      // fill form to update data
      updatePatient(data)
      toast.success("Paciente actualizado")
    } else {
      // add new patient
      addPatient(data)
      toast.success("Paciente agregado")
    }
    reset()
  }

  return (
    <form
      className="bg-white shadow rounded py-10 px-4"
      noValidate
      onSubmit={handleSubmit(newPatient)}
    >
      <div className="mb-5">
        <label htmlFor="name" className="text-sm uppercase font-bold">
          Paciente
        </label>
        <input
          id="name"
          className="w-full p-3  border border-gray-100 rounded"
          type="text"
          placeholder="Nombre del Paciente"
          {...register(
            "name",
            {
              required: "El nombre de la mascota es obligatorio"
            }
          )}
        />
        {errors.name && <FormError>* {errors.name?.message}</FormError>}
      </div>

      <div className="mb-5">
        <label htmlFor="caretaker" className="text-sm uppercase font-bold">
          Propietario
        </label>
        <input
          id="caretaker"
          className="w-full p-3  border border-gray-100 rounded"
          type="text"
          placeholder="Nombre del Propietario"
          {...register(
            "caretaker",
            {
              required: "El nombre del propietario es obligatorio",
            }
          )}
        />
        {errors.caretaker && <FormError>* {errors.caretaker?.message}</FormError>}
      </div>

      <div className="mb-5">
        <label htmlFor="email" className="text-sm uppercase font-bold">
          Email
        </label>
        <input
          id="email"
          className="w-full p-3  border border-gray-100 rounded"
          type="email"
          placeholder="Email de Registro"
          {...register(
            "email",
            {
              required: "El email es obligatorio",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email no válido"
              }
            }
          )}
        />
        {errors.email && <FormError>* {errors.email?.message}</FormError>}
      </div>

      <div className="mb-5">
        <label htmlFor="date" className="text-sm uppercase font-bold">
          Fecha Alta
        </label>
        <input
          id="date"
          className="w-full p-3  border border-gray-100 rounded"
          type="date"
          {...register(
            "date",
            {
              required: "La fecha es obligatoria"
            }
          )}
        />
        {errors.date && <FormError>* {errors.date?.message}</FormError>}
      </div>

      <div className="mb-5">
        <label htmlFor="symptoms" className="text-sm uppercase font-bold">
          Síntomas
        </label>
        <textarea
          id="symptoms"
          className="w-full p-3 border border-gray-100 rounded"
          placeholder="Síntomas del paciente"
          {...register(
            "symptoms",
            {
              required: "Los sintomas son obligatorios"
            }
          )}
        ></textarea>
        {errors.symptoms && <FormError>* {errors.symptoms?.message}</FormError>}
      </div>

      <input
        type="submit"
        className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
        value='Guardar Paciente'
      />
    </form>
  )
}