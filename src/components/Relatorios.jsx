import React, { useEffect, useState } from "react"
import { listarVendas, getTotal, getTotalCusto } from "../firebase/controller"
import Real from "./ComponentReal";
// import { db } from "../firebase"
// import { getDoc, doc } from "firebase/firestore"

function Relatorios(prop) {
    // state INPUT meses *comparativo*
    const [mes1, setMes1] = useState("");
    const [mes2, setMes2] = useState("");



    //LISTA de cada mes *comparativo*
    const [listaM1, setListaM1] = useState([]);
    const [listaM2, setListaM2] = useState([]);


    //   ** TOTAIS **
    const [totalQuantidadeM1, setTotalQuantidadeM1] = useState(0)
    const [totalQuantidadeM2, setTotalQuantidadeM2] = useState(0)
    const [totalTipo1,setTotalTipo1] = useState(0)
    const [totalVendasM1, setTotalVendasM1] = useState(0)
    const [totalVendasM2, setTotalVendasM2] = useState(0)

    const [totalCustoM1, setTotalCustoM1] = useState(0)
    const [totalCustoM2, setTotalCustoM2] = useState(0)
    //    ** LUCRO **
    const lucro1 = totalVendasM1 - totalCustoM1;
    const lucro2 = totalVendasM2 - totalCustoM2;

    const filterT = listaM1.filter(vnd => vnd.tipo === "N")
    // function filtarTipo(lista, tipo, setstate) {
    //     const result = lista.filter(vnd => vnd.tipo === tipo)
    //     getTotal(result,"valorVenda",setstate)
    // }

    // const [bancos, setBancos] = useState([]);
    // const [banco, setBanco] = useState([]);

    // async function getBancos() {
    //     const docRef = await getDoc(doc(db, "config", "bancos"))
    //     setBancos(docRef.get("listBancos"))
    // }
    useEffect(() => {
        listarVendas(prop.collection, "mes", mes1, setListaM1)
    }, [mes1])

    useEffect(() => {
        getTotal(listaM1, "quantidade", setTotalQuantidadeM1)
        getTotal(listaM1, "valorVenda", setTotalVendasM1)
        getTotal(filterT,"valorVenda",setTotalTipo1)
        getTotalCusto(listaM1, setTotalCustoM1)
    },[listaM1])

    useEffect(() => {
        listarVendas(prop.collection, "mes", mes2, setListaM2)
    },[mes2])

    useEffect(() => {
        getTotal(listaM2, "quantidade", setTotalQuantidadeM2)
        getTotal(listaM2, "valorVenda", setTotalVendasM2)
        getTotalCusto(listaM2, setTotalCustoM2)
    }, [listaM2])


    return (
        <div>
            {/* <select className="form-input" onInput={(e) => setBanco(e.target.value)}>
                <option value="">Todos</option>
                {bancos.map((banco) => {
                    return (<option value={banco} key={banco}>{banco}</option>)
                })}
            </select> */}
            <table>
                <thead>
                    <tr>
                        <th>Meses</th>
                        <th>Quantidade</th>
                        <th>Venda</th>
                        <th>Custo</th>
                        <th>Lucro {totalTipo1}</th>
                    </tr>
                </thead>
                <tbody id="tabela-relatorio">
                    <tr>
                        <td>
                            <input type="month" className="pl-2 form-input" onInput={(e) => setMes1(e.target.value)} />
                        </td>
                        <td>{totalQuantidadeM1}</td>
                        <td className="px-2"><Real valor={totalVendasM1} /></td>
                        <td className="px-2"><Real valor={totalCustoM1} /></td>
                        <td className="px-2"><Real valor={totalVendasM1 - totalCustoM1} /></td>
                    </tr>
                    <tr>
                        <td>
                            <input type="month" className="pl-2 form-input" onInput={(e) => setMes2(e.target.value)} />
                        </td>
                        <td>{totalQuantidadeM2}</td>
                        <td className="px-2"><Real valor={totalVendasM2} /></td>
                        <td className="px-2"><Real valor={totalCustoM2} /></td>
                        <td className="px-2"><Real valor={totalVendasM2 - totalCustoM2} /></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>{totalQuantidadeM1 + totalQuantidadeM2}</td>
                        <td className="px-2"><Real valor={totalVendasM1 + totalVendasM2} /></td>
                        <td className="px-2"><Real valor={totalCustoM1 + totalCustoM2} /></td>
                        <td className="px-2"><Real valor={lucro1 + lucro2} /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default Relatorios