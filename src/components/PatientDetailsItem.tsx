type PatientDetailsItemProp = {
  label: string
  data: string
}

function PatientDetailsItem({ label, data }: PatientDetailsItemProp) {
  return (
    <>
      <p className="font-bold text-gray-700 uppercase ">
        {label}: {""}
        <span className="font-normal font normal-case">{data}</span>
      </p>
    </>
  )
}

export default PatientDetailsItem