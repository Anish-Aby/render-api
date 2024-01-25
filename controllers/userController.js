exports.getUser = (req, res) => {
  const parameters = req.params;
  const idParam = parameters.userId * 1;

  res.status(200).json({
    status: "success",
    data: {
      user: idParam,
    },
  });
};
