import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');
  const [agenda, setAgenda] = useState(null);

  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;


  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      setError('비밀번호가 올바르지 않습니다.');
    }
  };

  const fetchAgenda = async () => {
    const res = await fetch('/api/admin');
    const data = await res.json();
    setAgenda(data.agenda);
  };

  const handleEndVote = async () => {
    await fetch('/api/endvote', { method: 'POST' });
    await fetchAgenda();
  };

  useEffect(() => {
    if (authenticated) {
      fetchAgenda();
      const interval = setInterval(fetchAgenda, 5000);
      return () => clearInterval(interval);
    }
  }, [authenticated]);

  if (!authenticated) {
    return (
      <main className="main-container">
        <div className="card">
          <h1 className="title">관리자 로그인</h1>
          <form onSubmit={handlePasswordSubmit}>
            <input
              type="password"
              placeholder="비밀번호 입력"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
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
            <button type="submit">로그인</button>
          </form>
        </div>
      </main>
    );
  }

  if (!agenda) return <main className="main-container">로딩중...</main>;

  const totalVotes = agenda.votes['찬성'] + agenda.votes['반대'] + agenda.votes['기권'];

  return (
    <main className="main-container">
      <div className="card" style={{ textAlign: 'center' }}>
        <h1 className="title">투표 현황 (관리자)</h1>
        <p className="description">{agenda.title}</p>

        <div style={{ margin: '1rem 0', fontSize: '1rem' }}>
          <p>찬성: {agenda.votes['찬성']} 표</p>
          <p>반대: {agenda.votes['반대']} 표</p>
          <p>기권: {agenda.votes['기권']} 표</p>
          <p style={{ marginTop: '1rem' }}>총 투표 수: {totalVotes} 표</p>
        </div>

        {agenda.status === '진행중' ? (
          <button onClick={handleEndVote}>투표 종료하기</button>
        ) : (
          <p style={{ color: 'green', fontWeight: 'bold', marginTop: '1rem' }}>✅ 투표가 종료되었습니다</p>
        )}
      </div>
    </main>
  );
}
