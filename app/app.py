from flask import Flask, render_template, request, url_for, redirect, request, jsonify
from controllers.requisito_controller import get_requisitos, add_requisito, update_requisito, delete_requisito
from controllers.validators_controller import get_validators
#from openai import OpenAI
import google.generativeai as genai
import json
import urllib.parse
import os

app = Flask(__name__)

requisitosLast = []


# The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
model = genai.GenerativeModel('gemini-1.5-flash')


@app.route('/obtener_requisitos', methods=['GET'])
def obtener_requisitos(): # Aquí deberías obtener tus requisitos
    return jsonify(requisitos=requisitosLast)

@app.route('/get_requisitos', methods=['GET'])
def get_requisito(): # Aquí deberías obtener tus requisitos
    requisitos = get_requisitos()
    return jsonify(requisitos), 202

@app.route('/requisito/<identifier>', methods=['PUT'])
def update_requisito_route(identifier):
    data = request.json
    result, status_code = update_requisito(identifier, data)
    return jsonify(result), status_code

@app.route('/requisito/<identifier>', methods=['DELETE'])
def delete_requisito_route(identifier):
    result, status_code = delete_requisito(identifier)
    return jsonify(result), status_code



# @app.before_request
# def before_request():
#     print('Antes de la ruta')
    
# @app.after_request
# def after_request(response):
#     print('Despues de la ruta')
#     return response

@app.route('/')
def index():
    data = {
        'titulo':'Inicio',
        'navegacion': {
            'logo': 'img/Logo.png',
            'patron': 'Patrón',
            'asignar': 'Asignar',
            'depuracion': 'Depuración'
        },
        'imagenes': {
            'patron_img': 'img/Patron.png',
            'asignar_img': 'img/Asignar.png',
            'depurar_img': 'img/Depurar.png'
        }
        
    }
    return render_template('index.html', data=data) 

@app.route('/patron', methods=['GET', 'POST'])
def patron():

    data = {
        'titulo':'Inicio',
        'navegacion': {
            'logo': 'img/Logo.png',
            'patron': 'Patrón',
            'asignar': 'Asignar',
            'depuracion': 'Depuración',
            'robot': 'img/robot.jpg'
        },        
    }

    if request.method == 'POST':

        requisitosLast.clear()

        #return redirect(url_for('patron2'))
        requisitos = request.json

        for requisito in requisitos:
            #print(f"Requisito recibido: {requisito}")

            promt = f"""
Recibe el siguiente requisito y transforma la información en una de las siguientes estructuras de sintaxis:

1. condition - subject - action - object - constrain
Ejemplo: "when signal x is received [condition], the system [subject] shall set [action] the signal x received bit [object] within 2 seconds [constrain]"
condition - action or constrain - value

2. condition - action or constrain - value
Ejemplo: "At sea state 1 [condition], the radar system shall detect targets at ranges out to [action or constrain] 100 nautical miles [value]"
subject - action - value

3.subject - action - value
Ejemplo: "the invoice system [subject], shall display pending customer invoices [action] in ascending order [value] in which invoices are to be paid"

Devuelve el requisito transformado con los elementos identificados entre corchetes. Solo devuelve el requisito transformado en español, nada más.

Requisito:

{requisito['description']}

"""
            
            try:
                response = model.generate_content(promt)
                #print(f"Resultado: {response.text}")

                requisito['patron'] = response.text

            except Exception as e:
                print(f"Error: {e}")
        
        #print(requisitos)
        requisitos_json = json.dumps(requisitos)
        #requisitos_encoded = urllib.parse.quote(requisitos_json)
        redirect_url = url_for('patron2', requisitos=requisitos_json)
        return jsonify({'redirect': redirect_url})
        #return jsonify({'status': 'success', 'data': requisitos}), 200


    return render_template('patron.html', data = data)

@app.route('/patron2', methods = ['GET', 'POST'])
def patron2():

    if request.method == 'POST':
        data = request.json# Obtener los datos enviados en la solicitud POST
        #print(data)

        if isinstance(data, list):  # Verifica si data es una lista
            results = []
            status_codes = []
            for item in data:
                result, status_code = add_requisito(item)
                if status_code == 201:  # Solo agregamos resultados válidos
                    results.append(result)
                status_codes.append(status_code)
            # Devuelve todos los resultados y el status code más común
            return jsonify(results), max(set(status_codes), key=status_codes.count)
        else:  # Si no es una lista, procesa normalmente
            result, status_code = add_requisito(data)
            return jsonify(result), status_code

        #return jsonify({'status': 'success', 'data': requisitosP}), 200

    requisitos_json = request.args.get('requisitos')
    
    requisitos = json.loads(requisitos_json)

    for requisito in requisitos:
        if requisito not in requisitosLast:
            requisitosLast.append(requisito)

    

    """
    requisitos_encoded = request.args.get('requisitos')
    requisitos_json = urllib.parse.unquote(requisitos_encoded)
    requisitos = json.loads(requisitos_json)"""

    data = {
        'titulo':'Inicio',
        'navegacion': {
            'logo': 'img/Logo.png',
            'patron': 'Patrón',
            'asignar': 'Asignar',
            'depuracion': 'Depuración',
            'robot': 'img/robot.jpg'
        },        
    }
    return render_template('patron2.html', data = data, requisitos = requisitos)

