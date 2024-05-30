from flask import request, jsonify
from dataBase.connection import db
from models.requisito import Requisito
from pydantic import ValidationError

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

