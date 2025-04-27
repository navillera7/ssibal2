import connectDB from '@/lib/db';
import Agenda from '@/models/Agenda';
import sendMail from '@/lib/mailer';

export default async function handler(req, res) {
  await connectDB();

  const agenda = await Agenda.findOne();
  if (agenda.status === '종료') return res.status(400).json({ success: false });

  agenda.status = '종료';
  await agenda.save();

  await sendMail(agenda);

  res.status(200).json({ success: true });
}
