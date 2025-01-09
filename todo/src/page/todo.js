import axios from 'axios';
import { SERVER_ADDRESS } from '../components/serverAddress';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStorageUser from './storage/storageUser';
import '../css/todo.css';
import TodoDataComponent from '../components/todoDataComponent';
import Cookies from 'js-cookie';

const Todo = () => {
    const navigate = useNavigate();
    const { user } = useStorageUser();
    const [todoList, setTodoList] = useState([]);
    const [descript, setDescript] = useState('');
    const [currentDate, setCurrentDate] = useState(new Date());

    const todoData = async () => {
        if (user) {
            try {
                const response = await axios.post(`${SERVER_ADDRESS}/todo/select`, {
                    email: user?.email,
                });
                const data = response.data;
                setTodoList(data);
            } catch (error) {
                throw error;
            }
        }
    };

    const insertTodo = async () => {
        if (user) {
            if (descript === '') {
                alert('내용을 입력해 주세요.');
                return;
            } else {
                try {
                    const response = axios.post(`${SERVER_ADDRESS}/todo/create`, {
                        email: user?.email,
                        descript: descript,
                    });
                    window.location.reload();
                } catch (error) {
                    throw error;
                }
            }
        }
    };

    const logout = async () => {
        if (user) {
            if (window.confirm('로그아웃 하시겠습니까?')) {
                try {
                    const response = await axios.post(`${SERVER_ADDRESS}/user/logout`, {}, { withCredentials: true });
                    if (response.status === 200) {
                        localStorage.clear();
                        navigate('/');
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
    };

    useEffect(() => {
        if (user) {
            todoData();
        }
    }, [user]);

    const today = new Date();
    const formmatDate = today.toLocaleDateString('ko-KR').slice(0, 10);

    return (
        <div className="todoContainer">
            <div className="todoView">
                <header>
                    <h2>나의 TodoList</h2>
                    <p onClick={() => logout()}>로그아웃</p>
                </header>

                <div>
                    <p>오늘 날짜 : {formmatDate}</p>
                </div>
                <div className="dataView">
                    <div>
                        {todoList && todoList.length > 0
                            ? todoList?.map((item, index) => (
                                  <div key={index}>
                                      <section>
                                          <TodoDataComponent user={user} item={item} />
                                      </section>
                                  </div>
                              ))
                            : null}
                        <div className="bottomView">
                            <form action={insertTodo} method="post" className="bottomForm">
                                <input
                                    type="text"
                                    value={descript}
                                    onChange={(text) => setDescript(text.target.value)}
                                    className="contentInput"
                                    placeholder="내용을 입력해 주세요!"
                                />
                                <button className="addBtn">추가하기</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Todo;
