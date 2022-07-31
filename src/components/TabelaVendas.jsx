import { useEffect, useState } from "react";
import Real from "./ComponentReal";
import VendaColuna from "./VendaColuna";
import VendaColunaConfirmado from "./VendaColunaConfirmado";


function TabelaVendas(props) {
  const [totalVendas, setTotalVendas] = useState(0);
  const [totalCusto, setTotalCusto] = useState(0);
  const [totalQuantidade, serTotalQuantidade] = useState(0)

  function getTotal(array, prop, setstate) {
    let result = []
    array.forEach(item => {
      result.push(item[prop])
    })
    const resultReduce = result.reduce((acumulado, atual) => { return acumulado + atual }, 0)
    setstate(resultReduce)
  }

  function getTotalCusto(prop) {
    let listaCusto = []
    prop.forEach((item) => {
      listaCusto.push(item.custoUnitario * item.quantidade)
    })
    const custoSomado = listaCusto.reduce((acumulado, atual) => { return acumulado + atual }, 0)
    setTotalCusto(custoSomado)
  }

  useEffect(() => {
    getTotal(props.vendas, "quantidade", serTotalQuantidade)
    getTotal(props.vendas, "valorVenda", setTotalVendas)
    getTotalCusto(props.vendas);
  }, [props.vendas]);

  return (
    <div className="tabela">
      <div className="flex justify-start" id="h">
        <div className="header w-[150px]">Data</div>
        <div className="header w-[150px]">Usuario</div>
        <div className="header w-[150px]">Nome</div>
        <form className="flex" action="">
          <div className="header w-[90px]">Tipo</div>
          <div className="header w-[150px]">Banco</div>
          <div className="header w-[90px]">Licenças</div>
          <div className="header w-[110px]">Valor da Venda</div>
          <div className="header w-[110px]">Valor de Custo</div>
          <div className="header w-[110px]">Lucro</div>
          <div className="header w-[110px]">Confirmado</div>
          <div className="header w-[110px]"></div>
        </form>
      </div>
      {props.vendas.map((vendaId) => {
        return <VendaColuna key={vendaId.id} venda={vendaId} />
      })}
      {props.vendas.map(vendaIdc => {
        return <VendaColunaConfirmado key={vendaIdc.id} venda={vendaIdc} />
      })}
      <div className="flex justify-start" id="f">
        <div className="footer w-[150px]"></div>
        <div className="footer w-[150px]"></div>
        <div className="footer w-[150px]"></div>
        <form className="flex" action="">
          <div className="footer w-[90px]"></div>
          <div className="footer w-[150px]"></div>
          <div className="footer w-[90px]">{totalQuantidade}</div>
          <div className="footer w-[110px]"><Real valor={totalVendas} /></div>
          <div className="footer w-[110px]"><Real valor={totalCusto} /></div>
          <div className="footer w-[110px]"><Real valor={totalVendas - totalCusto} /></div>
          <div className="footer w-[110px]"></div>
          <div className="footer w-[110px]"></div>
        </form>
      </div>
    </div>
  )
}

export default TabelaVendas;
