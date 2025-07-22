import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full p-2 border rounded" />
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
  );
}