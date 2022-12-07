import React, { useState, useEffect } from "react";
import {query, where, getDocs, collection} from 'firebase/firestore'
import {db, auth} from '../firebase'
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
// import { useUserAuth } from "../contexts/AuthContext";
// import { useDebounce } from "react-haiku"
import { listarVendas } from "../firebase/controller";
import moment from "moment";
import { useRef } from "react";

function VendaUser() {
  // const { user } = useUserAuth();
  const [mesInicial, setMesInicial] = useState( ""/*moment(new Date()).format("MM") -1*/);
  const [mesFinal, setMesFinal] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [userId, setUserId] = useState("");
  
  const [userVendas, setUserVendas] = useState([]);

  const refNome = useRef({value: ''})

  // const deboucedName = useDebounce(refNome.current.value,2000)

  function handlerChangeName(e){
    refNome.current.value = e.target.value
  }

  function handlerPressEnter(e){
    if(e.key === "Enter"){
      console.log("pressed", refNome.current.value)

     listarVendas(auth.currentUser.uid, "userID", refNome.current.value).then((rsult) => {
      //  console.log(rsult);
      const array = []
      rangeSliced.map(rangeMes => {

        const mesFiltred = rsult.filter(mes => mes.mes === rangeMes);
        array.push({mes: rangeMes, data: mesFiltred})

      })
      // console.log(array)
       setUserVendas(array);
     });
    }
  }

  // function vendasUsuario(nome) {
  //   listarVendas(user.uid, "userID", nome).then((rsult) => {
  //     console.log(rsult);
  //     setUserVendas(rsult);
  //   });

  // }


  useEffect(()=>{

  },[userVendas])


  const months = moment.months() 

  const range = months.map(mes => {
   return moment(mes,"MMMM").format("YYYY-MM")
  })
  const rangeSliced = range.slice(mesInicial,mesFinal)

  console.log('reload', rangeSliced);

  useEffect(()=>{
    console.log('useEffect')
    // if(mesInicial && mesFinal){
      console.log("R",rangeSliced);
      if(rangeSliced.length > 0){

      const colecao = query(collection(db,auth.currentUser.uid),where('mes', 'in', rangeSliced ));
      getDocs(colecao).then(querySnapshot => {
        let array = []
        querySnapshot.forEach(doc => {
          array.push({...doc.data(), id: doc.id})

        })


        console.log(array)
        setUserVendas(array)
      })
    }else{
      console.log("vazio")
    }

    // }
  },[])

  return (
    <div id="main" className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="sm:flex sm:justify-between sm:items-center mb-2">
              <div className="bg-white border-slate-200 border shadow-lg py-3 flex gap-2 justify-center w-full">
                {/* # {userId} */}
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
                    type="search"
                    placeholder="userId"
                    className="form-input"
                    ref={refNome}
                    value={refNome.value}
                    onChange={handlerChangeName}
                    onKeyDown={handlerPressEnter}
/>
                  <select className="form-input w-28" onChange={e => setMesInicial(e.target.value)} >
                    {months.map((mes,index) => <option className="capitalize" key={mes} value={index}>{mes}</option>)}
                  </select>
                  <select className="form-input w-28" onChange={e => setMesFinal(e.target.value)} >
                    {months.map((mes,index) => <option className="capitalize" key={mes} value={index+1}>{mes}</option>)}
                  </select>

                  <button
                    className="btn font-bold btn bg-zinc-300 border-black mx-1"
                    // onClick={() => {vendasUsuario(userId)}}
                    >
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
