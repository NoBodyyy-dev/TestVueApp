import './App.css'
import WebApp from '@twa-dev/sdk';
import {useEffect} from "react";

function App() {
    useEffect(() => {
        WebApp.ready();
        console.log(WebApp.initDataUnsafe)
    })

    const haha = "user=%7B%22id%22%3A903280307%2C%22first_name%22%3A%22%7Eunlucky%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22NobodYYY_devvv%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2F7V6_6b2d2aan6f-8fABHJOTTcc72JQtNlcuZ-CrYWcc.svg%22%7D&chat_instance=5615270519375957750&chat_type=private&auth_date=1745184756&signature=FcxsdGa3OrF0JCidGmucD5IUql4N5J06wFxpwpU_1mcUjMwBPUDlRzRqQ7C8PLQzJDNt7lf1N3EIhHfS6rIrBA&hash=0096e4c75fe26c9d9c8defbf3a08d18270d78c0ea58bfaf64d1ff29ccc2a15e6"

    return (
        <>
            <div>
                <h1>Hello, Telegram Mini App!</h1>
                <h1>{WebApp.initDataUnsafe?.user?.username}</h1>
                <button onClick={() => WebApp.close()}>Close App</button>
            </div>
        </>
    )
}

export default App
