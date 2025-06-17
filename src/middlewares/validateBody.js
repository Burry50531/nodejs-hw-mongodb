

export const validateBody = (schema) => {
    return async (req, res, next) => {
      try {
        await schema.validateAsync(req.body, {   
          abortEarly: false,  
        });
        next(); 
      } catch (err) {
        
        return res.status(400).json({
          status: 400,
          message: 'Validation error',
          details: err.details.map(e => ({
            field: e.context.label || e.context.key,
            message: e.message,
          })),
        });
      }
    };
  };