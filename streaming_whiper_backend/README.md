# To run the bakend
## Create a virtual environment 
conda create -n env_name python=3.6

## Activate virtual environment 
conda activate env_name

## Install requirements.txt
pip install -r requirements.txt

## Run backend
uvicorn main:app --host 0.0.0.0 --reload