@app.route('/asignar')
def asignar():
    data = {
        'titulo':'Inicio',
        'navegacion': {
            'logo': 'img/Logo.png',
            'patron': 'Patrón',
            'asignar': 'Asignar',
            'depuracion': 'Depuración',
            'robot': 'img/messi.jpg'
        }        
    }
    requisitosPrueba = get_requisitos()

    return render_template('validadores.html', data = data, requisitosPrueba= requisitosPrueba)

@app.route('/asignaciones_validadores')
def validadores_asignados():

    validador_asignado = []
    indice = 1

    requisitos_validadores = get_requisitos()
    validadores_listado = get_validators()
    
    #print(validadores_listado)

    promt = "Eres un IA encargada de automatizar el proceso de asignar un validador para un requisito. Quiero que me digas según los siguientes validadores, cuál es la mejor opción para encargarse de la validación del siguiente requisito:\nVALIDADORES\n"

    for validador in validadores_listado:
        promt += f"Validador {indice}: " + validador['nombre'] + "\n"
        promt += f"ID: {validador['id']+"\n"}"
        promt += f"Habilidades: " + validador['habilidades'] + "\n"
        indice = indice+1

    for requisito in requisitos_validadores:
        promtFinal = promt
        promtFinal += f"REQUISITO:\n{requisito['patron']}\nSOLO DEBES RETORNARME EL ID EXACTO DEL VALIDADOR QUE SELECCIONES, NADA MÁS"

        try:
            response = model.generate_content(promtFinal)
            print(f"Resultado: {response.text}")
            validador_asignado.append(response.text)

        except Exception as e:
            print(f"Error: {e}")

    validador_asignado = [nombre.strip() for nombre in validador_asignado]
    validadores_finales = []

    for validador in validador_asignado:
        for val in validadores_listado:
            if val['id'] == validador:

                dic = {}
                dic['nombre'] = val['nombre']
                dic['rol'] = val['rol']
                dic['id'] = val['id']

                validadores_finales.append(dic)
    
    return jsonify(validadoresAsignados=validadores_finales)


@app.route('/validadores',  methods = ['GET', 'POST'])
def add_validators():
    
    if request.method == 'POST':
        data = request.json# Obtener los datos enviados en la solicitud POST
        #print(data)

        from controllers.validators_controller import validator_add
        # Si no es una lista, procesa normalmente
        result, status_code = validator_add(data)
        return jsonify(result), status_code
    if request.method == 'GET':
        validadores = get_validators()
        return jsonify(validadores=validadores)

@app.route('/depuracion') 
def depuracion():

    requisitos_dep = get_requisito()

    data = {
        'titulo':'Inicio',
        'navegacion': {
            'logo': 'img/Logo.png',
            'patron': 'Patrón',
            'asignar': 'Asignar',
            'depuracion': 'Depuración',
            'robot': 'img/depuracion.jpg'
        },        
    }
    return render_template('depuracion.html', data = data, requisitos = requisitos_dep)

@app.route('/depuracion2')
def depuracion2():
    data = {
        'titulo':'Inicio',
        'navegacion': {
            'logo': 'img/Logo.png',
            'patron': 'Patrón',
            'asignar': 'Asignar',
            'depuracion': 'Depuración',
            'flecha': 'img/Flecha.png'
        },        
    }
    return render_template('depuracion2.html', data = data)

# @app.route('/contacto/<nombre>/<int:edad>')
# def contacto(nombre, edad):
#     data ={
#         'titulo':'Contacto',
#         'nombre': nombre,
#         'edad': edad
#     }
#     return render_template('contacto.html', data=data)

def pagina_no_encontrada(error):
    return render_template('components/404.html'), 404
    #return redirect(url_for('index'))

if __name__ == '__main__':
    app.register_error_handler(404, pagina_no_encontrada)
    app.run(port=5000, debug=True)
    
