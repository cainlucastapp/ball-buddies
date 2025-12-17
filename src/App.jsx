// App.jsx

//Dependencies
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Shop from "./pages/Shop"
import AdminPortal from "./pages/AdminPortal"
import NotFound from "./pages/NotFound"
import "./styles/App.css"

const App = () => {
    return (
        <>
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <Header />
                <div className="app-container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="/admin" element={<AdminPortal />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </>
    )
}

export default App