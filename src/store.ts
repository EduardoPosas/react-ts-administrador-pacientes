import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware"

import type { DraftPatient, Patient } from "./types";

type PatientState = {
  patients: Patient[],
  activeId: Patient["id"]
}

type PatientActions = {
  addPatient: (data: DraftPatient) => void,
  deletePatient: (id: Patient["id"]) => void,
  setActiveId: (id: Patient["id"]) => void,
  updatePatient: (data: DraftPatient) => void
}

const mapToPatient = (draftPatient: DraftPatient): Patient => {
  return {
    ...draftPatient,
    id: crypto.randomUUID()
  }
}

// Define zustand store, which is a hook
export const usePatientStore = create<PatientState & PatientActions>()(
  // use devtools to see zustand state in redux devtools
  devtools(
    persist(
      (set) => ({
        patients: [],
        activeId: "",
        addPatient: (data) => {
          const newPatient = mapToPatient(data)
          set(state => ({ patients: [...state.patients, newPatient] }))
        },
        deletePatient: (id) => {
          set(state => ({ patients: state.patients.filter(patient => patient.id !== id) }))
        },
        setActiveId: (id) => {
          set(() => ({ activeId: id }))
        },
        updatePatient: (data) => {
          set(state => ({
            patients: state.patients.map(patient => patient.id === state.activeId ? { id: state.activeId, ...data } : patient),
            activeId: ""
          }))
        }
      }),
      {
        name: "patients-storage",
        storage: createJSONStorage(() => localStorage)
      }
    )
  )
)