import './App.css';
import Header from "./layout/header/Header";
import Content from "./layout/content/Content";
import Footer from "./layout/footer/Footer";
import {AlertPopup, AlertProvider} from "./context/Alert";

function App() {
    return (
        <div id="root">
            <AlertProvider>
                <Header/>
                <AlertPopup/>
                <Content/>
                <Footer/>
            </AlertProvider>
        </div>
    )
}

export default App
