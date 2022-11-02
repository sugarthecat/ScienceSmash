#! C:\Users\TJ\AppData\Local\Microsoft\WindowsApps\python.exe
print("Content-type: text\n\n")
import mysql.connector
import os
from urllib.parse import parse_qs
queries = {}
if (os.environ and 'QUERY_STRING' in os.environ):
    queries = parse_qs(os.environ['QUERY_STRING'])
#print(queries)
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="sci_smash"
)
myCursor = mydb.cursor()
if('username' in queries and 'score' in queries):
    myCursor.execute("INSERT INTO scores (`score`, `username`) VALUES ("+str(queries['score'][0])+", '"+queries['username'][0]+"');")    
    print("{\"result\":\"success\"}")
else:
    print("{\"result\":\"fail\"}")


