import React, { useEffect, useState } from 'react';
import { listarVendas, getTotal, getTotalCusto } from '../firebase/controller';
import Real from './ComponentReal';
import moment from 'moment';
moment.locale('pt-br',{
  months: 'janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro'.split(
      '_'
  )})
import { useUserAuth } from '../contexts/AuthContext';

function Relatorios({ mes }) {
  const { user } = useUserAuth();

  const [tipo, setTipo] = useState('');
  const [listaMes, setListaMes] = useState([]);

  const [totalQuantidadeMes, setTotalQuantidadeMes] = useState(0);
  const [totalVendasMes, setTotalVendasMes] = useState(0);
  const [totalCustoMes, setTotalCustoMes] = useState(0);

  const [totalVendasTipo, setTotalVendasTipo] = useState(0);
  const [totalQuantidadeTipo, setTotalQuantidadeTipo] = useState(0);
  const [totalCustoTipo, setTotalCustoTipo] = useState(0);

  const filtrarPorTipo = listaMes.filter((venda) => venda.tipo === tipo);

  useEffect(() => {
    const queryMes = moment(mes, 'MMMM').format('YYYY-MM');
    listarVendas(user.uid, 'mes', queryMes, setListaMes);
  }, []);

  useEffect(() => {
    getTotal(filtrarPorTipo, 'quantidade', setTotalQuantidadeTipo);
    getTotal(filtrarPorTipo, 'valorVenda', setTotalVendasTipo);
    getTotalCusto(filtrarPorTipo, setTotalCustoTipo);
  }, [tipo]);

  useEffect(() => {
    getTotal(listaMes, 'quantidade', setTotalQuantidadeMes);
    getTotal(listaMes, 'valorVenda', setTotalVendasMes);
    getTotalCusto(listaMes, setTotalCustoMes);
  }, [listaMes]);

  return (
    <>
      {totalQuantidadeMes === 0 ? (
        <></>
      ) : (
        <tbody id="tabela-relatorio">
          <tr>
            <td>
            <a
                className="capitalize mx-1 py-0 hover:cursor-pointer hover:underline hover:text-blue-400"
                onClick={() => setTipo('')}
              >
                {mes}
              </a>
            </td>
            <td>
            <a
                className="font-bold mx-1 py-0 hover:cursor-pointer"
                onClick={() => setTipo('R')}
              >
                {tipo === 'R' ? (<span className="button-active">R</span>): (<span className="button">R</span>)}
              </a>
              <a
                className="font-bold mx-1 py-0 hover:cursor-pointer"
                onClick={() => setTipo('N')}
              >
                {tipo === 'N' ? (<span className="button-active">N</span>): (<span className="button">N</span>)}
              </a>
            </td>
            <td>{tipo === '' ? totalQuantidadeMes : totalQuantidadeTipo}</td>
            <td className="px-2">
              {tipo === '' ? (
                <Real valor={totalVendasMes} />
              ) : (
                <Real valor={totalVendasTipo} />
              )}
            </td>
            <td className="px-2">
              {tipo === '' ? (
                <Real valor={totalCustoMes} />
              ) : (
                <Real valor={totalCustoTipo} />
              )}
            </td>
            <td className="px-2">
              {tipo === '' ? (
                <Real valor={totalVendasMes - totalCustoMes} />
              ) : (
                <Real valor={totalVendasTipo - totalCustoTipo} />
              )}
            </td>
          </tr>
        </tbody>
      )}
    </>
  );
}
export default Relatorios;
