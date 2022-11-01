#! C:\Users\TJ\AppData\Local\Microsoft\WindowsApps\python.exe
print("Content-type: text\n\n")
print('you got it')
from datetime import datetime
now = datetime.now()
file = open('test.txt','w')
file.write("ran on " + now.strftime("%Y-%m-%d %H:%M:%S"))
file.close()