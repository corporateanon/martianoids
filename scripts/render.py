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

# region 
def rotateAndRender(characterName):
    cameraRadius = 1.5
    lightRadius = 10
    angleLightDelta = 45 * math.pi/180
    angularStep = 30

    bpy.context.scene.render.image_settings.file_format = 'PNG'

    for angle in range(0, 359, angularStep):
        print('--------------------------------')
        print('Rendering from angle: {}'.format(angle))
        print('--------------------------------')
        print('')

        angleRad = angle * math.pi/180

        bpy.data.objects["MainCamera"].location = (
            math.cos(angleRad) * cameraRadius,
            math.sin(angleRad) * cameraRadius,
            cameraRadius
        )

        bpy.data.objects["MainLight"].location = (
            math.cos(angleRad+angleLightDelta) * lightRadius,
            math.sin(angleRad+angleLightDelta) * lightRadius,
            lightRadius
        )

        bpy.context.scene.render.filepath = "//renders/{characterName}/render_{angle:03d}".format(angle=angle, characterName=characterName)

        res = bpy.ops.render.render(write_still=True)

# endregion

def main():
    renderCharacterName = os.environ["RENDER_CHARACTER"]
    targetCollection = bpy.context.view_layer.layer_collection.children['Characters'].children[renderCharacterName]
    disableRenderForAllCharacters()
    enableRender(targetCollection)
    rotateAndRender(renderCharacterName)


main()
