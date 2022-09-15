export function objectToRow(user) {
  let row = [];
  for (const k of Object.keys(user)) {
    if (user[k] && typeof user[k] === 'object' && Object.keys(user[k]).length) {
      const subRow = objectToRow(user[k]);
      row = [...row, ...subRow];
    } else {
      if (k.endsWith('_at') && user[k])
        row.push(new Date(user[k]).toLocaleString());
      else row.push(user[k]);
    }
  }
  return row;
}
