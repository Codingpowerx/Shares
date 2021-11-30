const mongoose = require('mongoose');
const slugify = require('slugify');

const fileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A file must have a name']
    },
    file: {
      public_id: {
          type: String,
          required: true
      },
      url: {
          type: String,
          required: true
      }
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      //required: [true, 'File must belong to a user!'],
    },
    fileUploadeddAt: {
      type: Date,
      default: new Date(),
      select: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

fileSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'fileOwner',
    select: '-__v -passwordChangedAt -email -role -photo'
  });

  next();
});

fileSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
