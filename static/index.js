let outputCount = 0;
let count = 0;

function search() {
    const overlay = document.getElementById('overlay');
    const inputText = document.getElementById('input').value;
    console.log(inputText);
    overlay.style.display = 'flex';

    fetch('/find_similar_patents', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: inputText }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        overlay.style.display = 'none';

        const outputDiv = document.getElementById('output');

        outputDiv.innerHTML = '';
        outputCount = 0;
        count = 0;
        data.data.forEach((item) => {
            console.log(item.similarity);
            if (item.similarity > 95){
                console.log(item.similarity);
                count++;
            }
        });
        console.log(count);
        if (count != 0){
            data.data.forEach((item) => {
                outputCount++;

                const container = document.createElement('div');
                container.style.overflowY = 'auto';
                container.style.maxHeight = '200px';
                container.style.padding = '10px';
                container.style.marginBottom = '10px';

                const newH3 = document.createElement('h3');
                const newP1 = document.createElement('p');
                const newP2 = document.createElement('p');
                const newBr = document.createElement('br');
    
                newH3.textContent = `Prediction Output ${outputCount}`;
                newP1.textContent = `Patent Number: ${item.patent_number}, Similarity: ${item.similarity}`;
                newP2.textContent = `Description: ${item.description}`;
    
                container.appendChild(newH3);
                container.appendChild(newP1);
                container.appendChild(newP2);
                container.appendChild(newBr);
    
                outputDiv.appendChild(container);
    
                if (outputCount % 5 === 0) {
                    const extraBr = document.createElement('br');
                    outputDiv.appendChild(extraBr);
                }
            });
        }
        else {
            const newH3 = document.createElement('h3');
            const newP1 = document.createElement('p');
            const newBr = document.createElement('br');

            newH3.textContent = `Prediction Output`;
            newP1.textContent = `The patent idea doesn't match any of the existing patents in the database.`;

            outputDiv.appendChild(newH3);
            outputDiv.appendChild(newP1);
            outputDiv.appendChild(newBr);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        overlay.style.display = 'none';
    });
}
