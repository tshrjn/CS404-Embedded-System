// From : http://stackoverflow.com/questions/13124271/driving-beaglebone-gpio-through-dev-mem
#ifndef _BEAGLEBONE_GPIO_H_
#define _BEAGLEBONE_GPIO_H_

/****************************************************************
 * Defines
 ****************************************************************/

//Start address of EMFI0 SDRAM (Q1)
#define EMIF0_SDRAM_START_ADDR 0x80000000

//Start and End addresses of the GPIO Port-0
#define GPIO0_START_ADDR 0x44e07000
#define GPIO0_END_ADDR   0x44e09000
#define GPIO0_SIZE (GPIO0_END_ADDR - GPIO0_START_ADDR)

//Start and End addresses of the GPIO Port-1
#define GPIO1_START_ADDR 0x4804C000
#define GPIO1_END_ADDR   0x4804e000
#define GPIO1_SIZE (GPIO1_END_ADDR - GPIO1_START_ADDR)

//Start and End addresses of the GPIO Port-2
#define GPIO2_START_ADDR 0x481ac000 
#define GPIO2_END_ADDR   0x481ae000
#define GPIO2_SIZE (GPIO2_END_ADDR - GPIO2_START_ADDR)

//Start and End addresses of the GPIO Port-3
#define GPIO3_START_ADDR 0x481ae000
#define GPIO3_END_ADDR   0x481b0000 
#define GPIO3_SIZE (GPIO3_END_ADDR - GPIO3_START_ADDR)

#define GPIO_OE 0x134
#define GPIO_DATAIN 0x138
#define GPIO_SETDATAOUT 0x194
#define GPIO_CLEARDATAOUT 0x190

#define USR0 (1<<21)
#define USR1 (1<<22)
#define USR2 (1<<23)
#define USR3 (1<<24)
#define GPIO_03 (1<<3)	
#define GPIO_07 (1<<7)
#define GPIO_30	(1<<30)	
#define GPIO_60  (1<<28)
	
#endif