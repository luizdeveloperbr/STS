import NewPage from "../pages/newPage"
import NewPageTwo from "../pages/newPage2"

const routers = [

    {
        path: "/2",
        element: <NewPageTwo />
    },
    {
        path: "/1",
        element: <NewPage />
    }
]

export default routers