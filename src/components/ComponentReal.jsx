function Real({ valor }) {
    if(valor === undefined){
        return
    }
    return <span className={valor < 0 ? "text-red-500": ""}>{valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
}

export default Real;