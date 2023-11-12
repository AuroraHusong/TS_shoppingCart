import {SyntheticEvent, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';

interface LoginProps {
    setUser: React.Dispatch<React.SetStateAction<string>>;
  }
  
  const Login: React.FC<LoginProps> = ({ setUser }) => {
    const history = useNavigate();
    const userRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus();
        }
    }, []);

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setUser(userRef.current!.value);
        history('/Store')
    };

    return (
        <section>
            <Container className="d-flex justify-content-center align-items-center p-3" style={{ width: '100%', backgroundColor: '#E3F5F8' }}>
                <Card className="p-4" style={{ width: '100%', maxWidth: '500px' }}>
                    <Card.Body>
                        <h1 className="text-center mb-4 display-4">Login</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="username" className="m-2">
                                    Username: 
                                </label>
                                <input className="form-control mb-3"
                                    type="text"
                                    id="username"
                                    ref={userRef}
                                    autoComplete="off"

                                    required
                                />
                                <label htmlFor="password" className="m-2">
                                    Password: 
                                </label>
                                <input className="form-control mb-3"
                                    type="password"
                                    id="password"
                                    autoComplete="off"
                                    
                                    required
                                />
                                <button type="submit" className="btn btn-primary mt-3">
                                    Login
                                </button>
                            </div>
                        </form>
                    </Card.Body>
                </Card>
            </Container>
        </section>
    );
};

export default Login;