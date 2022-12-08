import React, { useState, useEffect } from "react";
// import { useAutoAnimate } from "@formkit/auto-animate/react";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import GraphVendas from "../components/BarChart";
import moment from "moment";
import { listarVendas, getTotal, getTotalCusto } from "../firebase/controller";
import { useUserAuth } from "../contexts/AuthContext";
import Real from "../components/ComponentReal";

function Report() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [reload, setReload] = useState(false);
  const [mesInicial, setMesInicial] = useState(0)
  const [mesFinal, setMesFinal] = useState(0)
  const [tipo, setTipo] = useState("");
  const [listaPage, setListaPage] = useState([]);
  const [total, setTotal] = useState({});

  const { user } = useUserAuth();


  const months = moment.months()
  const range = months.map((mes) => {
    return moment(mes, "MMMM").format("YYYY-MM");
  });

  const rangeSliced = range.slice(mesInicial, mesFinal);

  useEffect(() => {
    console.log("reload");
    // gera array com objetos: Ex. {mes: 'janeiro', vm: 12, vr: 7, vn: 5}
    rangeSliced.map((mes) => {
      // onLoad Page inicia a array vazio
      // a lib moment.js para trasformar no formato salvo no banco de dados
      // const selectMes = moment(mes, "MMMM").format("YYYY-MM");
      // query idividual por mes
      listarVendas(user.uid, "mes", mes)
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
          const mesFormat = moment(mes, "YYYY-MM").format("MMM/YY");
          return {
            mes: mesFormat,
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
  }, [mesFinal]);

  useEffect(() => {
    // if (listaPage.length === 12) {
      // let array_ano = []
      // listaPage.forEach(item => {
      //   array_ano.push(item['venda_mes']);
      // })
      // setListaReduce(array_ano)

      const total_ano_vnd = getTotal(listaPage, "venda_mes");
      const total_ano_qnd = getTotal(listaPage, "quantidade_mes");
      const total_ano_cst = getTotal(listaPage, "custo_mes");
      const total_ano_vnd_tipo_r = getTotal(listaPage, "venda_tipo_r");
      const total_ano_qnt_tipo_r = getTotal(listaPage, "quantidade_tipo_r");
      const total_ano_cst_tipo_r = getTotal(listaPage, "custo_tipo_r");
      const total_ano_vnd_tipo_n = getTotal(listaPage, "venda_tipo_n");
      const total_ano_qnt_tipo_n = getTotal(listaPage, "quantidade_tipo_n");
      const total_ano_cst_tipo_n = getTotal(listaPage, "custo_tipo_n");

      setTotal({
        total_ano_vnd,
        total_ano_qnd,
        total_ano_cst,
        total_ano_vnd_tipo_r,
        total_ano_qnt_tipo_r,
        total_ano_cst_tipo_r,
        total_ano_qnt_tipo_n,
        total_ano_vnd_tipo_n,
        total_ano_cst_tipo_n,
      });
      // Promise.all({
      //   total_ano_vnd,
      //   total_ano_qnd,
      //   total_ano_cst
      // }).then((all)=>{
      //   console.log(all)
      // })
    // }
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
            <div className="sm:flex sm:justify-between sm:items-center mb-2">
              <div className="bg-white border-slate-200 border shadow-lg py-3 flex gap-2 justify-center w-full">
                  <div id="botoes-tipo">
                        <a
                          className={`${tipo === "" ? "bg-zinc-600 text-white": "bg-zinc-300" } font-bold btn border-black mx-1 hover:cursor-pointer`}
                          onClick={() => setTipo("")}
                        >
                          Todos
                        </a>
                        <a
                          className={`${tipo === "R" ? "bg-zinc-600 text-white": "bg-zinc-300" } font-bold btn border-black mx-1 hover:cursor-pointer`}
                          onClick={() => setTipo("R")}
                        >
                          Renovação
                        </a>
                        <a
                          className={`${tipo === "N" ? "bg-zinc-600 text-white": "bg-zinc-300" } font-bold btn border-black mx-1 hover:cursor-pointer`}
                          onClick={() => setTipo("N")}
                        >
                          Novo
                        </a>
                  </div>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-5">
              <div className="overflow-x-auto col-span-full xl:col-span-5 bg-white shadow-lg rounded-sm border border-slate-200">
                <header className="px-5 py-4 border-b flex justify-evenly border-slate-100">
                  <h2 className="font-semibold text-slate-800 py-2">
                    Total por Mês
                  </h2>
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
                  <a
                    className="btn bg-zinc-300 border-black hover:cursor-pointer"
                    onClick={() => {
                      setMesInicial("")
                      setMesFinal("")
                      setListaPage([])}}
                  >
                    X
                  </a>
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
                            {tipo === "R" ? mes.quantidade_tipo_r : null}
                            {tipo === "N" ? mes.quantidade_tipo_n : null}
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
                    <tr id="total_foot">
                      <td>TOTAL ANO</td>
                      <td>
                        {tipo === "" ? total.total_ano_qnd : null}
                        {tipo === "R" ? total.total_ano_qnt_tipo_r : null}
                        {tipo === "N" ? total.total_ano_qnt_tipo_n : null}
                      </td>
                      <td>
                        {tipo === "" ?  <Real valor={total.total_ano_vnd}        />: null}
                        {tipo === "R" ? <Real valor={total.total_ano_vnd_tipo_r} /> : null}
                        {tipo === "N" ? <Real valor={total.total_ano_vnd_tipo_n} />: null}
                      </td>                      
                      <td>
                        {tipo === "" ?  <Real valor={total.total_ano_cst} /> : null}
                        {tipo === "R" ? <Real valor={total.total_ano_cst_tipo_r} /> : null}
                        {tipo === "N" ? <Real valor={total.total_ano_cst_tipo_n} /> : null}
                      </td>     
                      <td>
                        {tipo === "" ?  <Real valor={total.total_ano_vnd - total.total_ano_cst} /> : null}
                        {tipo === "R" ? <Real valor={total.total_ano_vnd_tipo_r - total.total_ano_cst_tipo_r} /> : null}
                        {tipo === "N" ? <Real valor={total.total_ano_vnd_tipo_n - total.total_ano_cst_tipo_n} /> : null}
                      </td> 
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="overflow-x-auto col-span-full xl:col-span-7 bg-white shadow-lg rounded-sm border border-slate-200">
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
