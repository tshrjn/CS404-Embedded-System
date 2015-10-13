#!/bin/bash
./setDNS.sh
./setDate.sh
# ./ipMasquerade.sh wlan0
ssh -X root@bone
