with open('web_interface.py', 'r') as f:
    content = f.read()

old = '''        elif url_path == '/check_status':
            self.send_response(200)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            self.end_headers()
            self.wfile.write(json.dumps({'running': script_running, 'log_file_path': log_file_path}).encode('utf-8'))
            return'''

new = '''        elif url_path == '/check_status':
            self.send_response(200)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'running': script_running, 'log_file_path': log_file_path}).encode('utf-8'))
            return'''

with open('web_interface.py', 'w') as f:
    f.write(content.replace(old, new, 1))

print('Done!')
