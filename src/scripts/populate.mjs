import bcrypt from 'bcrypt';
import casual from 'casual';
import conn from '../database/conn.mjs';
import User from '../database/user_schema.mjs';

conn.then(async () => {
  for (let i = 0; i < 50000; i++) {
    const user = new User({
      first_name: casual.first_name,
      last_name: casual.last_name,
      email: casual.email,
      phone: casual.phone,
      password: await bcrypt.hash(casual.password, await bcrypt.genSalt(8)),
      address: {
        zip: casual.zip(8),
        city: casual.city,
        state: casual.state,
        country: casual.country,
      },
    });
    await user.save();
  }
  process.exit(0);
});
