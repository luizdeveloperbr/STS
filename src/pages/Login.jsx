import React, { useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { useUserAuth } from '../contexts/AuthContext'

const LoginPage = () => {
    const { logIn, error, user, setError } = useUserAuth()
    const navigate = useNavigate()
    function handlerSubmit(values) {
        logIn(values.email, values.password)
    }

    useEffect(() => {
        setError("")
        if (user !== null) {
            navigate("/dashboard")
        }
    }, [])
    return (
        <div className="w-96 my-24 mx-auto">
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                onSubmit={handlerSubmit}
            >{
                    ({ isSubmitting }) => (
                        <div className='shadow-lg drop-shadow-lg rounded-md bg-slate-200 p-12'>
                            <div className="text-center font-bold text-2xl mb-8">
                                Faça o Login
                            </div>
                            <Form className='flex gap-3 flex-col'>
                                    <Field required type="email" placeholder='E-mail' className="form-input placeholder:text-zinc-500" name="email" />
                                    <Field required type="password" placeholder='******' className="form-input placeholder:text-zinc-500" name="password" />
                                <div className="block text-center mb-3 text-red-700">
                                    <b>{ error && <Link  to="/dashboard">{error}</Link>}</b>
                                </div>
                                <div className="block text-center mb-3">
                                    <p><Link to="/cadastro" >Clique aqui para se cadastrar</Link></p>
                                </div>
                                    <button type="submit" className="btn bg-zinc-400 disabled:bg-red-600" disabled={isSubmitting}>Login</button>
                            </Form>
                        </div>
                    )
                }
            </Formik>
        </div>
    )

}
export default LoginPage;
