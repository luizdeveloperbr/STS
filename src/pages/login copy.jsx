import React, { useEffect, useState } from 'react'
import { Formik, Form } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useUserAuth } from '../contexts/AuthContext'

const UserPasswordChange = () => {
    const { setError, error, user, passwordChange } = useUserAuth()
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    function handlerSubmit() {
        if (password === passwordConfirm) {
            console.log(typeof password.toString())
            return passwordChange(user, password.toString())
            // navigate("/dashboard")
        } else {
            // setError("Não foi possivel alterar a senha")
            navigate("/erro")
        }
        // logIn(email, password)
    }
    // useEffect(() => {
    //     if (user !== null) {
    //     }
    // },[])
    return (
        <div className="page-conteiner">
            <Formik
                initialValues={{
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
                                    <input required type="password" placeholder='Nova Senha' className="form-input" name="password" onInput={event => setPassword(event.target.value)} />
                                </div>
                                <div className="block text-center">
                                    {/* <label htmlFor="senha">Senha </label> */}
                                    <input required type="password" placeholder='Redigite a Senha' className="form-input" onInput={event => setPasswordConfirm(event.target.value)} />
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
export default UserPasswordChange;
