import { deleteDoc, doc, setDoc, collection } from "firebase/firestore"
import { db } from "../firebase";
import Real from "./ComponentReal";
import DataParsed from "./dataParsed";
import React from "react";
import { useUserAuth } from "../contexts/AuthContext"
// import { useNavigate } from "react-router-dom";
import { reloadList } from "../utils/updateList"


function VendaColunaConfirmado({ venda }) {

    const { user } = useUserAuth()
    // const navigate = useNavigate()
    const reloadUpdate = reloadList((state) => state.troggle)


    async function editVenda(vendaId) {
        const docRef = doc(collection(db, user.uid), vendaId);
        await setDoc(docRef, { confirmado: false }, { merge: true });
        // navigate('/');
        reloadUpdate()
    }

    async function deletarVenda(vendaId) {
        alert("Deletar")
        await deleteDoc(doc(db, user.uid, vendaId))
        // navigate("/")
        reloadUpdate()

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
                <div className="w-[110px] justify-evenly flex p-1 border border-black text-center">
                    <a
                        className="p-2 block min-w-[25px] rounded pencil border border-black hover:cursor-pointer"
                        onClick={() => editVenda(venda.id)}
                    ></a>
                    <a
                        className="p-2 block min-w-[25px] rounded delete border border-black hover:cursor-pointer"
                        onClick={() => deletarVenda(venda.id)}
                    ></a>
                </div>
            </form>
        </div>
    )
}
export default VendaColunaConfirmado
