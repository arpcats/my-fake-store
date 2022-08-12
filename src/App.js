import logo from './logo.svg';
import './App.css';
import Nav from "./components/Nav";
import ProductList from "./components/ProductList";

function App() {
  return (
    <div className="App">
      <Nav />
      <div className="mt-4">
        <ProductList />
      </div>
    </div>
  );
}

export default App;
