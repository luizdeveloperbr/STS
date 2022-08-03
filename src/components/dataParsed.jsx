import moment from "moment"
function DataParsed({timestamp,format}){
    if(timestamp.seconds === undefined){
    return moment(timestamp,"YYYY-MM-DD").format(format)
    }else{
    return moment.unix(timestamp.seconds).format(format)
    }
}

export default DataParsed