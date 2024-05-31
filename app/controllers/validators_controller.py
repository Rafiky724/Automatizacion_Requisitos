from flask import request, jsonify
from dataBase.connection import db
from models.validator import Validator
from pydantic import ValidationError
from bson.objectid import ObjectId

validadores_collection = db['validadores2']

def validator_add(data):
    #print(f"Valor recibido para id_validador: {data.get('id_validador')}")
    try:
        validador = Validator(**data)
    except ValidationError as e:
        return {'error': e.errors()}, 400

    validador_dict = validador.dict()
    #Inserta la info a la BD
    result = validadores_collection.insert_one(validador_dict)
    return {'inserted_id': str(result.inserted_id)}, 201

def get_validators():
    validadores = validadores_collection.find()
    validadores_list = []
    for validador in validadores:
        validador['_id'] = str(validador['_id'])  # Convertir ObjectId a string
        validadores_list.append(validador)
    return validadores_list


def delete_validator(validator_id):
    try:
        # Convertir el id a ObjectId
        object_id = ObjectId(validator_id)
    except Exception as e:
        return {'error': 'ID inválido'}, 400

    result = validadores_collection.delete_one({'_id': object_id})

    if result.deleted_count == 0:
        return {'error': 'Validador no encontrado'}, 404

    return {'message': 'Validador eliminado correctamente'}, 200