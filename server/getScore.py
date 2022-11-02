#! C:\Users\TJ\AppData\Local\Microsoft\WindowsApps\python.exe
print("Content-type: json\n\n")
import mysql.connector
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="sci_smash"
)
myCursor = mydb.cursor()
myCursor.execute('SELECT score, username FROM scores ORDER BY score desc LIMIT 50')
result = myCursor.fetchall()

endstring = ""
endstring += "{\"items\": ["
for x in range(len(result)):
  y = result[x]
  endstring += "{ \"score\": "+str(y[0])+", \"username\": \""+y[1]+"\" }"
  if  x != len(result)-1:
    endstring += ","
  
endstring += "]}"
print(endstring)