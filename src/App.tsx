import './App.css'
import WebApp from '@twa-dev/sdk';
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "./hooks/hooks.ts";
import {Login} from "./store/user.actions.ts";

function App() {
    const dispatch = useAppDispatch();
    const {initData, load} = useAppSelector(state => state.user);

    useEffect(() => {
        WebApp.ready();
        dispatch(Login(WebApp.initData))
        console.log(WebApp.initDataUnsafe)
    })

    return (
        <>
            <div>
                <h1>Hello, Telegram Mini App!</h1>
                <h1>{WebApp.initData}</h1>
                {load ? "Загрузка" : <p>{initData}</p>}
                <button onClick={() => WebApp.close()}>Close App</button>
            </div>
        </>
    )
}

export default App
