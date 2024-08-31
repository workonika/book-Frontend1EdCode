const tokens = ["doloribus", "sed", "culpa", "deserunt", "consectetur", "praesentium", "naccusamus", "dicta", "voluptatem", 
"cumque", "molestiae", "officia", "autem", "atque", "ratione", "repellat", "vel", "earum", "laudantium", "mollitia", ];

const emailDomains = ['somemail', 'generativemail', 'abercrombi', 'unionmail', 'javamail', 'simplemail', 'servicemail'];

const humanNames = ['Valentine', 'Zic', 'Shloma', 'Anna', 'Semen', 'Meriam', 'Zigfrid', 'Tereza', 'Hanter'];

const domainZones = ['com', 'net', 'org', 'biz', 'info'];

const getNumberFromZeroToMax = (max) => Math.floor(Math.random() * max);

const integerRandomNumber = (args = { numberOrder: 1000000, blockCount: 6 }) => {
    const { numberOrder, blockCount } = args;
    const unixTime = Date.now(); 
    const produce = unixTime * getNumberFromZeroToMax(numberOrder);
    const numbersInBlock = Math.floor(produce.toString().length / blockCount);
    const numberBlocks = produce.toString().split('').reduce((result, number) => {
        const { blocks, numbersInBlock } = result;

        if (!blocks.length) {
            return { blocks: [`${number}`], numbersInBlock };
        }

        const lastBlockIndex = blocks.length - 1;
        const lastBlock = blocks[lastBlockIndex];

        if (lastBlock.length !== numbersInBlock) {

            return { blocks: [...blocks.slice(0, lastBlockIndex), `${lastBlock}${number}`], numbersInBlock };
        }

        return { blocks: [...blocks, `${number}`], numbersInBlock };

    }, { blocks: [], numbersInBlock });

    return numberBlocks;
};

const newBlocksOrder = (length) => {
    const result = [];

    while(result.length !== length) {
        const index = getNumberFromZeroToMax(length);

        if (!result.includes(index) && (index >= 0 && index < length)) {
            result.push(index);
        }
    }

    return result;
};

const idGenerator = (blocks) => Number(blocks.join('')).toString(16);

const randomEmailGenerator = (emailDomains, domainZones, humanNames) => {
    const [emailsLength, domainsLength, namesLength] = 
        [emailDomains.length, domainZones.length, humanNames.length];
    const [emailsIndex, domainsIndex, namesIndex] = 
        [emailsLength, domainsLength, namesLength].map(length => getNumberFromZeroToMax(length - 1));

    return `${humanNames[namesIndex]}@${emailDomains[emailsIndex]}.${domainZones[domainsIndex]}`;
}

export const generateUserList = (count = 100) => {
    const userList = [];

    for (let i = 0; i < count; ++i) {
        const { blocks } = integerRandomNumber();
        const permutatedBlocks = newBlocksOrder(blocks.length).map(index => blocks[index]);
        const userIndex = getNumberFromZeroToMax(humanNames.length - 1);
        const userName = humanNames[userIndex];

        const user = {};

        user.id = idGenerator(permutatedBlocks);
        user.number = i;
        user.email = randomEmailGenerator(emailDomains, domainZones, [userName]);
        user.name = userName;

        userList.push(user);
    }

    return userList;
}