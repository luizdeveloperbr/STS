import React, { useState, useContext, useEffect } from "react";

import Relatorios from "../components/Relatorios";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import GraphVendas from "../components/BarChart"
import moment from "moment";

function Report() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tipo, setTipo] = useState("");

  return (
    <div
      id="main"
      className="flex h-screen overflow-hidden"
    >
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="grid grid-cols-12 gap-6">
              <div className="overflow-x-auto col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
                <header className="px-5 py-4 border-b border-slate-100">
                  <h2 className="font-semibold text-slate-800">
                    Total por Mês
                  </h2>
                </header>
                <table>
                  <thead>
                    <tr>
                      <td
                        colSpan="5"
                        className="py-2 pl-2"
                      >
                        <>
                          {tipo === "" ? (
                            <a
                              className="font-bold btn bg-zinc-600 text-white border-black mx-1 hover:cursor-pointer"
                              onClick={() => setTipo("")}
                            >
                              Todos
                            </a>
                          ) : (
                            <a
                              className="font-bold btn bg-zinc-300 border-black mx-1 hover:cursor-pointer"
                              onClick={() => setTipo("")}
                            >
                              Todos
                            </a>
                          )}
                        </>
                        <>
                          {tipo === "R" ? (
                            <a
                              className="font-bold btn bg-zinc-600 text-white border-black mx-1 hover:cursor-pointer"
                              onClick={() => setTipo("R")}
                            >
                              Renovação
                            </a>
                          ) : (
                            <a
                              className="font-bold btn bg-zinc-300 border-black mx-1 hover:cursor-pointer"
                              onClick={() => setTipo("R")}
                            >
                              Renovação
                            </a>
                          )}
                        </>
                        <>
                          {tipo === "N" ? (
                            <a
                              className="font-bold btn bg-zinc-600 text-white border-black mx-1 hover:cursor-pointer"
                              onClick={() => setTipo("N")}
                            >
                              Novo
                            </a>
                          ) : (
                            <a
                              className="font-bold btn bg-zinc-300 border-black mx-1 hover:cursor-pointer"
                              onClick={() => setTipo("N")}
                            >
                              Novo
                            </a>
                          )}
                        </>
                      </td>
                    </tr>
                    <tr>
                      <th>Mês</th>
                      <th>Qnt.</th>
                      <th>Venda</th>
                      <th>Custo</th>
                      <th>Lucro</th>
                    </tr>
                  </thead>
                  <tbody id="tabela-relatorio">
                    {moment.months().map((mes) => {
                        return (
                          <Relatorios
                            key={mes}
                            mes={mes}
                            tipo={tipo}
                          />
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <div className="overflow-x-auto col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
                <header className="px-5 py-4 border-b border-slate-100">
                  <h2 className="font-semibold text-slate-800">Graficos</h2>
                </header>
                <GraphVendas data={ [
              { x: "janeiro", y: 10 },
              { x: "fevereiro", y: 20 },
            ]} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Report;
