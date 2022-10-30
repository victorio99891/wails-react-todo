import {useState} from 'react';
import './App.css';
import {GetTasks} from "../wailsjs/go/main/App";
import {LogInfo} from "../wailsjs/runtime";
import Header from "./layout/header/Header";
import Content from "./layout/content/Content";
import Footer from "./layout/footer/Footer";

function App() {
    const [resultText, setResultText] = useState("Please enter your name below");
    const updateResultText = (result: string) => setResultText(result);
    const [name, setName] = useState('');
    const updateName = (e: any) => setName(e.target.value);


    function LoadTodos() {
        GetTasks().then(items => {
            items.forEach(item => {
                LogInfo(item.Id + " " + item.Text + " " + item.IsDone)
            })
        })
    }

    return (
        <div id="root">
            <Header/>
            <Content/>
            <Footer/>
        </div>
    )
}

export default App
