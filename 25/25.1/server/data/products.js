const products = [
    {
        uid: 1,
        title: "Lorem ipsum dolor sit amet",
        description: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 1000,
        params: {
            width: 16,
            length: 23,
            height: 102,
            weight: 1.5,
        },
        attributes: {
            color: "red",
            available: ["red", "green", "blue"],
        },
        manufacturer: "Lectus proin nibh nisl",
    },
    {
        uid: 2,
        title: "Tempus iaculis urna id volutpat",
        description: "Lacus laoreet non curabitur. Turpis egestas integer eget aliquet nibh praesent tristique magna.",
        price: 1300,
        params: {
            width: 80,
            length: 160,
            height: 312,
            weight: 2,
        },
        attributes: {
            color: "green",
            available: ["red", "green", "blue"],
        },
        manufacturer: "Porttitor eget dolor morbi non arcu",
    },
    {
        uid: 3,
        title: "Nisi lacus sed viverra tellus in hac habitasse",
        description: "Aliquam faucibus purus in massa. A diam maecenas sed enim ut sem viverra.",
        price: 600,
        params: {
            width: 400,
            length: 500,
            height: 600,
            weight: 3.1,
        },
        attributes: {
            color: "blue",
            available: ["red", "green", "blue"],
        },
        manufacturer: "Eros in cursus turpis",
    },
];

module.exports = {products};