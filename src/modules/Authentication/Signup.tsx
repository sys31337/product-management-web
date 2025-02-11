import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignup } from '@/api/useUser';
import Loading from '@/shared/components/Loading';

const Signup = () => {
  const [payload, setPayload] = useState({ fullname: '', email: '', password: '', confirm: '' })
  const navigate = useNavigate();

  const { mutateAsync: signup, isPending } = useSignup();

  const updateValues = async (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement
    setPayload((prev) => ({ ...prev, [target.name]: target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await signup(payload);
    navigate('/login');
  };

  return isPending ? <Loading /> : (
    <main className="container h-[100vh] py-10 max-w-5xl mx-auto flex align-middle">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">Enter your email below to create your account</p>
        </div>
        <div className="grid gap-6">
          <form onSubmit={handleSubmit} autoComplete='none'>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <input type="text" className="form-control" onChange={updateValues} name="fullname" placeholder="John Doe" autoComplete="false" />
                <input type="email" className="form-control" onChange={updateValues} name="email" placeholder="name@example.com" autoComplete="false" />
                <input type="password" className="form-control" onChange={updateValues} name="password" placeholder="Password" autoComplete="new-password" />
                <input type="password" className="form-control" onChange={updateValues} name="confirm" placeholder="Confirm" autoComplete="new-password" />
              </div>
              <button className="btn-primary" type="submit">Create</button>
            </div>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t"></span></div>
            <div className="relative flex justify-center text-xs uppercase"><span
              className="bg-background px-2 text-muted-foreground">Or</span></div>
          </div>
          <Link className="btn-secondary" to="/login">Login to your account</Link>
        </div>
      </div>
    </main>
  );
};

export default Signup;
