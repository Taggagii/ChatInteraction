Contained are two files, the point is to put one file on one computer / network, and the other on a different one. 


Then modify both their 'config' files and place their hosting URL under HOME and the other computer's URL under COMMUNICATION. the PORT is the port you'll host on locally.

During testing I used [Ngrok](https://ngrok.com/) to host on both computers. This allows you to host completely for free without the need of a static IP address. 
To do this, enter the port (8000, 8080, etc) then setup ngrok hosting on that port. 
Once this is completed put the ngrok link in HOME and the other host under COMMUNICATION. At this point you should be able to open the browser and see the chat and communicate with the other computr


NOTE: Github add's a line to "messages.json" file, remove this newline if you try to run and get something like "SyntaxError: Unexpected end of JSON input". I'll fix this soon
