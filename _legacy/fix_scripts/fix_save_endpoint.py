with open('web_interface.py', 'r') as f:
    content = f.read()

old = '''        elif url_path == '/run_pdf_splitter':'''

new = '''        elif url_path == '/save_config':
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            self.send_response(200)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            try:
                new_config = json.loads(post_data.decode('utf-8'))
                with open('config.json', 'r') as f:
                    current = json.load(f)
                current.update(new_config)
                with open('config.json', 'w') as f:
                    json.dump(current, f, indent=4)
                load_config()
                self.wfile.write(json.dumps({'success': True}).encode('utf-8'))
            except Exception as e:
                self.wfile.write(json.dumps({'success': False, 'error': str(e)}).encode('utf-8'))
            return

        elif url_path == '/run_pdf_splitter':'''

with open('web_interface.py', 'w') as f:
    f.write(content.replace(old, new, 1))

print('Done!')
