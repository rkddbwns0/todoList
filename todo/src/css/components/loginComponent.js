const LoginComponent = ({ title, idPlaceholder, pwPlaceholder, button }) => {
    return (
        <div className="container">
            <div>
                <div className="loginContainer">
                    <div className="titleView">
                        <h2 className="loginTitle">{title}</h2>
                    </div>
                    <form className="loginView">
                        <input className="loginInput" placeholder={idPlaceholder} />
                        <input className="loginInput" placeholder={pwPlaceholder} />

                        <div className="loginBtnView">
                            <button className="loginBtn">{button}</button>
                        </div>
                        <div>
                            <a href="/signup">회원가입</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
