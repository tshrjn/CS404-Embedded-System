// Comment by Mark A. Yoder
// Looks good. 
// I don't see project information or answers to memory map questions.
// See comment about system() below
// Grade: 10/25

// From : http://stackoverflow.com/questions/13124271/driving-beaglebone-gpio-through-dev-mem
// Read from 2 swtch on different gpio ports and control an LED respectively using mmap.
// Be sure to have beaglebone_gpio.h in the current directort.
//  by Tushar Jain  28-Sept-2015

/****************************************************************
 * Includes
 ****************************************************************/
 
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h> 
#include <signal.h>    // Defines signal-handling functions (i.e. trap Ctrl-C)
#include "beaglebone_gpio.h"

/****************************************************************
 * Global variables
 ****************************************************************/

int keepgoing = 1;

/****************************************************************
 * signal_handler
 ****************************************************************/
 
void signal_handler(int sig);
// Callback called when SIGINT is sent to the process (Ctrl-C)
void signal_handler(int sig)
{
	printf( "\nCtrl-C pressed, cleaning up and exiting...\n" );
	keepgoing = 0;
}

/****************************************************************
 * Main Function
 ****************************************************************/

/* Comment by Mark A. Yoder
* What are these for?
*/
int main(int argc, char *argv[]){
	//system("bone_eqep1b > /sys/devices/bone_capemgr.*/slots");
	//system("bone_eqep2b > /sys/devices/bone_capemgr.*/slots");
/****************************************************************
 * Local variables
 ****************************************************************/

printf("Something Started!\n");

volatile void *gpio_addr0;
volatile void *gpio_addr1;
volatile unsigned int *gpio_oe_addr0;
volatile unsigned int *gpio_oe_addr1;
volatile unsigned int *gpio_datain_addr0;
volatile unsigned int *gpio_datain_addr1;
volatile unsigned int *gpio_setdataout_addr0;
volatile unsigned int *gpio_setdataout_addr1;
volatile unsigned int *gpio_cleardataout_addr0;
volatile unsigned int *gpio_cleardataout_addr1;

int fd = open("/dev/mem", O_RDWR);
int keepgoing = 1;    // Set to 0 when ctrl-c is pressed

/****************************************************************
 * Setting Up the Memory-Map 
 ****************************************************************/

gpio_addr0 = mmap(0,GPIO0_SIZE, PROT_READ | PROT_WRITE, MAP_SHARED, fd, GPIO0_START_ADDR);
gpio_addr1 = mmap(0,GPIO1_SIZE, PROT_READ | PROT_WRITE, MAP_SHARED, fd, GPIO1_START_ADDR);

		  gpio_oe_addr0 = gpio_addr0 + GPIO_OE;
		  gpio_oe_addr1 = gpio_addr1 + GPIO_OE;
	  gpio_datain_addr0 = gpio_addr0 + GPIO_DATAIN;
	  gpio_datain_addr1 = gpio_addr1 + GPIO_DATAIN;
  gpio_setdataout_addr0 = gpio_addr0 + GPIO_SETDATAOUT;
  gpio_setdataout_addr1 = gpio_addr1 + GPIO_SETDATAOUT;
gpio_cleardataout_addr0 = gpio_addr0 + GPIO_CLEARDATAOUT;
gpio_cleardataout_addr1 = gpio_addr1 + GPIO_CLEARDATAOUT;

//printf("Still going!\n");

	// Set the signal callback for Ctrl-C
	signal(SIGINT, signal_handler);

	if(gpio_addr0 == MAP_FAILED) {
        	printf("Unable to map GPIO0\n");
        	exit(1);
	} else if(gpio_addr1 == MAP_FAILED) {
        	printf("Unable to map GPIO0\n");
        	exit(1);
	}
	*gpio_oe_addr0 &= GPIO_03;
	*gpio_oe_addr0 &= ~USR0;
	*gpio_oe_addr1 &= GPIO_40;
	*gpio_oe_addr1 &= ~USR3;
	//printf("At While!\n");
	while(keepgoing) {
		//printf("While!!\n");
		if(*gpio_datain_addr0 & GPIO_03) {
			//printf("Stuffs hit 1!\n");
			*gpio_setdataout_addr0 = USR0;
		} else {
			*gpio_cleardataout_addr0 = USR0;
		}
		if(*gpio_datain_addr1 & GPIO_40) {
			// printf("Stuffs hit 2!\n");
			*gpio_setdataout_addr1 = USR3;
		} else {
			*gpio_cleardataout_addr1 = USR3;
		}
		// usleep(1);
	}

	munmap((void *)gpio_addr0, GPIO0_SIZE);
	munmap((void *)gpio_addr1, GPIO1_SIZE);
	close(fd);
	return 0;
}
