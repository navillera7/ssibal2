import Link from 'next/link';

export default function SuccessPage() {
  return (
    <main className="main-container">
      <div className="card">
        <h1 className="title">투표 완료!</h1>
        <p className="description">
          소중한 의견을 제출해 주셔서 감사합니다.
        </p>
        <Link href="/">
          <button>메인으로 돌아가기</button>
        </Link>
      </div>
    </main>
  );
}
