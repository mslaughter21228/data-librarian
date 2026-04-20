with open('web_interface.py', 'r') as f:
    content = f.read()

old = '''        elif url_path == '/check_status':'''

new = '''        elif url_path == '/get_config':
            self.send_response(200)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            try:
                with open('config.json', 'r') as f:
                    config_data = json.load(f)
                self.wfile.write(json.dumps({'success': True, 'data': config_data}).encode('utf-8'))
            except Exception as e:
                self.wfile.write(json.dumps({'success': False, 'error': str(e)}).encode('utf-8'))
            return

        elif url_path == '/check_status':'''

with open('web_interface.py', 'w') as f:
    f.write(content.replace(old, new, 1))

print('Done!')

