import React, { useState, useRef } from "react";

import { useUserAuth } from "../contexts/AuthContext";

function User({ usuario }) {
  const formInput = useRef({ value: '' })

  const [attribute, setAttribute] = useState("password")
  const { user } = useUserAuth();

  const adminID = import.meta.env.VITE_ADMIN_ID;
  const adminUrl = import.meta.env.VITE_ADMIN_URL;

  async function requestChange(uid) {
    let confirm = window.confirm('deseja continuar com a  alteração?')
    if (confirm) {
      await fetch(`${adminUrl}auth/user/mudar-senha`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid,
          [attribute]: formInput.current.value,
        }),
      }).then((results) => {
        if (results.ok) {
          alert(`${attribute} alterado`);
          formInput.current.value = null
        }
      });
    }
  }

  async function confirmChange(usrUid, attr) {
    if (user.uid === adminID) {
      if(attr === 'password'){
        let result = prompt("Confirme a Senha");
        if (formInput.current.value === result) {
          requestChange(usrUid)
        } else {
          alert("as senhas precisao ser iguais");
          return
        }
      }else if(attr === 'email'){
        requestChange(usrUid)
      }
    } else {
      alert(`usuario não pode alterar ${attr}`);
      return
    }
  }

  return (
    <div className="card">
      <img className="icon" alt="" width="36"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAYxJREFUWIXd189LFVEYxvHP1XTRRtvYJpMUly209qFCP3Bnm/4VQ8I/Q0glIqSg/8GNW81NIaFLLUqwNqaJNxczc5G6zj0zc4bQB57ded/nO2cOZ96huG7gBTZxhF/4gDn0l+hXSA/xDX8u8FdM1hU+jd854ZmP8Th2+BB+BoRnPsBgTID3BcIzv40VPopmCYBTDHdq3hUA8AyNEuBdaW1lgIkS4TFqW/qi+PZn3u3UPGRrT3CtBHhW25u3IOQV1KoQgP0K/b/HAPhUAeBjDIDVCgBValsaUf4iuhMDAN6VAFiJFQ638aNA+AFuxQSAJ8I+x0eSuaEWTUmGjovC9/CgrvBM/XiODRymXscs+mIE3McidiRPe7dCr3HJCLeNl7iXt/g6Xml/oB6VCJ/WfopaTrP+CV9rszhzEwsYCAi+KdnBvLtj7W+IpZzF532I15iRzIk9qYfwFG8kY3pIr8UsfDywILabGOvGvA6HoyY1UhCfO5DW6a2G5Ecid2qpUcetbfhfuhQj2dUGOAOeFRIBXXuvPAAAAABJRU5ErkJggg==" />
      <div className="change">

        <input type={attribute} className="form-input placeholder:text-gray-900" onChange={(e) => { formInput.current.value = e.target.value }} ref={formInput} placeholder={usuario.email} />
        <div className="buttons">
          <a title="senha" className={`btn btn-sm  hover:cursor-pointer  ${attribute === 'password' ? 'bg-gray-600 text-white' : 'bg-slate-300 text-black'}`} onClick={() => setAttribute('password')}>*</a>
          <a title="email" className={`btn btn-sm  hover:cursor-pointer  ${attribute === 'email' ? 'bg-gray-600 text-white' : 'bg-slate-300 text-black'}`} onClick={() => setAttribute('email')}>@</a>
        </div>
      </div>
      <button className="send btn bg-slate-300 text-black" onClick={() => {
        confirmChange(usuario.uid, attribute);
      }} >Enviar</button>
    </div>
  )
}

export default User;
