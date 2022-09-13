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
        print(j["nombre"])
        #copy_tree(fr"{os.getcwd()}/luis/bases/main", fr"{os.getcwd()}/publicaciones2/{j['nombre']}")
        copy_tree("luis/bases/main",f"publicaciones2/{j['nombre']}")
        """
        ref1 = pd.read_excel(j["excel"], sheet_name="BASE Global")

        with open(fr"publicaciones2/{j['nombre']}/db", 'w', encoding='utf-8') as file:
            ref1.to_json(file,orient="records",force_ascii=False)

        ref2 = pd.read_excel(j["excel"], sheet_name="Capas")


        with open(fr"publicaciones2/{j['nombre']}/db", 'w', encoding='utf-8') as file:
            ref2.to_json(file,orient="records",force_ascii=False)
        """


if __name__ == '__main__':
    print("Comenzo...")
    main()