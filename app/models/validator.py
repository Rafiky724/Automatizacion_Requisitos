from pydantic import BaseModel, Field #listo
from typing import List

class Validator(BaseModel):
    id: str
    nombre: str
    habilidades: str
    rol: str