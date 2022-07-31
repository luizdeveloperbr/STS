import moment from "moment"
// import useStore from "../contexts/useMesStore"
function SelectMes() {

    const meses = moment.months()
    return (<select className="capitalize font-normal form-input" onInput={(e) => console.log(e.target.value)}>
        {meses.map((mes) => {
            return (<option className="capitalize" value={mes} key={mes}>{mes}</option>)
        })}
    </select>)

}
export default SelectMes