with open('web_interface.py', 'r') as f:
    content = f.read()

old = '''        if url_path == "/run_script":'''

new = '''        if url_path == '/api/action':
            self.send_response(200)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            thread = threading.Thread(target=organize_library)
            thread.daemon = True
            thread.start()
            response = {"success": True, "message": "Module started"}
            self.wfile.write(json.dumps(response).encode('utf-8'))
            return

        elif url_path == '/api/library':
            self.send_response(200)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            response = {"success": True, "data": []}
            self.wfile.write(json.dumps(response).encode('utf-8'))
            return

        elif url_path == "/run_script":'''

with open('web_interface.py', 'w') as f:
    f.write(content.replace(old, new, 1))

print("Done!")
