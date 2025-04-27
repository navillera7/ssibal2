import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AuthPage() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('pages/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('code', code);
        router.push('/vote');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('서버 오류가 발생했습니다.');
    }
  };

  return (
    <main className="main-container">
      <div className="card">
        <h1 className="title">회원 인증</h1>
        <p className="description">
          발급받은 회원 코드를 입력해 주세요.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="회원 코드 입력"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              marginBottom: '1rem',
              borderRadius: '0.5rem',
              border: '1px solid #ccc',
              fontSize: '1rem',
            }}
            required
          />
          {error && (
            <p style={{ color: 'red', fontSize: '0.9rem', marginBottom: '1rem' }}>
              {error}
            </p>
          )}
          <button type="submit">인증하기</button>
        </form>
      </div>
    </main>
  );
}
