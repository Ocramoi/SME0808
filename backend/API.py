#!/usr/bin/env python3

import json
from flask import  Response
from typing import Dict, Any

def jsonResponse(data: Any, add: Dict[Any, Any] = {}, status: int = 200):
    return Response(
        json.dumps({ 'data': data, **add }),
        status=status,
        mimetype='application/json'
    )
