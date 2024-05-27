from flask import Flask, render_template, request, url_for, redirect, request, jsonify
#from openai import OpenAI

app = Flask(__name__)



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

    if request.method == 'POST':

        #return redirect(url_for('patron2'))
        requisito = request.json['requisito']

        print(f"Requisito recibido: {requisito}")
        
        """
        try:
            
            stream = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": "Di 'si' en inglés solamente"}],
                stream=True,
            )

            answer = ""
            for chunk in stream:
                if chunk.choices[0].delta.content is not None:
                    answer += chunk.choices[0].delta.content

            print(f"Respuesta de chat: {answer}")

        except Exception as e:
            print(f"Error: {e}")"""
        
        return jsonify({'mensaje': 'Requisito procesado exitosamente'})



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
    return render_template('patron.html', data = data)

@app.route('/patron2')
def patron2():
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
    return render_template('patron2.html', data = data)

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
        },        
    }
    return render_template('validadores.html', data = data)

@app.route('/depuracion')
def depuracion():
    data = {
        'titulo':'Inicio',
        'navegacion': {
            'logo': 'img/Logo.png',
            'patron': 'Patrón',
            'asignar': 'Asignar',
            'depuracion': 'Depuración'
        },        
    }
    return render_template('patron.html', data = data)

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
    
