import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  collection,
  setDoc,
  doc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { db } from '../firebase';
import { useUserAuth } from '../contexts/AuthContext';
import TabelaVendas from '../components/TabelaVendas';
import Relatorios from '../components/Relatorios';
import moment from 'moment';
import ptBR from '../utils/pt-br';
import { Form, Formik, Field } from 'formik';
moment.updateLocale('pt-BR', ptBR);

function Dashboard() {
  const [reload,setReload] = useState(true)
  const [listaDeVendas, setListaDeVendas] = useState([]);
  const [listaDeVendasNot, setListaDeVendasNot] = useState([]);
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();

  async function listarVendas(id, coluna, valor, completa, incompleta) {
    let colecao;
    if (valor == '') {
      colecao = collection(db, id);
    } else {
      colecao = query(collection(db, id), where(coluna, '==', valor));
    }
    const querySnapshot = await getDocs(colecao);

    let arrayDocs = [];
    querySnapshot.forEach((doc) => {
      arrayDocs.push({ ...doc.data(), id: doc.id });
    });
    let listaC = arrayDocs.filter((vnd) => vnd.confirmado === true);
    let listaNot = arrayDocs.filter((vnd) => vnd.confirmado === false);
    completa(listaC);
    incompleta(listaNot);
  }

  async function novoRegistro(values) {
    const docRef = doc(collection(db, user.uid));
    const mesSubmit = moment(values.datetime, 'YYYY-MM-DD').format('YYYY-MM');
    await setDoc(docRef, { ...values, mes: mesSubmit });
    listarVendas(user.uid, 'mes', '', setListaDeVendas, setListaDeVendasNot);
  }

  async function handleSignOut() {
    await logOut();
    navigate('/');
  }

  useEffect(() => {
    listarVendas(user.uid, 'mes', '', setListaDeVendas, setListaDeVendasNot);
  }, [reload]);

  return (
    <div id="main" className="p-4">
      <nav className="font-bold pl-2 min-h-[40px] border border-black rounded mb-2 flex flex-grow place-items-center bg-slate-200">
        <div>Usuario:</div>
        <div>
          <a
            className="ml-2 button hover:cursor-pointer"
            onClick={handleSignOut}
          >
            {user.email}
          </a>
        </div>
      </nav>
      <Formik
        initialValues={{
          userID: '',
          userName: '',
          datetime: moment().format('YYYY-MM-DD'),
          quantidade: 0,
          custoUnitario: 4.5,
          valorVenda: 0,
          confirmado: false
        }}
        onSubmit={novoRegistro}
      >
        {({ isSubmitting }) => (
          <Form className="mx-auto flex overflow-x-auto">
            <label className="m-1 grid text-sm" htmlFor="datetime">
              Data
              <Field
                type="date"
                min={moment().format('YYYY-MM-DD')}
                name="datetime"
                className="form-input"
                required
              />
            </label>
            <label className="m-1 grid text-sm" htmlFor="userID">
              Usuario
              <Field
                required
                className="form-input"
                name="userID"
                placeholder="Br1234"
              />
            </label>
            <label className="m-1 grid text-sm" htmlFor="userName">
              Nome
              <Field
                required
                className="form-input"
                name="userName"
                placeholder="Ex. João"
              />
            </label>
            <label className="m-1 grid text-sm" htmlFor="custoUnitario">
              Custo Unitario
              <Field
                required
                type="number"
                className="form-input w-[90px]"
                name="custoUnitario"
                placeholder="R$ X,XX"
              />
            </label>
            <div className="self-end pb-2">
              <button
                type="submit"
                className="hidden"
                disabled={isSubmitting}
              ></button>
              <button type="reset" className="button mx-1">
                Limpar
              </button>
              <a onClick={()=> setReload(!reload)} type="reset" className="button mx-1">
              (*)
              </a>
            </div>
          </Form>
        )}
      </Formik>
      <TabelaVendas completa={listaDeVendas} incompleta={listaDeVendasNot} />
      <Relatorios collection={user.uid} />
    </div>
  );
}

export default Dashboard;
