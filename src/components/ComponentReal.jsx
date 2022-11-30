function Real({ valor }) {
    if(valor === undefined){
        return
    }
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default Real;