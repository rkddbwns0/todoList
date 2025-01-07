import axios from 'axios';
import { SERVER_ADDRESS } from '../components/serverAddress';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStorageUser from './storage/storageUser';
import '../css/todo.css';

const Todo = () => {
    const navigate = useNavigate();
    const { user } = useStorageUser();
    const [todoList, setTodoList] = useState([]);
    const [checkList, setCheckList] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [title, setTitle] = useState('');
    const [descript, setDescript] = useState('');

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

    const successTodo = async () => {
        if (user) {
            try {
                const response = await axios.put(`${SERVER_ADDRESS}/todo/success`, {
                    email: user?.email,
                    no: checkList,
                });
                if (response.status === 200) {
                    window.location.reload();
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const deleteTodo = async (item) => {
        const number = Number(item);
        if (user) {
            try {
                const response = await axios.delete(`${SERVER_ADDRESS}/todo/delete`, {
                    data: {
                        email: user?.email,
                        no: number,
                    },
                });
                if (response.status === 200) {
                    window.location.reload();
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleCheckbox = (event) => {
        const { value, checked } = event.target;
        const number = Number(value);
        if (checked) {
            setCheckList((prev) => [...prev, number]);
        } else {
            setCheckList((prev) => prev.filter((item) => item !== number));
        }
    };

    useEffect(() => {
        if (user) {
            todoData();
        }
    }, [user]);

    return (
        <div className="todoContainer">
            <div className="todoView">
                <header>
                    <h2>나의 TodoList</h2>
                </header>
                <div>
                    <div>
                        <p>오늘 날짜</p>
                    </div>
                    <div>
                        {todoList && todoList.length > 0
                            ? todoList?.map((item, index) => (
                                  <div key={index}>
                                      <section className="todoData">
                                          <ul>
                                              <li className={item.isDone ? 'successDescript' : ''}>{item.descript}</li>
                                              <input
                                                  className={item.isDone ? 'successCheckbox' : 'checkbox'}
                                                  disabled={item.isDone ? true : false}
                                                  type="checkbox"
                                                  value={item.no}
                                                  onChange={handleCheckbox}
                                                  checked={item.isDone || checkList.includes(item.no)}
                                              />
                                          </ul>
                                          <form
                                              action={() => {
                                                  deleteTodo(item.no);
                                              }}
                                              method="post"
                                          >
                                              <button type="submit">삭제하기</button>
                                          </form>
                                      </section>
                                  </div>
                              ))
                            : null}
                        <form action={insertTodo} method="post">
                            <input value={descript} onChange={(text) => setDescript(text.target.value)} />
                            <button>추가하기</button>
                        </form>
                        <form action={successTodo} method="post">
                            <button type="submit">완료하기</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Todo;
