import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/shared/context/AuthContext';
import { useLogin } from '@/api/useUser';
import Loading from '@/shared/components/Loading';
import authService from '@/shared/services/auth';

const Login = () => {
  const [payload, setPayload] = useState({ email: '', password: '' })
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  const { mutateAsync: login, isPending } = useLogin();

  const updateValues = async (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement
    setPayload((prev) => ({ ...prev, [target.name]: target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { data } = await login(payload)

    const userData = {
      userId: data._id,
      fullname: data.fullname,
      email: data.email,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      role: data.role,
    };
    dispatch({type: 'USER', payload: userData})
    authService.saveUserInfo(userData);
    navigate('/');
    navigate(0);
  };

  return isPending ? <Loading /> : (
    <main className="container h-[100vh] py-10 max-w-5xl mx-auto flex align-middle">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Login to your account</h1>
          <p className="text-sm text-muted-foreground">Enter your email below to create your account</p>
        </div>
        <div className="grid gap-6">
          <form onSubmit={handleSubmit} autoComplete='none'>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <input type="email" className="form-control" name="email" onChange={updateValues} placeholder="name@example.com" autoComplete="false" />
                <input type="password" className="form-control" name="password" onChange={updateValues} placeholder="Password" autoComplete="new-password" />
              </div>
              <button
                className="btn-primary">
                Sign In with Email
              </button>
            </div>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t"></span></div>
            <div className="relative flex justify-center text-xs uppercase"><span
              className="bg-background px-2 text-muted-foreground">Or</span></div>
          </div>
          <Link className="btn-secondary" to="/signup">Create an account</Link>
        </div>
      </div>
    </main>
  );
};

export default Login;
