import './App.css'
import WebApp from '@twa-dev/sdk';
import {useEffect} from "react";

function App() {
    useEffect(() => {
        WebApp.ready();
        console.log(WebApp.initDataUnsafe)
    })

    return (
        <>
            <div>
                <h1>Hello, Telegram Mini App!</h1>
                <button onClick={() => WebApp.close()}>Close App</button>
            </div>
        </>
    )
}

export default App
