import sqlite3
import dbconfig as cfg
from os import path

class FishDAO: # Use Capital F for class name convention
    connection=""
    cursor =''
    database=   ''
    
    def __init__(self):
        # Ensure your dbconfig has 'database' defined
        self.database = cfg.mysql['database']

    def getcursor(self): 
        ROOT = path.dirname(path.realpath(__file__))
        self.connection = sqlite3.connect(path.join(ROOT, self.database))
        self.cursor = self.connection.cursor()
        return self.cursor

    def closeAll(self):
        self.connection.close()

    def getAll(self):
        cursor = self.getcursor()
        sql = "select * from andre_fish_log"
        cursor.execute(sql)
        results = cursor.fetchall()
        returnArray = []
        for result in results:
            returnArray.append(self.convertToDictionary(result))
        self.closeAll()
        return returnArray

    def findByID(self, id):
        cursor = self.getcursor()
        sql = f"select * from andre_fish_log where fishId = {id}" # Changed 'id' to 'fishId' to match your schema
        cursor.execute(sql)
        result = cursor.fetchone()
        if result:
            returnvalue = self.convertToDictionary(result)
        else:
            returnvalue = None
        self.closeAll()
        return returnvalue

    def create(self, fish):
        cursor = self.getcursor()
        # Cleaned up the formatting and matched the columns to your schema
        sql = f"insert into andre_fish_log (species, sizecm, weight, location_name, lure, picture_link) values (\"{fish.get('species')}\", {fish.get('sizecm')}, {fish.get('weight')}, \"{fish.get('location_name')}\", \"{fish.get('lure')}\", \"{fish.get('picture_link')}\")"
        cursor.execute(sql)
        self.connection.commit()
        newid = cursor.lastrowid
        fish["fishId"] = newid
        self.closeAll()
        return fish

    def update(self, id, fish):
        cursor = self.getcursor()
        # Updated table name and column names
        sql = f"update andre_fish_log set species=\"{fish.get('species')}\", sizecm={fish.get('sizecm')}, weight={fish.get('weight')}, location_name=\"{fish.get('location_name')}\", lure=\"{fish.get('lure')}\", picture_link=\"{fish.get('picture_link')}\" where fishId = {id}"
        cursor.execute(sql)
        self.connection.commit()
        self.closeAll()
        
    def delete(self, id):
        cursor = self.getcursor()
        sql = f"delete from andre_fish_log where fishId = {id}"
        cursor.execute(sql)
        self.connection.commit()
        self.closeAll()

    def convertToDictionary(self, resultLine):

        attkeys = ['fishId', 'species', 'sizecm', 'weight', 'location_name', 'lure', 'picture_link']
        fish = {}
        currentkey = 0
        for attrib in resultLine:
            fish[attkeys[currentkey]] = attrib
            currentkey = currentkey + 1 
        return fish

fishDAO = FishDAO()