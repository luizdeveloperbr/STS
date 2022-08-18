import { createContext, useContext, useState, useEffect } from "react"
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase"
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState({})
  const [error, setError] = useState("")
  const navigate = useNavigate()

  function logIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      setUser(userCredential.user)
        navigate("/dashboard")
    })
    .catch(e => {
      switch (e.code) {
        case "auth/invalid-email":
          setError("E-mail invalido");
          break;
        case "auth/wrong-password":
          setError("Senha Invalida")
          break;
        case "auth/user-not-found":
          setError("Usuario não Cadastrado")
          break;
        default:
          setError(JSON.stringify(e))
      }
    })
  }

  function logOut() {
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const value = {
    user,
    logIn,
    error,
    setError,
    logOut
  }

  return (
    <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
  )
}
export function useUserAuth() {
  return useContext(AuthContext);
}