import React, { useState } from "react";

import { useUserAuth } from "../contexts/AuthContext";

function User({ usuario }) {
  const [senha, setSenha] = useState("");
  // const [inputLock, setInputLock] = useState(true);
  const [emailc, setEmailC] = useState("")
  const { user } = useUserAuth();
  const adminID = import.meta.env.VITE_ADMIN_ID;
  // const adminUrl = import.meta.env.VITE_ADMIN_URL;
  const adminUrl = 'http://localhost:3001/'

  async function confirmarPassword(usrUid) {
    let result = prompt("Confirme a Senha");
    if (senha === result) {
      // if (user.uid === adminID) {
        if (true == 1) {
        await fetch(`${adminUrl}auth/user/mudar-senha`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: usrUid,
            password: senha,
          }),
        }).then((results) => {
          if (results.ok) {
            alert("Senha alterada");
            setSenha("");
          }
        });
      } else {
        alert("usuario não pode alterar senhas");
      }
    } else {
      alert("as senhas precisao ser iguais");
      setSenha("");
    }
  }
  /*return (
    <tr>
      <td className="p-2 border-black border">{usuario.email}</td>
      <td className="border-black border px-5">
        <fieldset className="inline" disabled={inputLock}>
          <input
            type="password"
            onChange={(e) => setSenha(e.target.value)}
            className="w-36 m-1 border border-black rounded-md px-2 py-1 disabled:hover:cursor-not-allowed"
            placeholder={inputLock ? "*******" : "min. 6 caracteres"}
          />
        </fieldset>
        <a
          className={`${
            inputLock ? "locked" : "unlocked"
          } ml-3 border hover:cursor-pointer border-black px-3 rounded-md py-1`}
          onClick={() => setInputLock(!inputLock)}>
          Desbloquear
        </a>
      </td>
      <td className="p-1 text-center border-black border">
        <fieldset className="inline" disabled={inputLock}>
          <button
            onClick={() => {
              confirmarPassword(usuario.email);
            }}
            className="font-bold border border-black bg-slate-300 px-2 rounded-md py-1 disabled:hover:cursor-not-allowed">
            Enviar
          </button>
        </fieldset>
      </td>
    </tr>
  );*/
  return (
      <div className="card">
        <img className="icon" alt="" width="36"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAYxJREFUWIXd189LFVEYxvHP1XTRRtvYJpMUly209qFCP3Bnm/4VQ8I/Q0glIqSg/8GNW81NIaFLLUqwNqaJNxczc5G6zj0zc4bQB57ded/nO2cOZ96huG7gBTZxhF/4gDn0l+hXSA/xDX8u8FdM1hU+jd854ZmP8Th2+BB+BoRnPsBgTID3BcIzv40VPopmCYBTDHdq3hUA8AyNEuBdaW1lgIkS4TFqW/qi+PZn3u3UPGRrT3CtBHhW25u3IOQV1KoQgP0K/b/HAPhUAeBjDIDVCgBValsaUf4iuhMDAN6VAFiJFQ638aNA+AFuxQSAJ8I+x0eSuaEWTUmGjovC9/CgrvBM/XiODRymXscs+mIE3McidiRPe7dCr3HJCLeNl7iXt/g6Xml/oB6VCJ/WfopaTrP+CV9rszhzEwsYCAi+KdnBvLtj7W+IpZzF532I15iRzIk9qYfwFG8kY3pIr8UsfDywILabGOvGvA6HoyY1UhCfO5DW6a2G5Ecid2qpUcetbfhfuhQj2dUGOAOeFRIBXXuvPAAAAABJRU5ErkJggg==" />
        <div className="change">

          <input type="text" className="form-input placeholder:text-black" placeholder={usuario.email} />
            <div className="buttons">
              <a className="form-input" onClick={() => setEmailC('password')}>*</a>
              <a className="form-input" onClick={() => setEmailC('email')}>@</a>
            </div>
        </div>
        <button className="send form-input" onClick={() => {
              confirmarPassword(usuario.email);
            }} >Enviar</button>
      </div>
  )
}

export default User;
