import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Remove deprecated options - they're now defaults in MongoDB driver 4.x+
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`✅ Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

// Made with Bob
