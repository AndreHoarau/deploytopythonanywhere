from flask import Flask, jsonify, request, abort
from fishDAO import fishDAO

app = Flask(__name__, static_url_path='', static_folder='static_pages')



@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/fish')

def getAll():

    results = fishDAO.getAll()
    return jsonify(results)


@app.route('/fish/<int:id>')

def findById(id):
    foundFish = fishDAO.findByID(id)

    return jsonify(foundFish)


@app.route('/fish', methods=['POST'])

def create():
    
    if not request.json:
        abort(400)

    fish = {
        "species": request.json['species'],
        "sizecm": request.json['sizecm'],
        "weight": request.json['weight'],
        "location_name": request.json['location_name'],
        "lure": request.json['lure'],
        "picture_link": request.json['picture_link'],
    }
    addedfish = fishDAO.create(fish)
    
    return jsonify(addedfish)

@app.route('/fish/<int:id>', methods=['PUT'])

def update(id):
    foundFish = fishDAO.findByID(id)
    if not foundFish:
        abort(404)
    
    if not request.json:
        abort(400)
    reqJson = request.json
    if 'weight' in reqJson and not isinstance(reqJson['weight'], (int, float)):
        abort(400, description="Weight must be a number")    
    if 'sizecm' in reqJson and not isinstance(reqJson['sizecm'], (int, float)):
        abort(400, description="Size must be a number")

    if 'species' in reqJson:
        foundFish['species'] = reqJson['species']
    if 'sizecm' in reqJson:
        foundFish['sizecm'] = reqJson['sizecm']
    if 'weight' in reqJson:
        foundFish['weight'] = reqJson['weight']
    if 'location_name' in reqJson:
        foundFish['location_name'] = reqJson['location_name']
    if 'lure' in reqJson:
        foundFish['lure'] = reqJson['lure']       
    if 'picture_link' in reqJson:
        foundFish['picture_link'] = reqJson['picture_link'] 
    fishDAO.update(id,foundFish)
    return jsonify(foundFish)
        

    

@app.route('/fish/<int:id>' , methods=['DELETE'])
def delete(id):
    fishDAO.delete(id)
    return jsonify({"done":True})




if __name__ == '__main__' :
    app.run(debug= True)