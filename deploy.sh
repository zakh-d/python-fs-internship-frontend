if ! command -v docker &> /dev/null
then
    sudo snap install docker
fi

cd ~/service

sudo docker rm -f app-container
sudo docker build -t app .
sudo docker run -d --name app-container -p 0.0.0.0:80:80 app