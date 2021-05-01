import bpy
import os
import math


def disableRender(collection):
    collection.exclude = True
    print("Disabled rendering of: {}".format(collection.name))

def enableRender(collection):
    collection.exclude = False
    print("Enabled rendering of: {}".format(collection.name))

def disableRenderForAllCharacters():
    for col in bpy.context.view_layer.layer_collection.children['Characters'].children:
        if col.name.startswith("Character."):
            disableRender(col)

def degToRad(deg):
    return deg * math.pi/180

def selectCharacter(name):
    disableRenderForAllCharacters()
    characterCollection = bpy.context.view_layer.layer_collection.children['Characters'].children[name]
    enableRender(characterCollection)

def turnCamera(angleDegrees):
    cameraRadius = 1
    lightRadius = 10
    angleBetweenCameraAndLight = degToRad(45)
    angle = degToRad(angleDegrees)

    bpy.data.objects["MainCamera"].location = (
        math.cos(angle) * cameraRadius,
        math.sin(angle) * cameraRadius,
        cameraRadius
    )

    bpy.data.objects["MainLight"].location = (
        math.cos(angle+angleBetweenCameraAndLight) * lightRadius,
        math.sin(angle+angleBetweenCameraAndLight) * lightRadius,
        lightRadius
    )

def renderScene(file):
    bpy.context.scene.render.filepath = file
    res = bpy.ops.render.render(write_still=True)


def renderDude():
    characterName = 'Character.Dude'
    selectCharacter(characterName)
    for angle in range(0, 359, 30):
        turnCamera(angle)
        renderScene(
            file="//renders/{name}/rotate_{angle:d}".format(name=characterName, angle=angle)
        )

def renderOrbitoid():
    characterName = 'Character.Orbitoid'
    selectCharacter(characterName)
    for angle in range(0, 179, 30):
        turnCamera(angle)
        renderScene(
            file="//renders/{name}/rotate_{angle:d}".format(name=characterName, angle=angle)
        )


def main():
    renderDude()
    renderOrbitoid()

main()
