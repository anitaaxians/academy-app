export const API_BASE = 'https://localhost:7056/api';

export const register = async (email: string, password: string) => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res;
};

export const login = async (email: string, password: string) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error('Login failed');
  return await res.json();
};

export const fetchCourses = async (token: string) => {
  const res = await fetch(`${API_BASE}/course`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.ok ? await res.json() : [];
};

export const enrollInCourse = async (token: string, courseId: string) => {
  const res = await fetch(`${API_BASE}/course/enroll/${courseId}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` }
  });
  return res;
};
