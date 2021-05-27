import os
from PIL import Image, ExifTags

def image_optimize(folder):
	li = os.listdir("static/images/media/" + folder)
	print(li)
	for x in li:
		picture = Image.open("static/images/media/" + folder + "/" + x)
		print(picture._getexif())
		if picture._getexif():
			for orientation in ExifTags.TAGS.keys():
				if ExifTags.TAGS[orientation]=='Orientation':
					picture=picture.rotate(90, expand=True)
		picture.save("static/images/media/" + folder + "/" + x, optimize=True, quality=75)
	return

image_optimize("crew")
