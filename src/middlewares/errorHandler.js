const errorHendler = (err, req, res, next) => {
  const { status = 500, message = 'Something went wrong' } = err;

  res.status(status).json({
    message,
    // message: 'Something went wrong',
    // error: err.message,
  });
};

export default errorHendler;
