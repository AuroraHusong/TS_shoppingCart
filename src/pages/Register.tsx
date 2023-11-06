import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState, useEffect, SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap'

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{6,22}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export function Register(){
    const history = useNavigate();
    const userRef = useRef<HTMLInputElement | null>(null);
    const errRef = useRef<HTMLDivElement | null>(null);

//username state variables
    const [user, setUser] = useState('')
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)
//password state variables
    const [pwd, setPwd] = useState('')
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)
//matching password state variables
    const [matchPwd, setMatchPwd] = useState('')
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)
//issues with the signup?
    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        if (userRef.current) {
          userRef.current.focus();
        }
      }, []);
      
//validate the username everytime it changes
    useEffect(() => {
        setValidName(USER_REGEX.test(user))
    }, [user])

//validate the password everytime it changes
    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd))
        setValidMatch(matchPwd === pwd)
    }, [pwd, matchPwd])

//Clear error message whenever user, pwd, or matching pwd changes
    useEffect(() => {
        setErrMsg('')
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        //if button enabled with js hack
        const v1 = USER_REGEX.test(user)
        const v2 = PWD_REGEX.test(pwd)
        if(!v1 || !v2) {
            setErrMsg("Invalid Entry")
            return;
        }
    
        history('/Store');
    }
    
    return (
      
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <Container className="d-flex justify-content-center align-items-center p-3" style={{width:'100%', backgroundColor:'#E3F5F8'}}>
            <Card className="p-4 "style={{width:'50%', height:'60%'}}>
                <Card.Body>
            <h1 className="text-center mb-4 display-4">Register</h1>
            <form onSubmit={handleSubmit}>
            
                <label htmlFor="username" className="m-2">
                    Username: 
                </label>
                <span className={validName ? "valid m-2 text-success" : "visually-hidden"}>
                     <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validName || !user ? "visually-hidden" : "invalid m-2 text-danger"}>
                     <FontAwesomeIcon icon={faTimes} />
                </span>
                <input className="form-control mb-3"
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e)=> setUser(e.target.value)}
                    required
                    aria-invalid={validName ? "false" : true}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
               
                <p id="uidnote" className={userFocus && user && !validName ? "instructions form-text text-muted" : "visually-hidden d-none"}>
                        <FontAwesomeIcon icon={faInfoCircle} />{" "}
                        7 to 24 characters.<br />
                        Must begin with a letter.<br />
                        Letters, numbers, underscores, and hyphens allowed.
                </p>
                <div className="row">
                <div className="col mb-4">
                <label htmlFor="password" className="m-2">
                    Password:
                
                </label>
                <span className={validPwd ? "valid m-2" : "visually-hidden text-success"}>
                    <FontAwesomeIcon icon={faCheck} /> 
                </span>
                <span className={validPwd || !pwd ? "visually-hidden" : "invalid m-2 text-danger"}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
                <input
                    className="form-control mb-3"
                    type="password"
                    id="password"
                    onChange={(e)=> setPwd(e.target.value)}
                    required
                    aria-invalid={validPwd ? "false" : true}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />
                
                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions form-text text-muted" : "visually-hidden d-none"}>
                        <FontAwesomeIcon icon={faInfoCircle} /> {" "}
                        8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number, and a special character.<br />
                        Letters, numbers, underscores, and hyphens allowed.<br />
                        Allowed special characters: 
                        <span aria-label="exclamation mark">!</span>
                        <span aria-label="at symbol">@</span>
                        <span aria-label="hashtag">#</span>
                        <span aria-label="percent">%</span>
                </p>
            </div>
            </div>

                <label htmlFor="confirm_pwd" className="m-2">
                    Confirm Password:
                </label>
                <span className={validMatch && matchPwd ? "valid m-2" : "visually-hidden text-success"}>
                    <FontAwesomeIcon icon={faCheck} /> 
                </span>
                <span className={validMatch || !matchPwd ? "visually-hidden" : "invalid m-2 text-danger"}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
                <input
                    className="form-control mb-3"
                    type="password"
                    id="confirm_pwd"
                    onChange={(e)=> setMatchPwd(e.target.value)}
                    required
                    aria-invalid={validMatch ? "false" : true}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />
                
                <p id="confirmNote" className={matchFocus && !validMatch ? "instructions form-text text-muted" : "visually-hidden d-none"}>
                        <FontAwesomeIcon icon={faInfoCircle} /> {" "}
                        Needs to match the above password
                </p>

                    <button className="btn btn-primary btn-lg btn-block mt-3 mb-3"disabled={!validName || !validPwd || !validMatch ? true : false}>
                        Sign Up
                    </button>
            </form>
            <p>
                Already registered?<br />
                <span className="line">
                    <a href="#">Sign In</a>
                </span>
            </p>
            </Card.Body>
            </Card>
            </Container>
        </section>
    )
}