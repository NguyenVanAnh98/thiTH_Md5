import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import BookList from './Component/BookList/BookList';
import AddNew from "./Component/AddNew/AddNew";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/books" element={<BookList />} />
                    <Route path="/books/create" element={<AddNew />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
