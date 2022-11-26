import React, { useEffect, useState } from "react";
import { getTotal } from "../firebase/controller";


function RelatorioReduce({ data, mes, tipo }) {

  const [totalVendasTipo, setTotalVendasTipo] = useState(0);
  const [totalVendasMes, setTotalVendasMes] = useState(0);

  
  useEffect(() => {
  
  // receebe dados de todos os meses da pagina pai e filtra por mes : []
  const listaGraph = data.filter((month) => month.mes === mes);
  // acessa o unico objeto retornado e seleciona o array de vendas
  const arrayLista = listaGraph[0]?.data
  
    console.log(arrayLista,tipo)    
    setTimeout(() => {
      const filtrarPorTipo = arrayLista.filter((venda) => venda.tipo === tipo);
      getTotal(filtrarPorTipo, "valorVenda", setTotalVendasTipo);
      getTotal(arrayLista, "valorVenda", setTotalVendasMes);
    }, 1000);
  }, [data,tipo]);


 return (
    <>
      <p>{mes} | total: mes {totalVendasMes} | total: mes {totalVendasTipo}</p>
    </>
  );
}
export default RelatorioReduce;
