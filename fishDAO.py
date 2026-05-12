import sqlite3
import dbconfig as cfg
from os import path


class fishDAO:
    connection=""
    cursor =''
    database=   ''
    
    def __init__(self):
        self.database=   cfg.mysql['database']

    def getcursor(self): 
        ROOT = path.dirname(path.realpath(__file__))

        self.connection = sqlite3.connect(path.join(ROOT,self.database))
        self.cursor = self.connection.cursor()
        return self.cursor

    def closeAll(self):
        self.connection.close()

         
    def getAll(self):
        cursor = self.getcursor()
        sql="select * from andre_fish_log"
        cursor.execute(sql)
        results = cursor.fetchall()
        returnArray = []

        for result in results:

            returnArray.append(self.convertToDictionary(result))
        
        self.closeAll()
        return returnArray

    def findByID(self, id):
        cursor = self.getcursor()
        sql=f"select * from andre_fish_log where id = {id}"
        
        cursor.execute(sql)
        result = cursor.fetchone()
        returnvalue = self.convertToDictionary(result)
        self.closeAll()
        return returnvalue

    def create(self, andre_fish_log):
        cursor = self.getcursor()
        sql=f"insert into andre_fish_log (species,sizecm, weight,location_name,,lure,picture_link) values(\"{andre_fish_log.get('species')}\",\"{andre_fish_log.get('sizecm')}\",{andre_fish_log.get('weight')}\",{andre_fish_log.get('species')}\",\"{andre_fish_log.get('species')}\",\"{andre_fish_log.get('species')}\",)"
        print(sql)
        cursor.execute(sql)

        self.connection.commit()
        newid = cursor.lastrowid
        book["id"] = newid
        self.closeAll()
        return book


    def update(self, id, book):
        cursor = self.getcursor()
        sql=f"update book set title= \"{book.get('title')}\", author=\"{book.get('author')}\", price={book.get('price')} where id = {id}"
        print(sql)
        cursor.execute(sql)
        self.connection.commit()
        self.closeAll()
        
    def delete(self, id):
        cursor = self.getcursor()
        sql=f"delete from book where id = {id}"
        
        cursor.execute(sql)

        self.connection.commit()
        self.closeAll()
        
        #print("delete done")

    def convertToDictionary(self, resultLine):
        attkeys=['id','title','author', "price"]
        book = {}
        currentkey = 0
        for attrib in resultLine:
            book[attkeys[currentkey]] = attrib
            currentkey = currentkey + 1 
        return book

        
bookDAO = BookDAO()