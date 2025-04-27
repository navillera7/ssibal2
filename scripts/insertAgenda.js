const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Agenda = require('./models/Agenda');

dotenv.config({ path: '.env.local' });

async function insertAgenda() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const newAgenda = {
      title: '프로젝트 Alpha 승인 여부',
      description: '프로젝트 Alpha를 정식 승인할지에 대한 찬반 투표입니다.',
      // status: '진행중' 생략하면 기본값
      // votes: {} 생략하면 기본값
    };

    const result = await Agenda.create(newAgenda);
    console.log('✅ 안건 등록 완료!', result);
  } catch (error) {
    console.error('❌ 에러 발생:', error);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

insertAgenda();
