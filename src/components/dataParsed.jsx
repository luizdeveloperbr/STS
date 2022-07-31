import moment from "moment"
function DataParsed(props){
    return moment(props.timestamp,"YYYY-MM-DD").format(props.format)
}

export default DataParsed