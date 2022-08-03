import React, { useEffect,useState } from 'react'
import { Formik, Form } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useUserAuth } from '../contexts/AuthContext'

const LoginPage = () => {
    const { logIn, error, user } = useUserAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    function handlerSubmit() {
        logIn(email, password)
    }
    useEffect(() => {
        if (user !== null) {
            navigate("/dashboard")
        }
    },[])
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
                                    {/* <label htmlFor="email">E-mail </label> */}
                                    <input required type="email" placeholder='E-mail' className="form-input" name="email" onInput={event => setEmail(event.target.value)} />
                                </div>
                                <div className="block text-center">
                                    {/* <label htmlFor="senha">Senha </label> */}
                                    <input required type="password" placeholder='******' className="form-input" name="password" onInput={event => setPassword(event.target.value)} />
                                </div>
                                <div className="block text-center mb-3 text-red-700">
                                    <b className="text-lg">{error}</b>
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
