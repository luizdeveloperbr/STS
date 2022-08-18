import { collection, query, where, getDocs, limit, onSnapshot } from "firebase/firestore"
import { db } from "./index"

export async function listarVendas(id, coluna, valor, setState) {
    if (id === undefined) {
        setState([])
    } else {
        const colecao = query(collection(db, id), where(coluna, "==", valor))
        const querySnapshot = await getDocs(colecao);
        let arrayDocs = []
        querySnapshot.forEach((doc) => {
            arrayDocs.push({ ...doc.data(), id: doc.id })
        });
        setState(arrayDocs)
    }
}

export function dashboardRealtime(id, days, setState) {
    if (id !== undefined) {
        const q = query(collection(db, id), where("datetime", "in", days), limit(50));
        onSnapshot(q, (querySnapshot) => {
            const vendas = [];
            querySnapshot.forEach((doc) => {
                vendas.push(doc.data());
            });
            setState(vendas)
        },(e) => console.warn(e));
    }
}

export function getTotal(array, prop, setstate) {
    let result = []
    array.forEach(item => {
        result.push(item[prop])
    })
    const resultReduce = result.reduce((acumulado, atual) => { return acumulado + atual }, 0)
    setstate(resultReduce)
}

export function getTotalCusto(array, setState) {
    let listaCusto = []
    array.forEach((item) => {
        listaCusto.push(item.custoUnitario * item.quantidade)
    })
    const custoSomado = listaCusto.reduce((acumulado, atual) => { return acumulado + atual }, 0)
    setState(custoSomado)
}