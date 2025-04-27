import Link from 'next/link';

export default function Home() {
  return (
    <main className="main-container">
      <div className="card">
        <h1 className="title">안건 투표 시스템</h1>
        <p className="description">
          회원 인증을 통해 투표에 참여하세요.<br />
          투표는 찬성, 반대, 기권 중 하나를 선택하여 진행합니다.
        </p>
        <Link href="/auth">
          <button>투표하러 가기</button>
        </Link>
      </div>
    </main>
  );
}
