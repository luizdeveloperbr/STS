import React, { useEffect, useState } from 'react'
import { setDoc, collection, doc, deleteDoc, getDoc } from "firebase/firestore"
import { Formik, Form } from 'formik'
import { db } from "../firebase";
// import { useNavigate } from 'react-router-dom'
import { useUserAuth } from '../contexts/AuthContext'

const NewUser = () => {
    const { signUp, error } = useUserAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [senhaAdmin, setSenhaAdmin] = useState("")
    const [serverConfig, setServerConfig] = useState("")
    // const navigate = useNavigate()

    function getServerConfig() {
        async function result() {
            const docRef = await getDoc(doc(db, "config", "newEmail"))
            return docRef.data()
        }
        return result()
    }
    function handlerSubmit() {
        if (senhaAdmin === serverConfig) {
            signUp(email, password)
        } else {
            console.log("error de cadastramento")
            return
        }
    }
    useEffect(() => {
        getServerConfig()
        // console.log(getServerConfig)
    }, [senhaAdmin])
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
                                <b className="text-lg">Cadastrar Novo Usuario</b>
                            </div>
                            <Form>
                                <div className="block text-center">
                                    <input required type="email" placeholder='E-mail' className="form-input" name="email" onInput={event => setEmail(event.target.value)} />
                                </div>
                                <div className="block text-center">
                                    <input required type="text" placeholder='Defina a Senha' className="form-input" name="password" onInput={event => setPassword(event.target.value)} />
                                </div>
                                <div className="block text-center">
                                    <input required type="password" placeholder='*senha admin' className="form-input placeholder:text-center" onInput={event => setSenhaAdmin(event.target.value)} />
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
export default NewUser;
