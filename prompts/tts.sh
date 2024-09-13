#!/bin/bash
pico2wave -l fr-FR -w $1.wav < $1.txt
aplay test.wav
