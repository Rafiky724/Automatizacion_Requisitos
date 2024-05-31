from flask import request, jsonify
from dataBase.connection import db
from models.requisito import Requisito
from pydantic import ValidationError
from pymongo import ReturnDocument
from bson import ObjectId

requisitos_collection = db['requisitos2']

def add_requisito(data):
    #print(f"Valor recibido para id_validador: {data.get('id_validador')}")
    try:
        requisito = Requisito(**data)
    except ValidationError as e:
        return {'error': e.errors()}, 400

    requisito_dict = requisito.dict()
    #Inserta la info a la BD
    result = requisitos_collection.insert_one(requisito_dict)
    return {'inserted_id': str(result.inserted_id)}, 201

def get_requisitos():
    requisitos = requisitos_collection.find()
    requisitos_list = []
    for requisito in requisitos:
        requisito['_id'] = str(requisito['_id'])  # Convertir ObjectId a string
        requisitos_list.append(requisito)
    return requisitos_list


def update_requisito(identifier, data):
    try:
        identifier = ObjectId(identifier)
    except:
        return {'error': 'Invalid ObjectId'}, 400

    result = requisitos_collection.find_one_and_update(
        {'_id': identifier},
        {'$set': data},
        return_document=ReturnDocument.AFTER
    )
    if result:
        result['_id'] = str(result['_id'])
        return result, 200
    else:
        return {'error': 'Requisito not found'}, 404
    

def delete_requisito(identifier):
    try:
        identifier = ObjectId(identifier)
    except:
        return {'error': 'Invalid ObjectId'}, 400

    result = requisitos_collection.find_one_and_delete({'_id': identifier})
    if result:
        result['_id'] = str(result['_id'])
        return result, 200
    else:
        return {'error': 'Requisito not found'}, 404