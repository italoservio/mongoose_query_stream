import fs from 'fs';
import path from 'path';
import conn from '../database/conn.mjs';
import User from '../database/user_schema.mjs';
import {USER_REPORT_HEADER} from '../shared/constants.mjs';
import {objectToRow} from '../shared/utils/csv_utils.mjs';

conn.then(async () => {
  console.time('Done');
  const output = path.resolve('src/reports/paginated.csv');

  fs.writeFileSync(output, USER_REPORT_HEADER);

  let keep = true, page = 1, quantity = 100;
  do {
    const rows = [];
    const users = await paginatedUsers(page, quantity);

    if (users.length) {
      for (const user of users) {
        rows.push(`\r\n${objectToRow(user.toObject()).join(';')}`);
      }
      fs.appendFileSync(output, rows.join(''));
    } else {
      keep = false;
    }

    page += 1;
  } while (keep);

  console.timeEnd('Done');
  process.exit(0);
});

async function paginatedUsers(page, quantity) {
  return User.find({}, {__v: 0, password: 0})
    .skip((page - 1) * quantity)
    .limit(quantity)
    .exec();
}
