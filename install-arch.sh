#!/bin/bash

echo "Starting Instalation!"
sudo pacman -Syyu --noconfirm
sudo pacmam -S nodejs npm
npm i 
npm test
echo "Instalation Done!"
