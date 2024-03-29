import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Home} from "./pages/Home";
import {NewRoom} from "./pages/NewRoom";
import {AuthContextProvider} from './contexts/AuthContext'
import {Room} from "./pages/Room";
import {AdminRoom} from "./pages/AdminRoom";


function App() {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Routes>
                    <Route caseSensitive path="/" element={<Home/>}/>
                    <Route caseSensitive path="/rooms/new" element={<NewRoom/>}/>
                    <Route caseSensitive path="/rooms/:id" element={<Room/>}/>
                    <Route caseSensitive path="/admin/rooms/:id" element={<AdminRoom/>}/>
                </Routes>
            </AuthContextProvider>
        </BrowserRouter>
    );
}

export default App;