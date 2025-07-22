import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await register(email, password);
    if (res.ok) {
      navigate('/login');
    } else {
      alert('Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full p-2 border rounded" />
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">Register</button>
      </form>
    </div>
  );
}