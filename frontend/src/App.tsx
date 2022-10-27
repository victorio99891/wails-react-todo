import {useState} from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import {GetTasks, Greet} from "../wailsjs/go/main/App";
import {LogInfo} from "../wailsjs/runtime";

function App() {
    const [resultText, setResultText] = useState("Please enter your name below 👇");
    const [name, setName] = useState('');
    const updateName = (e: any) => setName(e.target.value);
    const updateResultText = (result: string) => setResultText(result);

    function greet() {
        todos()
        Greet(name).then(updateResultText);
    }

    function todos() {
        GetTasks().then(items => {
           items.forEach(item => {
               LogInfo(item.Id + " " + item.Text + " " + item.IsDone)
           })
        })
    }

    return (
        <div id="App">
            <img src={logo} id="logo" alt="logo"/>
            <div id="result" className="result">{resultText}</div>
            <div id="input" className="input-box">
                <input id="name" className="input" onChange={updateName} autoComplete="off" name="input" type="text"/>
                <button className="btn" onClick={greet}>Greet</button>
            </div>
        </div>
    )
}

export default App
