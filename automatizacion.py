import requests
import json
import pandas as pd
import datetime
import sys
from distutils.dir_util import copy_tree
import os

def main():
    df = pd.read_excel("https://github.com/Sud-Austral/MAPA_RELEASE/blob/main/origenes/Origenes%20Mapas.xlsx?raw=true")
    for i,j in df.iterrows():
        
        #copy_tree(fr"{os.getcwd()}/luis/bases/main", fr"{os.getcwd()}/publicaciones2/{j['nombre']}")
        copy_tree("luis/bases/main",f"publicaciones2/{j['nombre']}")
        ref1 = pd.read_excel(j["excel"], sheet_name="BASE Global")
        ref2 = pd.read_excel(j["excel"], sheet_name="Capas")

        with open(f"publicaciones2/{j['nombre']}/db/dataGlobal1.json", 'w', encoding='utf-8') as file:
            ref1.to_json(file,orient="records",force_ascii=False)

        with open(f"publicaciones2/{j['nombre']}/db/dataCapa1.json", 'w', encoding='utf-8') as file:
            ref2.to_json(file,orient="records",force_ascii=False)

        f = open (f"publicaciones2/{j['nombre']}/Index.html",'r')
        contenido = f.read()
        f.close()

        with open(f"publicaciones2/{j['nombre']}/Index.html", 'w', encoding='utf-8') as file:
            file.write(contenido.replace("*TITULO_PAGINA*",j["titulo"]))

        print(j["nombre"])
        """
        

        
        


        
        """
    return

if __name__ == '__main__':
    print("Comenzo...")
    main()