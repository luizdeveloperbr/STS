import { useEffect, useState } from "react";
import Real from "./ComponentReal";
import DataParsed from "./dataParsed";

function TabelaVendas(props) {
  const [totalVendas, setTotalVendas] = useState(0);
  const [totalCusto, setTotalCusto] = useState(0);
  const [totalQuantidade,serTotalQuantidade] = useState(0)

  function getTotal(array,prop,setstate){
      let result = []
      array.forEach(item => {
        result.push(item[prop])
      })
      const resultReduce = result.reduce((acumulado, atual) => { return acumulado + atual }, 0)
      setstate(resultReduce)
  }

  function getTotalCusto(prop){
    let listaCusto = []
    prop.forEach((item) => {
      listaCusto.push(item.custoUnitario * item.quantidade)
    })
    const custoSomado = listaCusto.reduce((acumulado, atual) => { return acumulado + atual }, 0)
    setTotalCusto(custoSomado)
  }

  useEffect(() => {
    getTotal(props.vendas,"quantidade",serTotalQuantidade)
    getTotal(props.vendas,"valorVenda",setTotalVendas)
    getTotalCusto(props.vendas);
  },[props.vendas]);

  return (
        <>
          {props.vendas.map((vendaId) => {
            return (
              <tr key={vendaId.id}>
                <td>
                <DataParsed timestamp={vendaId.datetime.seconds} format="DD/MM/YYYY" />
                </td>
                <td>{vendaId.userID}</td>
                <td>{vendaId.userName}</td>
                <td>{vendaId.tipo}</td>
                <td className="capitalize">{vendaId.formaDePagamento}</td>
                <td>{vendaId.quantidade}</td>
                <td><Real valor={vendaId.valorVenda} /></td>
                <td><Real valor={vendaId.custoUnitario * vendaId.quantidade} /></td>
                <td><Real valor={vendaId.valorVenda - (vendaId.quantidade * vendaId.custoUnitario)} /></td>
                <td>{vendaId.confirmado ? <div className="task min-w-full h-4"></div> : ""}</td>
              </tr>
            )
          })}
          <tr>
            <td className="h-7 font-bold"></td>
            <td className="h-7 font-bold"></td>
            <td className="h-7 font-bold"></td>
            <td className="h-7 font-bold"></td>
            <td className="h-7 font-bold"></td>
            <td className="h-7 font-bold">{totalQuantidade}</td>
            <td className="h-7 font-bold"><Real valor={totalVendas} /></td>
            <td className="h-7 font-bold"><Real valor={totalCusto} /></td>
            <td className="h-7 font-bold"><Real valor={totalVendas - totalCusto} /></td>
            <td className="h-7 font-bold"></td>
          </tr>
        </>
  );
}

export default TabelaVendas;
