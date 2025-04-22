import './App.css';
import WebApp from '@twa-dev/sdk';
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/hooks.ts";
import { Login } from "./store/user.actions.ts";
import { io, Socket } from 'socket.io-client';

// Типы для сообщений сокета
type SocketMessage = {
    event: string;
    data: any;
    timestamp: number;
};

function App() {
    const dispatch = useAppDispatch();
    const { initData, load } = useAppSelector(state => state.user);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [socketStatus, setSocketStatus] = useState<string>('disconnected');
    const [socketMessages, setSocketMessages] = useState<SocketMessage[]>([]);
    const [inputMessage, setInputMessage] = useState<string>('');

    // Инициализация приложения и сокета
    useEffect(() => {
        // Инициализация Telegram WebApp
        WebApp.ready();
        dispatch(Login(WebApp.initData));

        // Создание подключения к сокету
        const newSocket = io('https://mygifts.pw', {
            path: '/socket.io',
            transports: ['websocket'],
            query: {
                tgUserId: WebApp.initDataUnsafe.user?.id,
                tgInitData: WebApp.initData
            }
        });

        setSocket(newSocket);

        // Обработчики событий сокета
        newSocket.on('connect', () => {
            setSocketStatus('connected');
            addMessage('system', 'Connected to socket server');

            // Пример подписки на комнату при подключении
            newSocket.emit('join', {
                room: 'telegram_users',
                userId: WebApp.initDataUnsafe.user?.id
            });
        });

        newSocket.on('disconnect', () => {
            setSocketStatus('disconnected');
            addMessage('system', 'Disconnected from socket server');
        });

        newSocket.on('connect_error', (err: any) => {
            setSocketStatus('error');
            addMessage('error', `Connection error: ${err.message}`);
        });

        // Обработка кастомных событий от сервера
        newSocket.on('server_message', (data: any) => {
            addMessage('server', data);
        });

        newSocket.on('notification', (data: any) => {
            addMessage('notification', data);
            WebApp.showAlert(data.message || 'New notification');
        });

        // Очистка при размонтировании
        return () => {
            newSocket.disconnect();
        };
    }, [dispatch]);

    // Вспомогательная функция для добавления сообщений
    const addMessage = (event: string, data: any) => {
        setSocketMessages(prev => [
            ...prev,
            {
                event,
                data,
                timestamp: Date.now()
            }
        ]);
    };

    // Отправка сообщения через сокет
    const sendMessage = () => {
        if (!socket || !inputMessage.trim()) return;

        const messageData = {
            text: inputMessage,
            userId: WebApp.initDataUnsafe.user?.id,
            username: WebApp.initDataUnsafe.user?.username
        };

        socket.emit('client_message', messageData);
        addMessage('client', messageData);
        setInputMessage('');
    };

    return (
        <div className="app-container">
            <h1>Telegram Mini App with Socket.io</h1>

            <div className="telegram-data">
                <h2>Telegram Data</h2>
                {load ? (
                    <p>Loading...</p>
                ) : (
                    <pre>{JSON.stringify(initData, null, 2)}</pre>
                )}
            </div>

            <div className="socket-panel">
                <h2>Socket.io Connection</h2>
                <p>Status: <span className={`status-${socketStatus}`}>{socketStatus}</span></p>

                <div className="message-input">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Type your message..."
                    />
                    <button onClick={sendMessage} disabled={socketStatus !== 'connected'}>
                        Send
                    </button>
                </div>

                <div className="messages-container">
                    <h3>Messages Log:</h3>
                    <div className="messages-list">
                        {socketMessages.map((msg, index) => (
                            <div key={index} className={`message ${msg.event}`}>
                                <div className="message-header">
                                    <span className="event-type">{msg.event}</span>
                                    <span className="timestamp">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                                </div>
                                <div className="message-body">
                                    {typeof msg.data === 'string' ? msg.data : JSON.stringify(msg.data, null, 2)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <button className="close-btn" onClick={() => WebApp.close()}>
                Close App
            </button>
        </div>
    );
}

export default App;