const getAllFacts = tryCatch(async (req, res) => {
  const result = await categoryModel.find();

  responseSender(res, {
    statusCode: status.OK,
    success: true,
    message: "All Categories",
    data: result,
  });
});
