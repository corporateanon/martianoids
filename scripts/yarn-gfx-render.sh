#!/bin/sh

RENDER_CHARACTER=Character.Dude \
    blender ../models.blend --background --python ./develop.py

RENDER_CHARACTER=Character.Enemy_1 \
    blender ../models.blend --background --python ./develop.py

