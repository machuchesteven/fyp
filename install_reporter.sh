cd ..
pwd
source ../bin/activate
cd backend
python3 manage.py makemigrations --merge

python3 manage.py migrate



sudo ln -s /etc/nginx/sites-available/myproject /etc/nginx/sites-enabled