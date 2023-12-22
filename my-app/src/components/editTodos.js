export const EditTodos = ({ id, title, onEdit }) => {
    fetch(`http://localhost:3005/posts/${id}`, {
        
        method: "PUT",
              headers: {
            "Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify({
             title: 'new title',
             athor: "Alex",
            }),
    })
    .then((rawResponse) => rawResponse.json())
    .then((response) => {
        console.log('response', response);
    })
    return (
        <div>
            <button onClick={onEdit}>Edit</button>
        </div> 
    );
}