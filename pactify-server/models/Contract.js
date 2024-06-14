import mongoose from 'mongoose';

const contractSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'completed', 'signed'],
    default: 'draft'
  },
  signatures: [
    {
      signerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      signedAt: {
        type: Date
      },
      signatureData: {
        type: String
      }
    }
  ]
}, {
  timestamps: true
});

const Contract = mongoose.model('Contract', contractSchema);

export default Contract;