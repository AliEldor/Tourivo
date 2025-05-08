export const ResponseTrait = {
    successResponse: (res, data, code = 200) => {
        return res.status(code).json({
          success: true,
          data
        });
      },

      errorResponse: (res, error, code = 500) => {
        return res.status(code).json({
          success: false,
          error
        });
      },

      failedValidation: (res, errors) => {
        return res.status(422).json({
          success: false,
          result: errors
        });
      },
}