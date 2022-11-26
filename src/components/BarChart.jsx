import React, { useEffect, useState } from "react";
import { getTotal } from "../firebase/controller";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);


function GraphVendas({data, mes, tipo}) {



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
    }, 500);
  }, [data,tipo]);

  return (
    <Line
      data={{
        datasets: [
          {
            data: [{x: mes,y:totalVendasTipo}],
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      }}
    />
  );
}
export default GraphVendas;
