import React, { useState, useEffect } from "react";
// import { useAutoAnimate } from "@formkit/auto-animate/react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import GraphVendas from "../components/BarChart";
import moment from "moment";
import { listarVendas, getTotal, getTotalCusto } from "../firebase/controller";
import { useUserAuth } from "../contexts/AuthContext";
import Real from "../components/ComponentReal";
moment.locale("pt-br", {
  months:
    "janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro".split(
      "_"
    ),
});

function Report() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [reload, setReload] = useState(false);

  const [tipo, setTipo] = useState("");
  const [listaPage, setListaPage] = useState([]);
  // const [listaReduce, setListaReduce] = useState([]);

  const { user } = useUserAuth();

  // const [parent] = useAutoAnimate();
  // const meses = moment.months();

  useEffect(() => {
    console.log("reload");
    // gera array com objetos: Ex. {mes: 'janeiro', vm: 12, vr: 7, vn: 5}
    moment.months().map((mes) => {
      // onLoad Page inicia a array vazio
      // a lib moment.js para trasformar no formato salvo no banco de dados
      const selectMes = moment(mes, "MMMM").format("YYYY-MM");
      // query idividual por mes
      listarVendas(user.uid, "mes", selectMes)
        .then((result) => {
          // organiza o objeto

          const venda_mes = getTotal(result, "valorVenda");
          const quantidade_mes = getTotal(result, "quantidade");
          const custo_mes = getTotalCusto(result);
          //
          const array_tipo_r = result.filter((venda) => venda.tipo === "R");
          const array_tipo_n = result.filter((venda) => venda.tipo === "N");

          // soma dos valores de venda com tipo = 'R'
          const venda_tipo_r = getTotal(array_tipo_r, "valorVenda");
          const quantidade_tipo_r = getTotal(array_tipo_r, "quantidade");
          const custo_tipo_r = getTotalCusto(array_tipo_r);

          // soma dos valoress de venda com tipo = 'N'
          const venda_tipo_n = getTotal(array_tipo_n, "valorVenda");
          const quantidade_tipo_n = getTotal(array_tipo_n, "quantidade");
          const custo_tipo_n = getTotalCusto(array_tipo_n);
          //
          return {
            mes,
            venda_mes,
            quantidade_mes,
            custo_mes,
            quantidade_tipo_r,
            quantidade_tipo_n,
            venda_tipo_n,
            venda_tipo_r,
            custo_tipo_n,
            custo_tipo_r,
          };
        })
        .then((array) => {
          setListaPage((prev) => [...prev, array]);
        });
    });
  }, [reload]);

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
            <div className="sm:flex sm:justify-between sm:items-center mb-2">
              <div className="bg-white border-slate-200 border shadow-lg py-3 flex gap-2 justify-center w-full">
              {listaPage.length < 12 ? (
                  <a
                    className="font-bold btn bg-zinc-300 border-black mx-1 hover:cursor-pointer"
                    onClick={() => setReload(!reload)}
                  >
                    Recarregar
                  </a>
                ): 
                <div id="botoes-tipo">
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
                </div>
}
        <span className="font-extrabold">|</span>
            <div id="botoes-bancos">
            
                    <a
                      className="font-bold btn bg-zinc-300 border-black mx-1 hover:cursor-pointer"
                      // onClick={() => setTipo("R")}
                    >
                      Nubank
                    </a>

               
                    <a
                      className="font-bold btn bg-zinc-300 border-black mx-1 hover:cursor-pointer"
                      // onClick={() => setTipo("")}
                    >
                      Mercado Pago
                    </a>

                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
              <div className="overflow-x-auto col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
                <header className="px-5 py-4 border-b border-slate-100">
                  <h2 className="font-semibold text-slate-800">
                    Total por Mês
                  </h2>
                  {/* {listaReduce.map(item => <p>{item.mes}</p>)} */}
                </header>
                {/* <RelatorioReduce data={listaReduce} tipo={tipo} /> */}
                <table className="w-full">
                  <thead>
                    <tr>
                      <th>Mês</th>
                      <th>Qnt.</th>
                      <th>Venda</th>
                      <th>Custo</th>
                      <th>Lucro</th>
                    </tr>
                  </thead>
                  <tbody id="tabela-relatorio">
                    {listaPage.map((mes, key) => {
                      return (
                        <tr
                          key={key}
                          className="text-center"
                        >
                          <td>
                            <span className="capitalize pl-2">{mes.mes}</span>
                          </td>
                          <td>
                            {tipo === "" ? mes.quantidade_mes : null}
                            {tipo === "R" ? mes.venda_tipo_r : null}
                            {tipo === "N" ? mes.venda_tipo_n : null}
                          </td>
                          <td className="px-2">
                            {tipo === "" ? (
                              <Real valor={mes.venda_mes} />
                            ) : null}
                            {tipo === "R" ? (
                              <Real valor={mes.venda_tipo_r} />
                            ) : null}
                            {tipo === "N" ? (
                              <Real valor={mes.venda_tipo_n} />
                            ) : null}
                          </td>
                          <td className="px-2">
                            {tipo === "" ? (
                              <Real valor={mes.custo_mes} />
                            ) : null}
                            {tipo === "R" ? (
                              <Real valor={mes.custo_tipo_r} />
                            ) : null}
                            {tipo === "N" ? (
                              <Real valor={mes.custo_tipo_n} />
                            ) : null}
                          </td>
                          <td className="px-2">
                            {tipo === "" && mes.venda_mes !== undefined ? (
                              <Real valor={mes.venda_mes - mes.custo_mes} />
                            ) : null}
                            {tipo === "R" && mes.venda_tipo_r !== undefined ? (
                              <Real
                                valor={mes.venda_tipo_r - mes.custo_tipo_r}
                              />
                            ) : null}
                            {tipo === "N" && mes.venda_tipo_n !== undefined ? (
                              <Real
                                valor={mes.venda_tipo_n - mes.custo_tipo_n}
                              />
                            ) : null}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="overflow-x-auto col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
                <header className="px-5 py-4 border-b border-slate-100">
                  <h2 className="font-semibold text-slate-800">Graficos</h2>
                </header>
                <GraphVendas
                  data={listaPage}
                  tipo={tipo}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Report;
