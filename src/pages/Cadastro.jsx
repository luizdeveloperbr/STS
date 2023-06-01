import { useState } from "react"
//import { AccountForm } from "../hook/AccountForm"
import { useMultistepForm } from "../hook/useMultistepForm"
import { UserForm } from "../hook/UserForm"
// import { CardForm } from "../hook/CardForm"
import {useUserAuth} from '../contexts/AuthContext'
import { useNavigate } from "react-router-dom"

const INITIAL_DATA = {
  nome: "",
  email: "",
  password: "",
}

function PageF() {

  const navegate = useNavigate()

  const [data, setData] = useState(INITIAL_DATA)
  function updateFields(fields) {
    setData(prev => {
      return { ...prev, ...fields }
    })
  }

  const { signUp } = useUserAuth()
  
  function onSubmit(e) {
    e.preventDefault()
    if (!isLastStep) return next()
    signUp(data.email, data.password)
  }

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <UserForm {...data} updateFields={updateFields} />,
   // <AccountForm {...data} updateFields={updateFields} />,
    // <CardForm {...data} updateFields={updateFields}/>
    ])

  return (
    <div className="w-[600px] my-24 mx-auto">
      <form onSubmit={onSubmit}
        className='shadow-lg drop-shadow-lg rounded-md bg-slate-200 p-12'
        
      >
        <div
          className="w-full text-end"
        >
          {currentStepIndex + 1} / {steps.length}
        </div>
        {step}
        <div>
          {!isFirstStep && (
            <button type="button" onClick={back} className="btn mr-2 bg-gray-300">
              Voltar
            </button>
          )}
          <button className="btn bg-gray-300 ml-0 m-2" onClick={() => {navegate(-1)}}>Voltar</button>
          
          <button className="btn bg-gray-300 ml-0 m-2" type="submit">{isLastStep ? "Finalizar" : "Proximo"}</button>
        </div>
      </form>
    </div>
  )
}

export default PageF