import NewPage from "../pages/newPage"
import NewPageTwo from "../pages/newPage2"

const routers = [
    {
        path: "/1",
        title: "Pagina 1",
        element: <NewPage />
    },
    {
        path: "/2",
        title: "Pagina 2",
        element: <NewPageTwo />
    }
]

export default routers