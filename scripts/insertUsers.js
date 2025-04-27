const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./User'); // ./models/User 로 변경!!

dotenv.config({ path: '.env.local' });

async function insertUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const users = [
      { code: 'ABC123' },
      { code: 'DEF456' },
      { code: 'GHI789' },
      { code: 'JKL012' },
      { code: 'MNO345' },
    ];

    await User.insertMany(users);
    console.log('✅ 회원 등록 완료!');
  } catch (error) {
    console.error('❌ 에러 발생:', error);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

insertUsers();
