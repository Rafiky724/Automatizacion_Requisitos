from pydantic import BaseModel, Field #listo
from typing import List

class Validator(BaseModel):
    id: str
    nombre: str = Field(..., min_length=1, max_length=50)
    habilidades: str = Field(..., min_length=1, max_length=500)
    rol: str = Field(..., min_length=1, max_length=20)
