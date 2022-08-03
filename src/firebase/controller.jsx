import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "./index"

export async function listarVendas(id, coluna, valor, setState) {
    let colecao
    if (id === undefined) {
        setState([])
    } else {
        colecao = query(collection(db, id), where(coluna, "==", valor))
        const querySnapshot = await getDocs(colecao);

        let arrayDocs = []
        querySnapshot.forEach((doc) => {
            arrayDocs.push({ ...doc.data(), id: doc.id })
        });
        setState(arrayDocs)
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