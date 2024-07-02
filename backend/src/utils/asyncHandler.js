//This is an Higher Order Function which takes an function as argument or can return it.
// const asyncHandler = (func) =>{ return async (req, res, next) => {
//   try {
//   await func(req,res,next);
//   } catch (err) {
//    res.status(err.code||500).json({
//     success:false,
//     message:err.message
//    })
//   }
// }
// };

//2- same approach using promise
// const asyncHandler = (func) =>{ return (req, res, next) => {
//   Promise
//   .resolve(func(req,res,next))
//   .catch((err)=>next(err))
// }
// };

// export {asyncHandler}

// Same as 2 but using simple function

function asyncHandler(func){
  return function(req, res, next){
    Promise.resolve(func(req, res, next)).catch((err)=>next(err))
  }
}
export {asyncHandler}
