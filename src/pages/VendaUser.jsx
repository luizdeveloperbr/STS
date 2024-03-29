import React, { useState, useEffect } from "react";
// import { auth } from "../firebase";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import { getTotal, listarVendas } from "../firebase/controller";
import moment from "moment";
import { useRef } from "react";
import Real from "../components/ComponentReal";
import { orderBy } from "lodash";

function VendaUser() {
  const [mesInicial, setMesInicial] = useState(0);
  const [mesFinal, setMesFinal] = useState(12);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showVendas, setShowVendas] = useState([]);
  const [userVendas, setUserVendas] = useState([]);
  const [maiorVendaMes, setMaiorVendaMes] = useState([])
  const refNome = useRef({ value: "" });

  function handlerChangeName(e) {
    refNome.current.value = e.target.value;
  }

  function handlerPressEnter() {
    // if (e.key === "Enter") {

    listarVendas("userID", refNome.current.value).then(
      (rsult) => {
        const array = [];
        rangeSliced.map((rangeMes) => {
          const mesFiltred = rsult.filter((mes) => mes.mes === rangeMes);
          array.push({ mes: rangeMes, data: mesFiltred });
        });
        setUserVendas(array);
      }
    );
    // }
  }

  useEffect(() => {
    const result = userVendas.map((mes) => {
      const getData = mes.data;

      const total_venda = getTotal(getData, "valorVenda");
      const total_quantidade = getTotal(getData, "quantidade");

      return {
        showmes: moment(mes.mes, "YYYY-MM").format("MMMM"),
        total_venda,
        total_quantidade,
      };
    });
    setShowVendas(result);
  }, [userVendas]);

  const months = moment.months();

  const range = months.map((mes) => {
    return moment(mes, "MMMM").format("YYYY-MM");
  });
  const rangeSliced = range.slice(mesInicial, mesFinal);

  useEffect(() => {
    rangeSliced.map(mes => {

      listarVendas('mes', mes).then((result) => {
        const maiorvenda = orderBy(result, ['valorVenda'], 'desc')[0]
        return {
          mes: moment(mes).format('MMMM'),
          userID: maiorvenda.userID,
          valor: maiorvenda.valorVenda
        }
      }).then(data => {
        setMaiorVendaMes((prev) => [...prev, data])
      })
    })
  }, [])

  return (
    <div id="main" className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="grid grid-cols-12 gap-6">
              <div className="overflow-x-auto col-span-6 bg-white shadow-lg rounded-sm border p-4 border-slate-200">
                <header className="flex gap-2 pb-4 border-b border-slate-100">
                  <input
                    type="text"
                    placeholder="userId"
                    className="form-input"
                    ref={refNome}
                    value={refNome.value}
                    onChange={handlerChangeName}
                  // onKeyDown={handlerPressEnter}
                  />
                  <select
                    className="form-input w-28 capitalize"
                    onChange={(e) => setMesInicial(e.target.value)}>
                    {months.map((mes, index) => (
                      <option className="capitalize" key={mes} value={index}>
                        {mes}
                      </option>
                    ))}
                  </select>
                  <select
                    className="form-input w-28 capitalize"
                    onChange={(e) => setMesFinal(e.target.value)}>
                    {months.map((mes, index) => (
                      <option
                        className="capitalize"
                        key={mes}
                        value={index + 1}>
                        {mes}
                      </option>
                    ))}
                  </select>
                  <a onClick={handlerPressEnter} className="btn bg-zinc-300 border border-black hover:cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      className="fill-slate-700"
                      viewBox="0 0 8 8">
                      <path d="M3.5 0c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5c.59 0 1.17-.14 1.66-.41a1 1 0 0 0 .13.13l1 1a1.02 1.02 0 1 0 1.44-1.44l-1-1a1 1 0 0 0-.16-.13c.27-.49.44-1.06.44-1.66 0-1.93-1.57-3.5-3.5-3.5zm0 1c1.39 0 2.5 1.11 2.5 2.5 0 .66-.24 1.27-.66 1.72-.01.01-.02.02-.03.03a1 1 0 0 0-.13.13c-.44.4-1.04.63-1.69.63-1.39 0-2.5-1.11-2.5-2.5s1.11-2.5 2.5-2.5z" />
                    </svg>
                  </a>
                </header>
                <table className="m-auto w-full">
                  <thead className="bg-slate-300">
                    <tr>
                      <th className="text-left pl-2 border border-black">Mes</th>
                      <th className="border border-black">Venda</th>
                      <th className="border border-black">Qnt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {showVendas.map((cliente, index) => {
                      return (
                        <tr key={index}>
                          <td className="py-1 border border-zinc-500 px-2 capitalize">{cliente.showmes}</td>
                          <td className="py-1 border border-zinc-500 px-2 text-center">
                            <Real valor={cliente.total_venda} />
                          </td>
                          <td className="py-1 border border-zinc-500 px-2 text-center">
                            {cliente.total_quantidade}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="overflow-x-auto col-span-6 p-4 bg-white shadow-lg rounded-sm border border-slate-200">
                <header className="pb-4">
                <h2 className="font-semibold text-slate-800">Maior compra por mês</h2>
                  </header>
                <table className="m-auto w-full text-center">
                  <thead className="bg-slate-300">
                    <tr>
                      <th className="py-1 px-2 border border-black text-left">Mês</th>
                      <th className="py-1 px-2 border border-black">Username</th>
                      <th className="py-1 px-2 border border-black">Maior Venda</th>
                    </tr>
                  </thead>
                  <tbody>
                    {maiorVendaMes.map((item,index) => {
                      return (
                        <tr key={index}>
                          <td className="py-1 px-2 border border-zinc-500 capitalize text-left">{item.mes}</td> 
                          <td className="py-1 px-2 border border-zinc-500">{item.userID}</td>
                          <td className="py-1 px-2 border border-zinc-500"><Real valor={item.valor} /></td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
export default VendaUser;
