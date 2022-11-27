import React, { useState, useEffect } from "react";

// import Relatorios from "../components/Relatorios";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import GraphVendas from "../components/BarChart";
import moment from "moment";
import { listarVendas, getTotal, getTotalCusto } from "../firebase/controller";
import { useUserAuth } from "../contexts/AuthContext";
import RelatorioReduce from "../components/RelatoriosReduce";

function Report() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [tipo, setTipo] = useState("");
  const [listaPage, setListaPage] = useState([]);
  const [listaReduce, setListaReduce] = useState([]);

  // const [totalVendasTipo, setTotalVendasTipo] = useState(0);

  const { user } = useUserAuth();

  const meses = moment.months();

  useEffect(() => {
    // onLoad Page inicia a array vazio
    var array = [];
      // gera array com objetos: Ex. {mes: 'janeiro', vm: 12, vr: 7, vn: 5}
      meses.map(async (mes) => {
        // a lib moment.js para trasformar no formato salvo no banco de dados
        const selectMes = moment(mes, "MMMM").format("YYYY-MM");
        // query idividual por mes
        const result = await listarVendas(user.uid, "mes", selectMes);
        // organiza o objeto
        array.push({
          mes,
          data: result,
        });
      });
    setTimeout(() => {
      setListaPage(array);
    }, 1000);
  }, []);

  useEffect(() => {
    if(listaPage.length !== 0){
    var array = []
      meses.map(async (mes) => {
        // var array = [];
        const result = listaPage.filter((item) => item.mes === mes);

        const array_mes = result[0]?.data;
        const array_tipo_r = array_mes.filter((venda) => venda.tipo === "R");
        const array_tipo_n = array_mes.filter((venda) => venda.tipo === "N");

        // soma dos valores de vendas
        const venda_mes = await getTotal(array_mes, "valorVenda");
        const quantidade_mes = await getTotal(array_mes, "quantidade");
        const custo_mes = await getTotalCusto(array_mes)

        // soma dos valores de venda com tipo = 'R'
        const venda_tipo_r = await getTotal(array_tipo_r, "valorVenda");
        const quantidade_tipo_r = await getTotal(array_tipo_r, "quantidade");
        const custo_tipo_r = await getTotalCusto(array_tipo_r)

        // soma dos valores de venda com tipo = 'N'
        const venda_tipo_n = await getTotal(array_tipo_n, "valorVenda");
        const quantidade_tipo_n = await getTotal(array_tipo_n, "quantidade");
        const custo_tipo_n = await getTotalCusto(array_tipo_n)

        array.push({
          mes,
          venda_mes,
          venda_tipo_r,
          venda_tipo_n,
          quantidade_mes,
          quantidade_tipo_r,
          quantidade_tipo_n,
          custo_mes,
          custo_tipo_r,
          custo_tipo_n
        });
      }
      )

      setTimeout(() => {
          setListaReduce(array)
      }, 1000);
  }
  }, [listaPage]);

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
                  <div>
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
                </header>
                <RelatorioReduce data={listaReduce} tipo={tipo} />
              </div>
              <div className="overflow-x-auto col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
                <header className="px-5 py-4 border-b border-slate-100">
                  <h2 className="font-semibold text-slate-800">Graficos</h2>
                </header>
                <GraphVendas data={listaReduce} tipo={tipo} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Report;
