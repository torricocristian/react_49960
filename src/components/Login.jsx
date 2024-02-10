import { useState, useRef } from 'react'

const Login = () => {
    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const errRef = useRef();
    const [success, setSuccess] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

       
    };
    

    return (
        <div className="Login-test">
            <h1>Testeando Login por medio de un endpoint</h1>

            {
              success && <div>Login Exitoso</div> 
            }

            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
            >
              {errMsg}
            </p>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="username"
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                    placeholder='Ingrese su user'
                />
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    placeholder='Ingrese su contraseña'
                />

                <button>
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login