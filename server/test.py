#! C:\Users\TJ\AppData\Local\Microsoft\WindowsApps\python.exe
print("Content-type: text\n\n")
print('you got it')
import mysql.connector
'''
from datetime import datetime
now = datetime.now()
file = open('test.txt','w')
file.write("ran on " + now.strftime("%Y-%m-%d %H:%M:%S"))
file.close()
'''
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="sakila"
)
myCursor = mydb.cursor()
myCursor.execute('SELECT title FROM film')
result = myCursor.fetchall()
for x in result:
    print(x[0])