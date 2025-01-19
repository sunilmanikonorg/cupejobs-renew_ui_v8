# Docker Installation Instructions

## Method 1 using apt Repository (this was used on cupejobsuat-web-1)

1. Add Docker's official GPG key:
```
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
```

2. Add the repository to Apt sources:
```
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

3. Install the packages:
```
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

4. Start Docker and verify the installation: 
```
sudo docker run hello-world
```

## Method 2 using a Convenience Script

curl -fsSL https://get.docker.com -o get-docker.sh && sudo sh get-docker.sh


## Method 3 using Manual Method

1. Download the necessary .deb files and install them manually

2. Install the packages: sudo dpkg -i ./containerd.io_<version>_<arch>.deb ./docker-ce_<version>_<arch>.deb ./docker-ce-cli_<version>_<arch>.deb ./docker-buildx-plugin_<version>_<arch>.deb ./docker-compose-plugin_<version>_<arch>.deb

3. Start Docker and verify the installation: sudo service docker start sudo docker run hello-world

# Some useful UNIX commands

1. see version of Ubuntu that's running
```
lsb_release -a
```

2. see amount of RAM on server
```
grep MemTotal /proc/meminfo
```

3. see CPU architecture info
```
lscpu
```
