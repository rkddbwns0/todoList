import axios from 'axios';
import { SERVER_ADDRESS } from '../components/serverAddress';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStorageUser from './storage/storageUser';

const Todo = () => {
    const navigate = useNavigate();
    const { user } = useStorageUser();
    const [todoList, setTodoList] = useState([]);
    const [checkList, setCheckList] = useState([]);
    const [title, setTitle] = useState('');
    const [descript, setDescript] = useState('');

    const todoData = async () => {
        if (user) {
            try {
                console.log(user?.email);
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
    };

    const successTodo = async () => {
        if (user) {
            try {
                const response = await axios.post(`${SERVER_ADDRESS}/todo/success`, {
                    email: user?.email,
                    no: checkList.no,
                });
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleCheckbox = (no) => {
        setTodoList((prevList) => {
            return prevList.map((item) => {
                if (item.no === no) {
                    setCheckList(item.no);
                }
                return item;
            });
        });
    };

    useEffect(() => {
        if (user) {
            todoData();
        }
    }, [user]);

    if (!user) {
        return <div>로딩</div>;
    }

    return (
        <div>
            <div>
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
                                      <section>
                                          <ul>
                                              <li className={item.isDone ? 'successDescript' : ''}>{item.descript}</li>
                                              <input
                                                  type="checkbox"
                                                  value={checkList}
                                                  onChange={() => handleCheckbox(item.no)}
                                              />
                                          </ul>
                                      </section>
                                  </div>
                              ))
                            : null}
                        <form action={insertTodo} method="post">
                            <input value={descript} onChange={(text) => setDescript(text.target.value)} />
                            <button>추가하기</button>
                        </form>
                        {todoList && todoList.length > 0 ? (
                            <form>
                                <button>완료하기</button>
                            </form>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Todo;
