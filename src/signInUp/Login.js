import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useToken from '../Components/useToken';
import { AuthContext } from '../UserContext/UserContext';

const Login = () => {
    const { loginEmailPassword, loginPopUp } = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm()
    const [error, setError] = useState('');
    const navigate = useNavigate()
    const location = useLocation()
    const [loginEmail, setLoginEmail] = useState('')

    const from = location.state?.from?.pathname || "/";
    const token = useToken(loginEmail)
    if (token) {
        navigate(from, { replace: true });
    }

    // const from = location.state?.from?.pathname || '/'
    const formHandler = data => {
        // console.log(data)
        const { email, password } = data
        setError('')
        loginEmailPassword(email, password)
            .then(result => {
                const user = result.user
                // console.log(user)
                setLoginEmail(email)

            })
            .catch(error => {
                const message = error.message
                setError(message)
            })
    }
    const googleHandler = () => {
        setError('')
        loginPopUp()
            .then(result => {
                const user = result.user
                // console.log(user)
                savedDataPopUp(user.displayName, user.email)
                // navigate(from, { replace: true });
            })
            .catch(error => {
                const message = error.message
                setError(message)
            })
    }
    const savedDataPopUp = (name, email) => {
        const userInfo = { name, email }
        fetch('https://doctors-portal-server-sand.vercel.app/users/popup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userInfo)
        })
            .then(res => res.json())
            .then(data => {
                setLoginEmail(email)
            })
    }
    return (
        <div className='w-2/5 mx-auto mb-20 mt-14 card shadow-xl px-14 pt-8 pb-20'>
            <p className='text-center text-3xl'>Login</p>
            <div>
                <form onSubmit={handleSubmit(formHandler)}>
                    {/* <input {...register("firstName")} placeholder="First name" /> */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            {...register("email",
                                { required: "Email is required" })}
                            type="email" className="input input-bordered w-full"
                        />
                        {errors.email && <p className='text-error mt-2' role="alert">{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            {...register("password",
                                {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password should be at least 6 characters" }
                                })}
                            type="password" className="input input-bordered w-full" />
                        <label className="label">
                            <span className="label-text-alt">Forgot Password?</span>
                        </label>
                        {errors.password && <p className='text-error mb-2' role="alert">{errors.password?.message}</p>}
                    </div>
                    <div>
                        {error && <p className='text-error my-2'>{error}</p>}
                    </div>
                    <input type="submit" className='btn w-full' />
                </form>
                <div className='text-center mt-1'>
                    <p>New to Doctor's Portal? <Link to='/register' className='text-primary'>Create new account</Link></p>
                </div>
                <div className="divider">OR</div>
                <div>
                    <button onClick={googleHandler} className="btn btn-outline w-full">CONTINUE WITH GOOGLE</button>
                </div>
            </div>
        </div>
    );
};

export default Login;