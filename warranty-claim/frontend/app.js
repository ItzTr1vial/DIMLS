document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('warrantyForm');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
    
        // Get form data
        const formObject = {
            "Area": document.getElementById('area').value,
            "Consumer_profile": document.getElementById('consumerProfile').value,
            "Product_category": document.getElementById('productCategory').value,
            "Product_type": document.getElementById('productType').value,
            "AC_1001_Issue": document.getElementById('AC_1001_Issue').value,
            "AC_1002_Issue": document.getElementById('AC_1002_Issue').value,
            "AC_1003_Issue": document.getElementById('AC_1003_Issue').value,
            "TV_2001_Issue": document.getElementById('TV_2001_Issue').value,
            "TV_2002_Issue": document.getElementById('TV_2002_Issue').value,
            "TV_2003_Issue": document.getElementById('TV_2003_Issue').value,
            "Claim_Value": document.getElementById('claimValue').value,
            "Service_Centre": document.getElementById('serviceCentre').value,
            "Product_Age": document.getElementById('productAge').value,
            "Purchased_from": document.getElementById('purchasedFrom').value,
            "Call_details": document.getElementById('callDetails').value,
            "Purpose": document.getElementById('purpose').value
        };

        // Perform the AJAX POST request to your predictive API
        fetch('http://127.0.0.1:4000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObject)
        })
        .then(response => response.json())
        .then(data => {
            // Display result based on the response from the predictive API
            if (data.probability < 0.5) {
                resultDiv.innerHTML = 'Successful warranty claim submission.';
            } else {
                console.log(data.probability);
                resultDiv.innerHTML = 'Fraudulent warranty claim submission.';
            }
            resultDiv.style.display = 'block'; // Show the result div
            const predictionValueDiv = document.getElementById("predictionValue");
            predictionValueDiv.innerHTML = "Prediction Value: " + data.probability;
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'Error occurred during submission.';
            resultDiv.style.display = 'block'; // Show the result div with error message
        });
    });
});
