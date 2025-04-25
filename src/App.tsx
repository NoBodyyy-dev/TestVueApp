import './App.css';
import WebApp from '@twa-dev/sdk';
import io from 'socket.io-client';
import {useEffect, useState} from "react";
import Socket = SocketIOClient.Socket;


function App() {
    const [cnt, setCnt] = useState<number>(0)
    const [haha, setHaha] = useState<string[]>([])

    useEffect(() => {
            const socket: Socket = io("https://api.mygifts.pw", {
                auth: {
                    initData: localStorage.getItem("token"),
                },
                path: "/ws"
            });

            socket.on("online-users", (data: number) => {
                setCnt(data)
            })

            socket.on("live-feed", (data: string[]) => {
                setHaha(data)
            });
            return () => {
                socket.disconnect()
        }
    }, [])

    return (
        <div className="app-container">
            <pre>
            {/*{WebApp.initData}*/}
                {cnt}
                {haha.map((item: string, index: number) => {
                    return <p key={index}>{item}</p>
                })}
            </pre>
        </div>
    );
}

export default App;