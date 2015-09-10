# Author : Tushar Jain
# Version: 1.2
# Date   : 20 August 2015
# ChangeLog: Fixing Bugs - Size & Pointer Location to be fixed
#

#!/usr/bin/env python

import curses
import os

class Sketch(object):
    def __init__(self):
        # (X, Y)
        self.pos = [0, 0]
        self.oldpos = list(self.pos)
        self.height = 0
        self.width = 0
        self.full = " "
        self.empty = "x"
        self.cursorc = "."
        self.stdscr = None

    def shake(self):
        # if choice == 1:    
            # self.height, self.width = temp
        # else:
        self.height, self.width = self.stdscr.getmaxyx()
        for y in xrange(0, self.height):
            for x in xrange(0, self.width):
                try:
                    self.stdscr.addstr(y, x, self.full)
                except curses.error:
                    pass

    def cursor(self):
        try:
            self.stdscr.addstr(self.pos[1], self.pos[0], self.cursorc)
        except curses.error:
            pass

    def main(self, stdscr):
        self.stdscr = stdscr
        stdscr.clear()
        self.shake()
        while True:
            self.cursor()
            c = stdscr.getch(self.height - 1, self.width - 1)
            if c == curses.KEY_UP:
                if self.pos[1] > 0:
                    self.pos[1] -= 1
            elif c == curses.KEY_DOWN:
                if self.pos[1] < self.height - 1:
                    self.pos[1] += 1
            elif c == curses.KEY_LEFT:
                if self.pos[0] > 0:
                    self.pos[0] -= 1
            elif c == curses.KEY_RIGHT:
                if self.pos[0] < self.width - 1:
                    self.pos[0] += 1
            elif c == ord('q'):
                break
            elif c == ord('s'):
                self.shake()
                self.oldpos = list(self.pos)
                continue
            else:
                continue
            stdscr.addstr(self.oldpos[1], self.oldpos[0], self.empty)
            self.oldpos = list(self.pos)


def main():
    os.system('clear')
    print "\t\t\t---------------------"
    print "\t\t\t\tEtch-A-Sketch"
    print "\t\t\t---------------------"
    print "    Move using arrow keys."
    print "    s - shake board (resetting your terminal)."
    print "    q - quit board."
    print "    Your current position of pen is denoted by \'.\'."
    print "    NOTE : Shake feature resets the board, but the pen will stay at the last known location."

    if (input("    Press 1 to Start !\n") == 1):
        sketch = Sketch()
        curses.wrapper(sketch.main)


if __name__ == '__main__':
    main()
