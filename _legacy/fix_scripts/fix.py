with open('web_interface.py', 'r') as f:
    lines = f.readlines()

# Find the two do_POST line numbers
post_lines = [i for i, line in enumerate(lines) if 'def do_POST(self):' in line]
print(f"Found do_POST at lines: {[l+1 for l in post_lines]}")

# Remove lines from first do_POST up to (not including) second do_POST
if len(post_lines) == 2:
    del lines[post_lines[0]:post_lines[1]]
    with open('web_interface.py', 'w') as f:
        f.writelines(lines)
    print("Done! Merged successfully.")
else:
    print(f"Expected 2 do_POST methods, found {len(post_lines)}. No changes made.")
