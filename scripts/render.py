import bpy
import os
import math

def disableRenderForAllCharacters():
    bpy.context.view_layer.layer_collection.children['Characters'].exclude = True

def configureCamera():
    cam = bpy.data.objects['MainCamera']
    cam.location = (-1, -1, 1.15)
    cam.data.ortho_scale = 0.875

class InstanceHandle():
    def __init__(self, collectionName):
        src = bpy.data.collections[collectionName]
        inst = bpy.data.objects.new(name='__tmp__instance.{}'.format(collectionName), object_data=None)
        inst.instance_collection = src
        inst.instance_type = 'COLLECTION'
        bpy.data.scenes['Scene'].collection.objects.link(inst)
        self.inst = inst

    def __enter__(self):
        return self.inst

    def __exit__(self, type, value, traceback):
        print('Cleaning up {}'.format(self.inst.name))
        bpy.data.objects.remove(self.inst, do_unlink=True)
    
    def getInstance(self):
        return self.inst
       

def renderScene(file):
    bpy.context.scene.render.filepath = file
    res = bpy.ops.render.render(write_still=True)


def renderDude():
    characterName = 'Character.Dude'
    with InstanceHandle(characterName) as model:
        model.rotation_mode = 'AXIS_ANGLE'
        for angle in range(0, 359, 30):
            model.rotation_axis_angle = (math.radians(angle), 0, 0, 1)
            renderScene(
                file="//renders/{name}/rotate_{angle:d}".format(name=characterName, angle=angle)
            )

def renderOrbitoid():
    characterName = 'Character.Orbitoid'
    with InstanceHandle(characterName) as model:
        model.rotation_mode = 'AXIS_ANGLE'
        for angle in range(0, 179, 30):
            model.rotation_axis_angle = (math.radians(angle), 0, 0, 1)
            renderScene(
                file="//renders/{name}/rotate_{angle:d}".format(name=characterName, angle=angle)
            )

def renderCalibrator():
    characterName = 'Character.Calibrator'
    with InstanceHandle(characterName) as model:
        renderScene(
            file="//renders/{name}/main".format(name=characterName)
        )


def renderWalls():
    with InstanceHandle('Character.WallCross'):
        renderScene(
            file='//renders/Character.Wall/cross'
        )

    with InstanceHandle('Character.WallBar') as model:
        model.rotation_mode = 'AXIS_ANGLE'
        renderScene(
            file='//renders/Character.Wall/rotate_0'
        )
        model.rotation_axis_angle = (math.radians(90), 0, 0, 1)
        renderScene(
            file='//renders/Character.Wall/rotate_90'
        )


def main():
    disableRenderForAllCharacters()
    configureCamera()
    renderWalls()
    renderDude()
    renderOrbitoid()
    renderCalibrator()

main()
