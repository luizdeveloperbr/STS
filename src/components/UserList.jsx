import React, {useState} from "react"

import { useUserAuth } from "../contexts/AuthContext";

function User({usuario}){

    const [senha, setSenha] = useState('')
    const [inputLock, setInputLock] = useState(true)
    const {user} = useUserAuth()
    const adminID = import.meta.env.VITE_ADMIN_ID
  
    async function confirmarPassword(usrUid){
  
      let result = prompt('Confirme a Senha')
      if(senha === result){
      if(user.uid === adminID){
          await fetch('https://admin.meucontroledevendas.net/v1/user/mudar-senha',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            email: usrUid,
            password: senha
          })
        }).then((results) => {
          if(results.ok){
            alert('Senha alterada')
            setSenha('')
          }
        })
      }else{
        alert('usurio não pode alterar senhas')
      }
      }else{
        alert('as senhas precisao ser iguais')
            setSenha('')
      }
  }
  return (
    <tr>
         <td className='p-2 border-black border'>{usuario.email}</td>
         <td className='border-black border px-5'>
          <fieldset className='inline' disabled={inputLock}>
          <input type="password" onChange={e => setSenha(e.target.value)} className='w-36 m-1 border border-black rounded-md px-2 py-1 disabled:hover:cursor-not-allowed' placeholder={inputLock ? '*******' : 'min. 6 caracteres'} />
          </fieldset>
         <a className={`${inputLock ? 'locked' : 'unlocked'} ml-3 border hover:cursor-pointer border-black px-3 rounded-md py-1`} onClick={()=> setInputLock(!inputLock)}></a>
         </td>
         <td className='p-1 text-center border-black border'>
         <fieldset className='inline' disabled={inputLock}>
           <button onClick={()=>{confirmarPassword(usuario.email)}} className='font-bold border border-black bg-slate-300 px-2 rounded-md py-1 disabled:hover:cursor-not-allowed'>Enviar</button>
          </fieldset>
          </td>
    </tr>
  )
  }

  export default User