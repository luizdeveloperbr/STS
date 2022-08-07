import { useEffect, useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import {
  collection,
  setDoc,
  doc
} from 'firebase/firestore';
import { db } from '../firebase';
import { useUserAuth } from '../contexts/AuthContext';
import VendaColuna from '../components/VendaColuna';
import VendaColunaConfirmado from '../components/VendaColunaConfirmado';
import Relatorios from '../components/Relatorios';
import moment from 'moment';
import { listarVendas } from "../firebase/controller"
import ptBR from '../utils/pt-br';
import { orderBy } from "lodash"
import { reloadList } from "../utils/updateList"
import { Form, Formik, Field } from 'formik';
moment.updateLocale('pt-BR', ptBR);

function Dashboard() {
  const [todos,setTodos] = useState([])
  const [custoUnitario, setCustoUnitario] = useState(4)
  // const [listaDeVendas, setListaDeVendas] = useState([]);
  // const [listaDeVendasNot, setListaDeVendasNot] = useState([]);
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();

  const reload = reloadList((state) => state.reload)
  const reloadUpdate = reloadList((state) => state.toggle)

  async function novoRegistro(values) {
    const docRef = doc(collection(db, user.uid));
    const dateSubmit = moment().toDate();
    const mesSubmit = moment(values.datetime, "YYYY-MM-DD").format("YYYY-MM")
    await setDoc(docRef, { ...values, datetime: dateSubmit, mes: mesSubmit, custoUnitario });
    reloadUpdate()
  }

  async function handleSignOut() {
    await logOut();
    navigate('/');
  }
  const todosOrder = orderBy(todos,["datetime"],"desc")
  // const listaNaoC = orderBy(listaDeVendasNot.filter(venda => venda.confirmado === false), ["datetime"], "desc")
  // const listaC = orderBy(listaDeVendas.filter(venda => venda.confirmado === true), ["updatetime"], "desc")

  useEffect(() => {
    listarVendas(user.uid, "mes", moment().format("YYYY-MM"), setTodos,100)
    // listarVendas(user.uid, "mes", moment().format("YYYY-MM"), setListaDeVendas,15);
    // listarVendas(user.uid, "mes", moment().format("YYYY-MM"), setListaDeVendasNot);
  }, [reload]);
  return (
    <div id="main" className="p-4">
      <nav className="font-bold pl-2 border border-black min-h-[40px] rounded mb-2 relative bg-slate-200">
        <div className='mt-2 float-left'>Usuario: {user.email} </div>
        <div className="mt-2 float-right">
          <a
            className="mx-2 button hover:cursor-pointer"
            onClick={handleSignOut}
          >
            Sair
          </a>
        {/* <Link className="ml-2 button hover:cursor-pointer" to="/trocar-senha">Trocar Senha</Link> */}
        </div>
      </nav>
      <Formik
        initialValues={{
          userID: '',
          userName: '',
          banco: '',
          tipo: 'R',
          datetime: moment().format('YYYY-MM-DD'),
          quantidade: 0,
          valorVenda: 0,
          confirmado: false
        }}
        onSubmit={novoRegistro}
      >
        {({ isSubmitting }) => (
          <Form className="w-full flex">
            <label className="m-1 grid text-sm" htmlFor="datetime">
              Data
              <Field
                type="date"
                // min={moment().format('YYYY-MM-DD')}
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
              <input
                required
                onChange={e => setCustoUnitario(e.target.value)}
                type="number"
                step="0.5"
                min="4"
                className="form-input w-[90px]"
                name="custoUnitario"
                value={custoUnitario}
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
            </div>
          </Form>
        )}
      </Formik>
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
            <div className="header w-[110px]">
              <a onClick={() => reloadUpdate()} className="p-2 reload hover:cursor-pointer">
              </a>
            </div>
          </form>
        </div>
        {/* {listaNaoC.map((vendaId) => {
          return <VendaColuna key={vendaId.id} venda={vendaId} />;
        })}
        {listaC.map((vendaId) => {
          return <VendaColunaConfirmado key={vendaId.id} venda={vendaId} />;
        })} */}
        {
          todosOrder.map(vendaID => {
            return <VendaColuna key={vendaID.id} venda={vendaID} />
          })
        }
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th>Quantidade</th>
            <th>Venda </th>
            <th>Custo</th>
            <th>Lucro</th>
          </tr>
        </thead>
        {
          moment.months().map(mes => {
            return (
              <Relatorios key={mes} mes={mes} />
            )
          })
        }
      </table>
    </div>
  );
}

export default Dashboard;
