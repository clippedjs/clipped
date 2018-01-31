#!/bin/bash

for d in presets/*; do autopublish "$d"; done
for d in generators/*; do autopublish "$d"; done
lerna run semantic-release
