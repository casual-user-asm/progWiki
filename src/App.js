import './App.css'
import Home from './pages/Home'
import { Provider } from 'react-redux'
import store from './redux/store'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DataList from './pages/DataList'

function App() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="content" element={<DataList />} />
                    </Routes>
                </div>
            </Provider>
        </BrowserRouter>
    )
}

export default App
