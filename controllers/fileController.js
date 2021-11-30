const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const http = require('http')
const util = require('util');

const File = require('./../modals/fileModel');
const User = require('./../modals/userModel');
const APIfeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');


exports.getAllFiles = catchAsync(async (req, res, next) => {
  const features = new APIfeatures(File.find(), req.query)
    .filter()
    .sort()
    .limitFields();
  ///const doc = await features.query.explain();
  const file = await features.query;

  res.status(200).json({
    file
  });
});

exports.getFile = catchAsync(async (req, res, next) => {
  const file = await File.findById(req.params.id);

  if (!file) {
    return next(new AppError('No file found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    file
  });
});


exports.uploadFile = catchAsync(async (req, res, next) => {
  const set = req.files.file;
  const result = await cloudinary.uploader.upload(set.tempFilePath, {
    folder: 'uploads'
  })
  const name  = req.files.file.name;
  
  const file = await File.create({
    //user: req.user.id,
    name,
    file: {
      public_id: result.public_id,
      url: result.secure_url
    }
  })

  res.status(200).json({
    file
  })
})


exports.deleteFile = catchAsync(async (req, res, next) => {
  const file = await File.findById(req.params.id);
  const imageid = file.file.public_id;

  await cloudinary.uploader.destroy(imageid);
  await file.remove();

  if (!file) {
    return next(new AppError('No file found with that ID', 404));
  }

  res.status(204).json({
    file
  });
});


exports.updateFile = catchAsync(async (req, res, next) => {
  const file = await File.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!file) {
    return next(new AppError('No file found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    file,
  });
});