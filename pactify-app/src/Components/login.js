function LoginPage(){
    return (
        <section1>
            <h1 style={welcomeToStyle}>Welcome to</h1>
            <h1 style={pactifyStyle}>Pactify</h1>
            <div style={inputEmailStyle}>
                <input type="text" id="email-id" autoFocus placeholder="Email"/>
            </div>
            <div style={inputPasswordStyle}>
                <input type="password" id="password-id" autoFocus placeholder="Password"/>
            </div>
            <div style={inputButton} >
                <button type="submit">login</button>
            </div>
            <p>
                <a style={options} href="signUp">Don't have an account? Sign up!</a>
                {/*NEED TO CREATE A SIGN UP PAGE AND ADD LINK for href--*/}
            </p>
            <p>
                <a style={options} href="forgotPassword">Forgot your password?</a>
                {/* NEED TO CREATE A FORGOT PASSWORD PAGE AND ADD LINK for href*/}
            </p>
        </section1>
    )
}

export default LoginPage;

const welcomeToStyle = {
    color: '#eb5233',
    position: 'absolute',
    top: '15%',
    left: '20%',
    fontFamily:'Roboto, sans-serif',
    fontWeight: 100,
    fontSize: '50px',
}

const pactifyStyle = {
    color: '#eb5233',
    position: 'absolute',
    top: '14%',
    left: '20%',
    fontFamily:'Gill Sans',
    fontSize: '120px',
}

const inputEmailStyle = {
    transform: 'scale(1.5)',

    position: 'absolute',
    top: '25%',
    right: '25%',
}

const inputPasswordStyle = {
    transform: 'scale(1.5)',

    position: 'absolute',
    top: '30%',
    right: '25%',
}

const inputButton = {
    position: 'absolute',
    top: '30%',
    right: '23%',
}

const options = {
    color: 'white',
    position: 'relative',
    left: '63%',
    top: '280px',
    fontSize: '18px',
}