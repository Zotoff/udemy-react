export function moviesList(){
    return {
        type: 'MOVIES_LIST',
        // List of information from server
        payload: [
            {id: 1, name: "Pulp Fiction"},
            {id: 2, name: "Pearl Harbour"},
            {id: 3, name: "Rambo"}
        ]
    }
}