"""
ASGI config for hellocode project.
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hellocode.settings')

application = get_asgi_application()