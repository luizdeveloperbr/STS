import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useUserAuth } from '../contexts/AuthContext'
import { auth } from '../firebase'
import { updatePassword } from "firebase/auth"

const UserPasswordChange = () => {
    const { setError, error } = useUserAuth()
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    function handlerSubmit() {
        if (password === passwordConfirm) {
            console.log(password)
            updatePassword(auth.currentUser, password.toString()).then(
                navigate("/dashboard")
            ).catch(e => {
                setError(e.message)
                navigate("/trocar-senha")
            })
        }
    }
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
                                    <input required type="password" placeholder='Nova Senha' className="form-input" name="password" onInput={event => setPassword(event.target.value)} />
                                </div>
                                <div className="block text-center">
                                    <input required type="password" placeholder='Redigite a Senha' className="form-input" onInput={event => setPasswordConfirm(event.target.value)} />
                                </div>
                                <div className="block text-center mb-3 text-red-700">
                                    <b className="text-lg">{error}</b>
                                </div>
                                <div className="block text-center">
                                    <button type="submit" className="button disabled:text-gray-500" disabled={passwordConfirm.length < 6}>Confirmar</button>
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
