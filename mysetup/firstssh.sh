#!/bin/bash
./ipMasquerade.sh wlan0
./setDNS.sh
./setDate.sh
ssh -X root@bone
