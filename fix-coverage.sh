#!/bin/bash 
 
find ./coverage -type f -exec sed -i 's/\/dist\/webpack://g' {} \; 
