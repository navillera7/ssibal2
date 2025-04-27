import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default async function sendMail(agenda) {
  const totalVotes = agenda.votes['찬성'] + agenda.votes['반대'] + agenda.votes['기권'];

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'navillera7@hotmail.com', // 결과 받을 이메일
    subject: '[투표 결과] ' + agenda.title,
    text: `
    투표 결과:
    찬성: ${agenda.votes['찬성']}표 ${(agenda.votes['찬성'] / totalVotes) * 100}%
    반대: ${agenda.votes['반대']}표 ${(agenda.votes['반대'] / totalVotes) * 100}%
    기권: ${agenda.votes['기권']}표 ${(agenda.votes['기권'] / totalVotes) * 100}%

    투표가 종료되었습니다.
    `,
  };

  await transporter.sendMail(mailOptions);
}
