async function getComment(id = 1){
    const answer = await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`);
    const json = await answer.json();

    return json;
}

getComment(3).then(comment => console.log(comment));
