import React from "react";
import "./index.css";

export const LoginForm = ({onSubmit}: {onSubmit?: (value: {name: string, email: string}) => void}) => {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");

    return <form className="login_form-container" onSubmit={() => {
        onSubmit && onSubmit({
            name,
            email
        })
    }}>
        <div className="login_form-header">
            <p>Login</p>
        </div>

        <div>
            <label className="login_form-label" htmlFor="name">Name</label>
            <input className="login_form-input"  type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>


        <div>
            <label className="login_form-label" htmlFor="name">Email</label>
            <input className="login_form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="login_form-footer">
            <button className="login_form-button" type="submit">Go</button>
        </div>
    </form>
}
