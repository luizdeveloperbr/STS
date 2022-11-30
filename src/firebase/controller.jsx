import {
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";
import { db } from "./index";

export async function listarVendas(id, coluna, valor, setState) {
  if (id === undefined) {
    setState([]);
  } else {
    const colecao = query(collection(db, id), where(coluna, "==", valor));
    const querySnapshot = await getDocs(colecao);
    let arrayDocs = [];
    querySnapshot.forEach((doc) => {
      arrayDocs.push({ ...doc.data(), id: doc.id });
    });
    if (setState === undefined) {
      return arrayDocs;
    } else {
      setState(arrayDocs);
    }
  }
}

export function getTotal(array, prop) {
  if (array === undefined) {
    return 0;
  } else {
    let result = [];
    array.forEach((item) => {
      result.push(item[prop]);
    });
    const resultReduce = result.reduce((acumulado, atual) => {
      return acumulado + atual;
    }, 0);
    return resultReduce;
  }
}

export function getTotalCusto(array) {
  if (array === undefined) {
    return 0;
  } else {
    let listaCusto = [];
    array.forEach((item) => {
      listaCusto.push(item.custoUnitario * item.quantidade);
    });
    const custoSomado = listaCusto.reduce((acumulado, atual) => {
      return acumulado + atual;
    }, 0);
    return custoSomado;
  }
}
