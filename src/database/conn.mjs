import mongoose from 'mongoose';

export default mongoose.connect(
  'mongodb://root:root@mongo:27017/example_db',
);
