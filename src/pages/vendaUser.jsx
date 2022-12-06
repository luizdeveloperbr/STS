import React, { useState, useEffect } from "react";
import {query, where, getDocs, collection} from 'firebase/firestore'
import {db, auth} from '../firebase'
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import { useUserAuth } from "../contexts/AuthContext";

import { listarVendas } from "../firebase/controller";
import moment from "moment";

function VendaUser() {
  const { user } = useUserAuth();
  const [mesInicial, setMesInicial] = useState(moment(new Date()).format("MM") -1);
  const [mesFinal, setMesFinal] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [userVendas, setUserVendas] = useState([]);

  function vendasUsuario(nome) {
    listarVendas(user.uid, "userID", nome).then((rsult) => {
      console.log(rsult);
      setUserVendas(rsult);
    });

  }
  const months = moment.months() 
  const range = months.map(mes => {
   return moment(mes,"MMMM").format("YYYY-MM")
  })
  console.log('reload');

  useEffect(()=>{
    if(mesInicial && mesFinal){
      const rangeSliced = range.slice(mesInicial,mesFinal)
      console.log(rangeSliced);
      if(rangeSliced.length){

      const colecao = query(collection(db,auth.currentUser.uid),where('mes', 'in', rangeSliced ));
      getDocs(colecao).then(querySnapshot => {
        let array = []
        // console.log(querySnapshot.docs);
        querySnapshot.forEach(doc => {
          array.push({...doc.data(), id: doc.id})

        })
        console.log(array)
        setUserVendas(array)
      })
    }else{
      console.log("vazio")
    }

    }
  },[userId])

  return (
    <div id="main" className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="sm:flex sm:justify-between sm:items-center mb-2">
              <div className="bg-white border-slate-200 border shadow-lg py-3 flex gap-2 justify-center w-full">
                head
                <span className="font-extrabold">|</span>
                <div id="botoes-bancos">
                  <a className="font-bold btn bg-zinc-300 border-black mx-1 hover:cursor-pointer">
                    Nubank
                  </a>

                  <a className="font-bold btn bg-zinc-300 border-black mx-1 hover:cursor-pointer">
                    Mercado Pago
                  </a>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
              <div className="overflow-x-auto col-span-full bg-white shadow-lg rounded-sm border border-slate-200">
                <header className="flex gap-2 px-5 py-4 border-b border-slate-100">
                  <input
                    type="text"
                    placeholder="userId"
                    className="form-input"
                    onInput={(e) => setUserId(e.target.value)}
                  />
                  <select className="form-input w-28" onChange={e => setMesInicial(e.target.value)} >
                    {months.map((mes,index) => <option className="capitalize" value={index}>{mes}</option>)}
                  </select>
                  <select className="form-input w-28" onChange={e => setMesFinal(e.target.value)} >
                    {months.map((mes,index) => <option className="capitalize" value={index+1}>{mes}</option>)}
                  </select>

                  <button
                    className="btn font-bold btn bg-zinc-300 border-black mx-1"
                    onClick={() => {
                      vendasUsuario(userId);
                    }}>
                    {mesInicial}
                  </button>
                </header>
                {/* <div>reusslt</div> */}
                {/* <p>
                  {userVendas.map((cliente) => {
                    return <span>{cliente.userID}</span>;
                  })}
                </p> */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
export default VendaUser;
