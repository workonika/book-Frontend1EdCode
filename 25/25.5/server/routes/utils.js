const createProductObject = (uid, productInfo, availableColors) => {
    
    const {title, description, price, width, length, height, weight, color, manufacturer} = productInfo;

    return {
        uid,
        title, 
        description,
        price,
        params: {
            width, length, height, weight,
        },
        attributes: {
            color,
            available: availableColors,
        },
        manufacturer,
    };
};

const updateLastId = (data) => {
    const length = data.length;
    const hasOnlyOne = length === 1;

    if (hasOnlyOne) {
        return null;
    }

    const {uid} = data[length - 2];

    return uid;
};

module.exports = {createProductObject, updateLastId};
