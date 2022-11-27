import React from "react";
import Real from "./ComponentReal";
import moment from "moment";
moment.locale("pt-br", {
  months:
    "janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro".split(
      "_"
    ),
});
function RelatorioReduce({ data, tipo }) {
  return (
    <table>
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
        {data.map((mes) => {
          return (

            <tr key={mes.mes}>
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
                {tipo === "" ?  <Real valor={mes.venda_mes    - mes.custo_mes} />: null}
                {tipo === "R" ? <Real valor={mes.venda_tipo_r - mes.custo_tipo_r} /> : null}
                {tipo === "N" ? <Real valor={mes.venda_tipo_n - mes.custo_tipo_n} /> : null}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
export default RelatorioReduce;
