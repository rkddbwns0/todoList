import { useState } from 'react';
import '../css/login.css';
import axios from 'axios';
import { SERVER_ADDRESS } from '../components/serverAddress';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                `${SERVER_ADDRESS}/user/login`,
                { email: email, password: password },
                { withCredentials: true }
            );
            if (response.status === 200) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                navigate('/todo');
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className="container">
            <div>
                <div className="loginContainer">
                    <div className="titleView">
                        <h2 className="loginTitle">TodoList</h2>
                    </div>
                    <form className="loginView" action={handleLogin} method="post">
                        <input
                            className="loginInput"
                            type="email"
                            placeholder="아이디"
                            value={email}
                            onChange={(text) => setEmail(text.target.value)}
                        />
                        <input
                            className="loginInput"
                            type="password"
                            placeholder="비밀번호"
                            value={password}
                            onChange={(text) => setPassword(text.target.value)}
                        />

                        <button className="loginBtn" type="submit">
                            로그인
                        </button>

                        <div>
                            <a href="/signup">회원가입</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
