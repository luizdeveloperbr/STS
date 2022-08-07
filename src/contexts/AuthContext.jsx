import { createContext, useContext, useState, useEffect } from "react"
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, updatePassword } from "firebase/auth";
import { auth } from "../firebase"
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState({})
  const [error, setError] = useState("")
  const navigate = useNavigate()
  function logIn(email, password) {
    setError("")
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
          default:
            setError(JSON.stringify(e))
        }
      })
  }

  // async function signUp(email, password) {
  //   try {
  //     const userN = await createUserWithEmailAndPassword(auth, email, password);
  //     console.log(userN);
  //     navigate("/dashboard")
  //   } catch (e) {
  //     return console.error(e.message);
  //   }
  // }

  function logOut() {
    return signOut(auth)
  }

  function passwordChange(newPassWord){
    console.log(user)
    updatePassword(user,newPassWord).then((userCredential) => {
      // setUser(userCredential.user)
      console.log(userCredential)
      // navigate("/dashboard")
    }).catch(e => console.log(e))
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
    logOut,
    passwordChange
  }

  return (
    <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
  )
}
export function useUserAuth() {
  return useContext(AuthContext);
}