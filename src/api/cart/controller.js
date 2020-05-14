
const {validParam, queueTask, sendResponse,sendPostRequest, sendrpPostRequest, addCommas, sendErrorResponse, sendSuccessResponse, capitalize, trimCollection} = require('../../helpers/utility');
const mongoose = require('mongoose');
const Cart = mongoose.model('Cart');

const ObjectId = require('mongodb').ObjectId;

exports.cart = (req, res) => {
  
        Cart.findOne({user : req.payload.data.email}, function (err, result) {
            if(err)
            {
                console.log(err);
                return sendErrorResponse(res, {}, 'Something went wrong, Please try again');
            }

            if(result != null){
                return sendSuccessResponse(res, result, 'Here\'s what I have, take what you need');

            }else{
                return sendErrorResponse(res, {}, 'No products found');

            } 
        });
}

exports.add = (req, res) => {
  
    let required = [
        {name: 'name', type: 'string'},
        {name: 'price', type: 'string'},
    ];

    req.body = trimCollection(req.body);
    const body = req.body;
    
    let hasRequired = validParam(req.body, required);
    if (hasRequired.success) {

        let nCart       = new Cart();
        nCart.name      = body.name;
        nCart.price     = body.price;
        nCart.user      = req.payload.data.email;
      
        nCart.save((err) => {
            console.log(err);
            if (err) {
                return sendErrorResponse(res, err, 'Something went wrong');
            }
            return sendSuccessResponse(res, '', 'Added');
         });

}else{
    return sendErrorResponse(res, {required: hasRequired.message}, 'Missing required fields');
}


}

exports.remove = (req, res) => {
  
    let required = [
        {name: 'id', type: 'string'},
       
    ];

    req.body = trimCollection(req.body);
    const body = req.body;
    
    let hasRequired = validParam(req.body, required);
    if (hasRequired.success) {
        
       
      id = new ObjectId(body.id);
       

      Cart.deleteOne( {user: req.payload.data.email, _id : id}, 
      (err, deleted) => {

        if (err) {
            return sendErrorResponse(res, err, 'Something went wrong');
        }

            console.log( deleted, "deleted");
            return sendSuccessResponse(res, 'Item Deleted');
          

       });

}else{
    return sendErrorResponse(res, {required: hasRequired.message}, 'Missing required fields');
}


}
