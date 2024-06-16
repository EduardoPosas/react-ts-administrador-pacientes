import { ReactNode } from "react"

/* ReactNode representa todos los elementos que react puede renderizar */
function FormError({ children }: { children: ReactNode }) {
  return (
    <p className="ps-4 pt-2 text-red-600 text-sm">{children}</p>
  )
}

export default FormError