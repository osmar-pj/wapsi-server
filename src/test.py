import pandas as pd
import numpy as np

relation = {
    "_id": "65f0d83d36852be7e55759f6",
    "sensors": [
        {
            "_id": "65f0ccd211ab73bc63d2f2fa",
            "value": 20,
            "measure": "%",
            "type": "sensor",
            "mode": "auto",
            "createdAt": "2024-03-12T21:44:50.014Z",
            "updatedAt": "2024-03-12T21:57:30.425Z",
            "controllerId": "65ef68acca1df4a4c9e4d19e",
            "name": "sensor oxigeno",
            "signal": "analog",
            "symbol": "O2"
        },
        {
            "_id": "65f0d06849f11efc761dc849",
            "controllerId": "65ef68acca1df4a4c9e4d19e",
            "name": "sensor monoxido",
            "symbol": "CO",
            "value": 3,
            "measure": "ppm",
            "type": "sensor",
            "signal": "analog",
            "mode": "auto",
            "createdAt": "2024-03-12T22:00:08.282Z",
            "updatedAt": "2024-03-12T22:00:08.282Z"
        }
    ],
    "actuators": [
        {
            "_id": "65f0d12a49f11efc761dcbd9",
            "controllerId": "65efc9301aba085c39bbf831",
            "name": "Ventilador 1",
            "symbol": "FAN",
            "value": 0,
            "measure": "",
            "type": "actuator",
            "signal": "digital",
            "mode": "auto",
            "createdAt": "2024-03-12T22:03:22.065Z",
            "updatedAt": "2024-03-12T22:03:22.065Z"
        }
    ],
    "createdAt": "2024-03-12T22:33:33.422Z",
    "updatedAt": "2024-03-12T22:33:33.422Z"
}

table = [
    {
        'actuador': 'Ventilador 1',
        'mode': 'auto',
        'value': 'on',
        'O2': 21.3,
        'CO': 3
    }
]

relationIds = {
  "sensors": [1,2],
  "actuators": [3]
}

# Create a DataFrame from the table
sen = pd.DataFrame(relation['sensors'])
act = pd.DataFrame(relation['actuators'])
act.drop(columns=['_id', 'controllerId', 'symbol', 'measure', 'createdAt', 'updatedAt'], inplace=True)
# act.set_index('name').reset_index(inplace=True)

sen.drop(columns=['_id', 'controllerId', 'name', 'type', 'signal', 'measure', 'mode', 'createdAt', 'updatedAt'], inplace=True)
sen.set_index()