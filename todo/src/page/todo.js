import axios from 'axios';
import { SERVER_ADDRESS } from '../components/serverAddress';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStorageUser from './storage/storageUser';
import '../css/todo.css';
import { BsFillPinFill } from 'react-icons/bs';
import TodoDataComponent from '../components/todoDataComponent';

const Todo = () => {
    const navigate = useNavigate();
    const { user } = useStorageUser();
    const [todoList, setTodoList] = useState([]);
    const [descript, setDescript] = useState('');
    const [no, setNo] = useState(null);
    const [changeDes, setCheangDes] = useState(false);

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

    useEffect(() => {
        if (user) {
            todoData();
        }
    }, [user]);

    const formmatToday = () => {
        const today = new Date();
        const formmatDate = today.toLocaleDateString('ko-KR');
        return formmatDate;
    };

    return (
        <div className="todoContainer">
            <div className="todoView">
                <header>
                    <h2>나의 TodoList</h2>
                </header>

                <div>
                    <p>오늘 날짜 : {formmatToday}</p>
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
