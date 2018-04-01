# Bot
twitter bot that will allow me to make a new tweet every time a new file its stored in my pc

# Configuration

In order to allow bot to tweet a new file called config.json need to be created with the following info:
module.exports = {
	consumer_key: '...',
	consumer_secret: '...',
	access_token: '...',
	access_token_secret: '...'
}

with valid keys, you can find those at https://apps.twitter.com/ (keys and access token)

#Folder setup

In this app we have two folder that will check for new files, both have same setup:
drive:/.../Main_Folder
	Folder1
		folder1 1x01.mp4
		folder1 1x02.avi
	Folder2
		folder2 1x01.mkv
		folder2 1x02.avi
etc.

App will find the most recent file and add to a json 'Main_Folder' and then tweet about it. With just some minor adjusment you can add as many 'main_folder' as you wish