const calculateDiscount=(current,previous)=>{
    return 100-((current/previous)*100);
}

const calculateDeliveryCharge=(item)=>{
    return (item.filter(cart=>cart.deliveryCharge).length)*20;
}
const calculateNotDeliveryCharge=(item)=>{
    return (item.filter(cart=>!cart.deliveryCharge).length)*20;
}

const calculateTotalSummary=(cartItem)=>{
    const totalOriginalPrice=cartItem.reduce((acc,cur)=>acc+Number(cur.original_price)*Number(cur.qty),0);
    const totalDiscount=cartItem.map(item=>(item.original_price)*Number(item.qty)-item.price*(item.qty)).reduce((acc,cur)=>acc+cur,0);
    const totalDeliveryCharge=calculateDeliveryCharge(cartItem)
    const totalAmount=totalOriginalPrice-totalDiscount+totalDeliveryCharge;
    const totalSavedAmount=totalDiscount+calculateNotDeliveryCharge(cartItem);
    return {totalOriginalPrice,totalDiscount,totalDeliveryCharge,totalAmount,totalSavedAmount};
}

export {calculateDiscount,calculateTotalSummary}