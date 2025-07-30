import json
import requests
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse
import json
import requests
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse

# URLs de los microservicios
INVENTARIO_URL = "http://localhost:8001/api/inventario/"
INGRESOS_URL = "http://localhost:8002/api/ingresos/"

# Función genérica para manejar las solicitudes al microservicio
def forward_request(request, base_url, pk=None):
    url = base_url if not pk else f"{base_url}{pk}/"
    headers = {"Content-Type": "application/json"}

    try:
        if request.method == "GET":
            resp = requests.get(url,params=request.GET, headers=headers)#se agrea params=request.GET para manejar la paginación
        elif request.method == "POST":
            data = json.loads(request.body.decode("utf-8"))
            resp = requests.post(url, json=data, headers=headers)
        elif request.method in ["PUT", "PATCH"]:
            if not pk:
                return HttpResponse("Falta ID para actualizar", status=400)
            data = json.loads(request.body.decode("utf-8"))
            resp = requests.put(url, json=data, headers=headers)
        elif request.method == "DELETE":
            if not pk:
                return HttpResponse("Falta ID para eliminar", status=400)
            resp = requests.delete(url)
        else:
            return HttpResponse("Método no permitido", status=405)

        # Devolver la respuesta del microservicio al frontend
        return JsonResponse(
            resp.json() if resp.content else {}, 
            safe=False, 
            status=resp.status_code
        )

    except Exception as e:
        return HttpResponse(f"Error en API Gateway: {e}", status=500)

# Proxies específicos para inventario e ingresos
@csrf_exempt 
def proxy_inventario(request, pk=None):
    return forward_request(request, INVENTARIO_URL, pk)

@csrf_exempt
def proxy_ingresos(request, pk=None):
    return forward_request(request, INGRESOS_URL, pk)