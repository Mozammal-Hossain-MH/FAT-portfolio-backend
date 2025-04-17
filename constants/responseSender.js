const responseSender = (res, data) => {
  res.status(data?.statusCode).json({
    success: data?.success,
    message: data?.message || null,
    meta: data?.meta,
    data: data?.data || null,
  });
};

export default responseSender;
