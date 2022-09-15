import fs from 'fs';
import path from 'path';
import conn from '../database/conn.mjs';
import User from '../database/user_schema.mjs';
import {USER_REPORT_HEADER} from '../shared/constants.mjs';
import {objectToRow} from '../shared/utils/csv_utils.mjs';

conn.then(async () => {
  console.time('Done');
  const output = path.resolve('src/reports/stream.csv');

  const stream = fs.createWriteStream(output);
  stream.write(USER_REPORT_HEADER);

  const cursor = User.find({}, {__v: 0, password: 0}).cursor({batchSize: 100});

  cursor.on('data', doc => {
    const row = objectToRow(doc.toObject()).join(';');
    stream.write(`\r\n${row.trim()}`);
  });

  cursor.on('end', () => {
    stream.end();
    console.timeEnd('Done');
    process.exit(0);
  });
});
