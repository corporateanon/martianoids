#!/bin/sh




resizeRender () {
    mkdir -p sprite

    montage -background none -tile 1 render_*.png sprite/sprite.png
}

(
    cd ../renders/Character.Dude
    resizeRender
)


(
    cd ../renders/Character.Enemy_1
    resizeRender
)

