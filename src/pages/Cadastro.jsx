import React, {useRef} from 'react'
import { useUserAuth } from '../contexts/AuthContext'
import { Formik, Field, Form } from 'formik'
import { useNavigate } from "react-router-dom"

function Cadastro() {
    const navigate = useNavigate()
    const { signUp } = useUserAuth()
    const confirm = useRef("")
    function handlerSignup(values) {
        if(values.password !== confirm.current.value){
            alert('senhas precisam ser iguais')
            navigate("/")
        }else{
            signUp(values.email, values.password)
        }
    }

    return (
        <div className="w-96 my-24 mx-auto">
            <Formik initialValues={{
                displayName: "",
                password: "",
                email: ""

            }} onSubmit={handlerSignup}>
                {({ values }) => (
                    <div className='shadow-lg drop-shadow-lg rounded-md bg-slate-200 p-12'>
                        <div className="text-center font-bold text-2xl mb-8">
                            Cadastre-se
                        </div>
                        <Form className='flex gap-3 flex-col'>
                            <Field type="text" className="form-input" placeholder="Nome" name="displayName" />
                            <Field required type="email" placeholder='E-mail' className="form-input" name="email" />
                            <input required type="password" placeholder='Senha' ref={confirm} className="form-input" name="c-password" />
                            <Field required type="password" placeholder='Confirme a Senha' className="form-input" name="password" />
                            <button type="submit" className="btn bg-zinc-400 disabled:bg-red-600" disabled={values.password !== confirm.current.value} >Enviar</button>
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    )
}
export default Cadastro