import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function VotePage() {
  const router = useRouter();
  const [choice, setChoice] = useState('');
  const [agenda, setAgenda] = useState(null);

  useEffect(() => {
    fetch('/api/admin')
      .then(res => res.json())
      .then(data => setAgenda(data.agenda));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = localStorage.getItem('code');

    const res = await fetch('/api/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, choice }),
    });

    const data = await res.json();

    if (res.ok) {
      router.push('/vote/success');
    } else {
      alert(data.message || '투표 중 오류가 발생했습니다.');
      router.push('/');
    }
  };

  if (!agenda) return <main className="main-container">로딩중...</main>;

  return (
    <main className="main-container">
      <div className="card">
        <h1 className="title">{agenda.title}</h1>
        <p className="description">{agenda.description}</p>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
            {['찬성', '반대', '기권'].map(opt => (
              <label key={opt} style={{ display: 'block', marginBottom: '0.5rem' }}>
                <input
                  type="radio"
                  name="choice"
                  value={opt}
                  onChange={(e) => setChoice(e.target.value)}
                  required
                  style={{ marginRight: '0.5rem' }}
                />
                {opt}
              </label>
            ))}
          </div>
          <button type="submit">투표하기</button>
        </form>
      </div>
    </main>
  );
}
