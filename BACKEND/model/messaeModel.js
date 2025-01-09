const mongoose = require('mongoose');
const User = require('./userModel');

const messageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: [true, 'A message is required'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A message must be created by a user'],
    },
    createdFor: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A message must be created for a user'],
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    messageType: {
      type: String,
      enum: ['text', 'image', 'file'],
      default: 'text',
    },
    attachments: {
      type: [String],
    },
    priority: {
      type: String,
      enum: ['normal', 'important', 'urgent'],
      default: 'normal',
    },
    replyTo: {
      type: mongoose.Schema.ObjectId,
      ref: 'Message',
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
