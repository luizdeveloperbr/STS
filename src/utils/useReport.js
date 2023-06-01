import {useState} from 'react'
import jsreport from "@jsreport/browser-client"
// import moment from "moment";

const adminUrl = import.meta.env.VITE_ADMIN_URL;

jsreport.serverUrl = `${adminUrl}reports/`

export function useReports(){

const [isLoading, setIsLoading] = useState(false)

function DownloadReport(reportr_id, data, {title, extension}) {
    setIsLoading(true)
    jsreport.render({
        template: {
            name: reportr_id
        },
        data: data
    })
        .then((file) => {
            file.download(`${title}.${extension}`)
        }).finally(() => {
            setIsLoading(false)
        })
}

return {DownloadReport, isLoading}
}
