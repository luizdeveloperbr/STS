import { deleteDoc, doc} from "firebase/firestore"
import { db } from "../firebase";
import Real from "./ComponentReal";
import DataParsed from "./dataParsed";
import React from "react";
import {useUserAuth} from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom";

function VendaColunaConfirmado({ venda }) {
    
    const { user } = useUserAuth()
    const navigate = useNavigate()
    async function deletarVenda(vendaId) {
        alert("Deletar")
        await deleteDoc(doc(db, user.uid, vendaId))
        navigate("/")
    }

    return (
                <div className="flex justify-start" id="c">
                    <div className="footer w-[150px]">
                        <DataParsed timestamp={venda.datetime} format="DD/MM/YYYY" />
                    </div>
                    <div className="footer w-[150px]">{venda.userID}</div>
                    <div className="footer w-[150px]">{venda.userName}</div>
                    <form className="flex">
                        <div className="footer w-[90px]">{venda.tipo}</div>
                        <div className="footer w-[150px] capitalize">{venda.banco}</div>
                        <div className="footer w-[90px]">{venda.quantidade}</div>
                        <div className="footer w-[110px]"><Real valor={venda.valorVenda} /></div>
                        <div className="footer w-[110px]"><Real valor={venda.quantidade * venda.custoUnitario} /></div>
                        <div className="footer w-[110px]"><Real valor={venda.valorVenda - (venda.quantidade * venda.custoUnitario)} /></div>
                        <div className="footer w-[110px]"><div className="task min-w-full h-4"></div></div>
                        <div className="footer w-[110px]">
                            <a className="button mx-1 hover:cursor-pointer" onClick={() => deletarVenda(venda.id)}>X</a>
                        </div>
                    </form>
                </div>
    )
}
export default VendaColunaConfirmado
