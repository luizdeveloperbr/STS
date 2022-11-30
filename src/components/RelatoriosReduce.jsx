import React from "react";
// import {useAutoAnimate} from '@formkit/auto-animate/react'
import Real from "./ComponentReal";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
moment.locale("pt-br", {
  months:
    "janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro".split(
      "_"
    ),

});

function RelatorioReduce({ data,tipo }) {

  // const [parent] = useAutoAnimate({duration: 200})
  // const [list, addlist] = useState([])
  // const [listItem, addlistItem] = useState([])
  // const delay = (ms) =>
  //       new Promise((res) => {
  //           setTimeout(() => {
  //             res()
  //           }, ms)
  //       });

  //       useEffect(()=>{
  //         (async function(){
  //           for (let el of data){
  //             await delay(300);
  //             addlistItem(el)
  //           }
  //         })()
  //       },[data])

        // useEffect(()=>{
        //     listItem && addlist((prev) => [...prev, listItem])
        // },[listItem])

  return (
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
        {data.forEach((mes,key) => {
          return (
            
            <tr key={key} className="text-center">
              <td><span className="capitalize pl-2">{mes.mes}</span></td>
              <td>
                {tipo === "" ? mes.quantidade_mes : null}
                {tipo === "R" ? mes.quantidade_tipo_r : null}
                {tipo === "N" ? mes.quantidade_tipo_n: null}
                </td>
              <td className="px-2">
                {tipo === "" ?  <Real valor={mes.venda_mes} />: null}
                {tipo === "R" ? <Real valor={mes.venda_tipo_r} /> : null}
                {tipo === "N" ? <Real valor={mes.venda_tipo_n} /> : null}
              </td>
              <td className="px-2">
                {tipo === "" ?  <Real valor={mes.custo_mes} />: null}
                {tipo === "R" ? <Real valor={mes.custo_tipo_r} /> : null}
                {tipo === "N" ? <Real valor={mes.custo_tipo_n} /> : null}
              </td>
              <td className="px-2">
                {tipo === "" &&  mes.venda_mes !== undefined ?  <Real valor={mes.venda_mes    - mes.custo_mes} />: null}
                {tipo === "R" && mes.venda_tipo_r !== undefined ? <Real valor={mes.venda_tipo_r - mes.custo_tipo_r} /> : null}
                {tipo === "N" && mes.venda_tipo_n !== undefined ? <Real valor={mes.venda_tipo_n - mes.custo_tipo_n} /> : null}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
export default RelatorioReduce;
