import './App.css'
import Home from './pages/Home'
import { Provider } from 'react-redux'
import store from './redux/store'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DataList from './pages/DataList'
import AllArticles from './pages/AllArticles'
import AllBooks from './pages/AllBooks'
import AllCourses from './pages/AllCourses'

function App() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="content" element={<DataList />} />
                        <Route path="articles" element={<AllArticles />} />
                        <Route path="books" element={<AllBooks />} />
                        <Route path="courses" element={<AllCourses />} />
                    </Routes>
                </div>
            </Provider>
        </BrowserRouter>
    )
}

export default App
