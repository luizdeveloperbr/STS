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
        <div className="page-conteiner">
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                onSubmit={handlerSubmit}
            >{
                    ({ isSubmitting }) => (
                        <div>
                            <div className="block text-center mb-3">
                                <b className="text-lg">Faça o Login</b>
                            </div>
                            <Form>
                                <div className="block text-center">
                                    <Field required type="email" placeholder='E-mail' className="form-input" name="email" />
                                </div>
                                <div className="block text-center">
                                    <Field required type="password" placeholder='******' className="form-input" name="password" />
                                </div>
                                <div className="block text-center mb-3 text-red-700">
                                    <b>{ error ? <Link  to="/dashboard">{error}</Link> : ""}</b>
                                </div>
                                <div className="block text-center">
                                    <button type="submit" className="button disabled:bg-red-600" disabled={isSubmitting}>Login</button>
                                </div>
                            </Form>
                        </div>
                    )
                }
            </Formik>
        </div>
    )

}
export default LoginPage;
