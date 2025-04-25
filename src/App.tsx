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
                initData: "user=%7B%22id%22%3A903280307%2C%22first_name%22%3A%22%7Eunlucky%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22NobodYYY_devvv%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2F7V6_6b2d2aan6f-8fABHJOTTcc72JQtNlcuZ-CrYWcc.svg%22%7D&chat_instance=3556456391126636013&chat_type=channel&auth_date=1745570003&signature=Lc7OqXVuCElTsSFeeh17tIsmaKEOx8UHYyHHoNYL9N3TnOXNkFtzCy8yvMDIZZbFlaAaHHfr2njAU4PXmNOVAQ&hash=fa1d0d5f89f82b8d30b6b7d6d51b7ca82c0c31983176fdae942f60b9234e20d4",
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
                {cnt}
                {haha.map((item: string, index: number) => {
                    return <p key={index}>{item}</p>
                })}
            </pre>
        </div>
    );
}

export default App;