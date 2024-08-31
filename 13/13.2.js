const cooking = {
    name: "cooking",
    parent:  null,
    title: "Кулинария",
    children: [{
        name: "meat-poultry",
        parent:  "cooking",
        title: "Блюда из мяся и птицы",
        children: [{
            name: "lamb",
            parent: "meat-poultry",
            title: "Блюдо из баранины",
            children: [/**/],
        }],
    }, {
        name: "vegetables", 
        parent:  "cooking",
        title: "Блюда из овощей",
        children: [{
            name: "potato",
            parent:  "vegetables",
            title: "Блюдо из картофеля",
            children: [/**/],  
        }, {
            name: "carrot",
            parent:  "vegetables",
            title: "Блюдо из моркови",
            children: [/**/],
        }],
    }, {
        name: "fish-seafood",
        parent:  "cooking",
        title: "Блюда из рыбы и морепродуктов",
        children: [{
            name:  "trout",
            parent:  "fish-seafood",
            title: "Блюдо из форели",
            children: [/**/],
        }],
    }]
};