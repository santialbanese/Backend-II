import { useState } from "react";

function App() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [loginMessage, setLoginMessage] = useState(''); 

    const handleLogin = () => {
        fetch("http://localhost:8080/api/sessions/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status) {
                    localStorage.setItem('token', data.payload);
                    console.log('Token guardado en localStorage');
                    setIsLoggedIn(true); 
                    setLoginMessage('¡Iniciaste sesión correctamente!'); // Mensaje personalizado
                } else {
                    localStorage.removeItem('token');
                    console.error(data.message);
                    setLoginMessage('Error: ' + data.message); 
                }
            })
            .catch((error) => {
                console.error(error.message);
                setLoginMessage('Error en la conexión: ' + error.message); 
            });
    };

    return (
        <div className="form-container">
            <h1>App React</h1>

            {isLoggedIn ? ( 
                <h3 className="success-message">{loginMessage}</h3>  // Muestra el mensaje "Iniciaste sesión correctamente"
            ) : (
                <>
                    <h3>Inicio de sesión</h3>

                    {loginMessage && <p className="error-message">{loginMessage}</p>} {/* Muestra los mensajes de error o éxito */}

                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button onClick={handleLogin}>Aceptar</button>
                </>
            )}
        </div>
    );
}

export default App;
