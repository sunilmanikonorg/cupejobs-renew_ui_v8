# Ubuntu OS Upgrade

## Command Summary

Connect to the SSH server
```commandline
ssh myusername@arms3qa-api-1.uit.yorku.ca
```
Print distribution specific information
```commandline
lsb_release -a
```

Fetch latest package versions and install updates
```commandline
sudo apt update && sudo apt upgrade -y && sudo apt dist-upgrade -y && sudo apt autoremove
sudo reboot
```

To upgrade to the latest LTS, install the `update-manager-core` package
```commandline
sudo apt install update-manager-core
```

Open an additional SSH port just to have an additional secure channel to connect to your server should an error occur
```commandline
sudo iptables -I INPUT -p tcp --dport 1022 -j ACCEPT
```

Upgrade ubuntu version
```commandline
sudo do-release-upgrade
sudo reboot
```

Close the temporary port after the upgrade
```commandline
sudo iptables -A INPUT -p tcp --dport 1022 -j DROP
```

Print distribution specific information
```commandline
lsb_release -a
```

## SSH Authentication
Generate SSH key pair
```commandline
ssh-keygen -t rsa -b 4096 -f ~/.ssh/ge
```

Copy public key to server
```commandline
ssh-copy-id -i ge.pub manikon@arms3uat-api-1.uit.yorku.ca
ssh-copy-id -i ge.pub manikon@cupejobsuat-web-1.uit.yorku.ca
```

Login using SSH private key
```commandline
ssh -i ge manikon@arms3uat-api-1.uit.yorku.ca
ssh -i ge manikon@cupejobsuat-web-1.uit.yorku.ca
```
