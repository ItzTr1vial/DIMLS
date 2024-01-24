from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd

app = Flask(__name__)
CORS(app)

with open('model-11.pkl', 'rb') as model_file:
    loaded_model = pickle.load(model_file)

preprocessor = loaded_model.named_steps["preprocessor"]
classifier= loaded_model.named_steps["classifier"]
print(loaded_model)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON input data
        data = request.get_json()

        # Extract the first object from the array
        data_obj = pd.DataFrame([data])
        
        # Prepare the input features as needed for the model
        input_features = preprocessor.transform(data_obj)

        # Make predictions using the loaded model
        # Assuming your model expects a list of features
        prediction = classifier.predict_proba(input_features)[:, 1][0]

        # Return the prediction as a JSON response
        return jsonify({'probability': prediction}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/')
def home():
    return ("Machine Learning Model API")

if __name__ == '__main__':
    app.run(debug=True)