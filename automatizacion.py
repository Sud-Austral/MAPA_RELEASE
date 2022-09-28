import requests
import json
import pandas as pd
import datetime
import sys
from distutils.dir_util import copy_tree
import os
import shutil

def main():

    try:
        shutil.rmtree("publicaciones2")
    except:
        pass

    try:
        os.mkdir("publicaciones2")
    except:
        pass

    df = pd.read_excel("https://github.com/Sud-Austral/MAPA_RELEASE/blob/main/origenes/Origenes%20Mapas.xlsx?raw=true")
    for i,j in df.iterrows():
        print(1,i)
        #copy_tree(fr"{os.getcwd()}/luis/bases/main", fr"{os.getcwd()}/publicaciones2/{j['nombre']}")
        copy_tree("luis/bases/main",f"publicaciones2/{j['nombre']}")
        ref1 = pd.read_excel(j["excel"], sheet_name="BASE Global")
        ref2 = pd.read_excel(j["excel"], sheet_name="Capas")
        print(2,i)
        with open(f"publicaciones2/{j['nombre']}/db/dataGlobal1.json", 'w', encoding='utf-8') as file:
            ref1.to_json(file,orient="records",force_ascii=False)

        with open(f"publicaciones2/{j['nombre']}/db/dataCapa1.json", 'w', encoding='utf-8') as file:
            ref2.to_json(file,orient="records",force_ascii=False)
        print(3,i)
        f = open (f"publicaciones2/{j['nombre']}/Index.html",'r')
        contenido = f.read()
        f.close()
        print(4,i)
        with open(f"publicaciones2/{j['nombre']}/Index.html", 'w', encoding='utf-8') as file:
            file.write(contenido.replace("*TITULO_PAGINA*",j["titulo"]))

        print(j["nombre"])
        print(5,i)
    return

if __name__ == '__main__':
    print("Comenzo...")
    main()