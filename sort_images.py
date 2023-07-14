import os

directory = '/home/machu/Desktop/intelligent/fyp/images/train'
counter = 1
# looping inside the images directory
for filename in os.listdir(directory):
    # Adjust images extension
    if filename.endswith('.jpg') or filename.endswith('.png'):  
        new_name = f'motorcyclist_wear_helmet{counter}' + os.path.splitext(filename)[1]
        os.rename(os.path.join(directory, filename), os.path.join(directory, new_name))
        print('renamed successfully to {0}'.format(new_name))
        counter += 1
    else:
        print('renaming failed for image number {}'.format(counter))
        counter += 1

