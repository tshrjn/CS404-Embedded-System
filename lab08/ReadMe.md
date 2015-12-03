To: Mark A Yoder
From: Tushar Jain, B13236
Date: 3rd October, 2015


##Objective :
To work with LKMs (Loadable Kernel Modules).


##Set-Up
 Setup instructions can be obtained from Derek Molloy's blog:
 http://derekmolloy.ie/writing-a-linux-kernel-module-part-1-introduction/

## Lab Steps
The LKM was loaded onto the BeagleBone and output was tested and recorded in /var/ker.log.

In the second part, some modifications were made to the original file to make a new one:
We added new parameter addr to show address, with default value as "IIT"
Then we printed address to ker.log file.
We modified hello.c to get hello2.c
Then Makefile has been also modified for hello2.c

This was done late as I was having issues with loading the LKM.
Eg :-
The path to LKM should not have directory name having spaces.

 
Since we were completely new to messing around with kernel files and modules, it was something difficult for us.