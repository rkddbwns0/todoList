import axios from 'axios';
import { SERVER_ADDRESS } from '../components/serverAddress';
import { MdDelete } from 'react-icons/md';
import { BsCheckLg } from 'react-icons/bs';
import { RiPushpin2Line, RiPushpin2Fill } from 'react-icons/ri';
import '../css/todo.css';
import { useState } from 'react';

const TodoDataComponent = ({ item, user }) => {
    const [message, setMessage] = useState('');
    const successTodo = async (item) => {
        if (user) {
            if (window.confirm('해당 내용을 완료하시겠습니까?')) {
                try {
                    const response = await axios.put(`${SERVER_ADDRESS}/todo/success`, {
                        email: user?.email,
                        no: item,
                    });
                    if (response.status === 200) {
                        window.location.reload();
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
    };

    const deleteTodo = async (item) => {
        const number = Number(item);

        if (user) {
            if (window.confirm('해당 내용을 삭제하시겠습니까?')) {
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
        }
    };

    const pinTodo = async (item, pin) => {
        const number = Number(item);

        if (pin === true) {
            setMessage('고정을 해제하시겠습니까?');
        } else {
            setMessage('고정하시겠습니까?');
        }
        console.log(pin);

        if (user) {
            if (window.confirm(`${message}`)) {
                try {
                    const response = await axios.put(`${SERVER_ADDRESS}/todo/pin`, { email: user?.email, no: number });
                    if (response.status === 200) {
                        window.location.reload();
                    } else {
                        alert('변경 실패');
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
    };
    return (
        <div className="todoData">
            <ul className="inputView">
                <div className="checkboxView">
                    <input
                        className={item.isDone ? 'successCheckbox' : 'checkbox'}
                        disabled={item.isDone ? true : false}
                        type="checkbox"
                        value={item.no}
                        checked={item.isDone ? true : false}
                        readOnly
                    />
                </div>
                <li className={item.isDone ? 'successDescript' : 'descript'}>{item.descript}</li>
            </ul>
            <div className="iconView">
                <button type="button" className="iconBtns" onClick={() => successTodo(item.no)}>
                    <BsCheckLg className="icon" />
                </button>

                <button
                    type="button"
                    className="iconBtns"
                    onClick={() => {
                        pinTodo(item.no, item.pin);
                    }}
                >
                    {item.pin === true ? <RiPushpin2Fill className="icon" /> : <RiPushpin2Line className="icon" />}
                </button>

                <button
                    type="button"
                    className="iconBtns"
                    onClick={() => {
                        deleteTodo(item.no);
                    }}
                >
                    <MdDelete className="icon" />
                </button>
            </div>
        </div>
    );
};

export default TodoDataComponent;
