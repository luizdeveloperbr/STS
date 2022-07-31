import React,{useEffect, useState} from "react";
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase";

function Datalist(props) {
    const [bancos, setBancos] = useState([]);

    async function getBancos() {
        const docRef = await getDoc(doc(db, "config", "bancos"))
        setBancos(docRef.get("listBancos"))
    }
    useEffect(() => {
        getBancos()
    }, [])
    return (
        <>
            <input className="form-input capitalize w-[140px]" list="bank" {...props} />
            <datalist id="bank">
                {bancos.map(banco => (<option key={banco} value={banco}>{banco}</option>))}
            </datalist>
        </>
    )
}
export default Datalist