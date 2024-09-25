#!/bin/bash
mimic3 --voice 'fr_FR/m-ailabs_low#ezwa'  --noise-scale .1 --noise-w .1 --length-scale 1.1 --output-dir . --csv < $1.txt
