import axios from 'axios';
import { useState } from 'react';
import { SERVER_ADDRESS } from '../css/components/serverAddress';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        try {
            const response = await axios.post(`${SERVER_ADDRESS}/user/create`, {
                name: name,
                email: email,
                password: password,
            });
            if (response.status === 200) {
                alert(`${response.data.message}`);
                navigate('/login');
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            }
        }
    };

    return (
        <div className="container">
            <div className="loginContainer">
                <div>
                    <h2>회원가입</h2>
                </div>
                <form className="loginView" action={handleSignup} method="post">
                    <input
                        className="loginInput"
                        type="text"
                        placeholder="이름"
                        value={name}
                        onChange={(text) => setName(text.target.value)}
                    />
                    <input
                        className="loginInput"
                        type="email"
                        placeholder="이메일"
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

                    <div className="loginBtnView">
                        <button className="loginBtn" type="submit">
                            회원가입
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
