export const ResponseTrait = {
    successResponse: (res, data, code = 200) => {
        return res.status(code).json({
          success: true,
          data
        });
      },
}