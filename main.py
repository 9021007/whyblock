import requests
import json

token = "OTQ1ODE0MDI3OTM2ODkwOTIx.GevKCX.oV2jcLW9TGwRECBeVk7qWaakKhjeWpV2HGi1T8"
url = "https://discord.com/api/v9/users/@me/relationships"

headers = {
    "Authorization": token
}

r = requests.get(url, headers=headers)

data = json.loads(r.text)

blocked = []

for user in data:
    if user["type"] == 2:
        blocked.append(user)

for user in blocked:
    print(user["user"]["username"])