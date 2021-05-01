#!/bin/sh




resizeRender () {
    mkdir -p lowres
    mkdir -p sprite

    for f in file3 render_*.png
    do
        echo "Processing $f"
        convert $f -crop 700x700+610+168 -resize 128 lowres/$f
    done

    montage -background none -tile 1 lowres/render_*.png sprite/sprite.png
}

(
    cd ../renders/Character.Dude
    resizeRender
)


(
    cd ../renders/Character.Enemy_1
    resizeRender
)

