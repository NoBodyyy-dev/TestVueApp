import './App.css';
import WebApp from '@twa-dev/sdk';
import io from 'socket.io-client';
import {useEffect, useState} from "react";


function App() {
    const [cnt, setCnt] = useState<number>(0)

    const socket = io("http://localhost:3000", {
        reconnection: true,
        auth: {initData: WebApp.initData}
    })

    useEffect(() => {
        socket.connect();
        socket.on("online-users", (data: number) => {
            setCnt(data);
        })
    }, [])

    return (
        <div className="app-container">
            <pre>
            {/*{WebApp.initData}*/}
                {cnt}
            </pre>
        </div>
    );
}

export default App;