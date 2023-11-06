import {icon, NewP as ComponentPage} from "../pages/newPage"
// import NewPageTwo from "../pages/newPage2"
// import barchart from "../style/icons/bar-chart.svg"

const routers = [
    {
        path: "/1",
        title: "Pagina 1",
        icon: icon,
        element: <ComponentPage />
    },
    // {
    //     path: "/2",
    //     title: "Pagina 2",
    //     icon: barchart,
    //     element: <NewPageTwo />
    // }
]

export default routers