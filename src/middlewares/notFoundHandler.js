const notFoundHendler = (req, res) => {
  res.status(404).json({
    message: 'Not found',
  });
};

export default notFoundHendler;
