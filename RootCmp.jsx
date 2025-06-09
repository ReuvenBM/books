const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM



import { Vision } from "./cmps/AboutCmps/Vision.jsx"
import { Team } from "./cmps/AboutCmps/Team.jsx"
import { AppHeader } from "./cmps/AppHeader.jsx"
import { NotFound } from "./cmps/NotFound.jsx"
import { About } from "./pages/About.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { Home } from "./pages/Home.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { AppFooter } from "./cmps/AppFooter.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"

export function App() {

    return (
        <Router>
            <section className="app">
                <AppHeader />
                <main className="main-layout">
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/about" element={<About />}>
                            <Route path="/about/vision" element={<Vision />} />
                            <Route path="/about/team" element={<Team />} />ƒ
                        </Route>
                        <Route path="/book" element={<BookIndex />} />
                        <Route path="/book/:bookId" element={<BookDetails />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <AppFooter />
                <UserMsg />
            </section>
        </Router>
    )
} 