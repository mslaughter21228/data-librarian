with open('web_interface.py', 'r') as f:
    content = f.read()

old = '''           if script_running:
               self.send_response(200)
               self.send_header("Content-type", "application/json; charset=utf-8")
               self.end_headers()
               self.wfile.write(json.dumps({"status": "running"}).encode("utf-8"))
           else:
               content_length = int(self.headers.get('Content-Length', 0))
               target_folder = None
               if content_length > 0:
                   post_data = self.rfile.read(content_length)
                   try:
                       data = json.loads(post_data.decode("utf-8"))
                       target_folder = data.get("target_folder")
                   except json.JSONDecodeError: pass
               threading.Thread(target=run_script, args=(target_folder,)).start()
               self.send_response(200)
               self.send_header("Content-type", "application/json; charset=utf-8")
               self.end_headers()
               self.wfile.write(json.dumps({"status": "started"}).encode("utf-8"))'''
new = '''           if script_running:
               self.send_response(200)
               self.send_header("Content-type", "application/json; charset=utf-8")
               self.send_header("Access-Control-Allow-Origin", "*")
               self.end_headers()
               self.wfile.write(json.dumps({"status": "running"}).encode("utf-8"))
           else:
               content_length = int(self.headers.get('Content-Length', 0))
               target_folder = None
               if content_length > 0:
                   post_data = self.rfile.read(content_length)
                   try:
                       data = json.loads(post_data.decode("utf-8"))
                       target_folder = data.get("target_folder")
                   except json.JSONDecodeError: pass
               threading.Thread(target=run_script, args=(target_folder,)).start()
               self.send_response(200)
               self.send_header("Content-type", "application/json; charset=utf-8")
               self.send_header("Access-Control-Allow-Origin", "*")
               self.end_headers()
               self.wfile.write(json.dumps({"status": "started"}).encode("utf-8"))'''

with open('web_interface.py', 'w') as f:
    f.write(content.replace(old, new, 1))

print('Done!')

