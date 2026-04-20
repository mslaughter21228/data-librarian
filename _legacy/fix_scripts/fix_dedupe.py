import os

files = [
    '/home/mslaughter-admin/projects/data-librarian-main/app/config/page.tsx',
    '/home/mslaughter-admin/projects/data-librarian-main/app/dashboard/page.tsx',
    '/home/mslaughter-admin/projects/data-librarian-main/app/dedupe/page.tsx',
    '/home/mslaughter-admin/projects/data-librarian-main/components/Sidebar.tsx',
    '/home/mslaughter-admin/projects/data-librarian-main/components/Header.tsx',
    '/home/mslaughter-admin/projects/data-librarian-main/python_core/config.py',
    '/home/mslaughter-admin/projects/data-librarian-main/python_core/serverconfig.py',
    '/home/mslaughter-admin/projects/data-librarian-main/python_core/config.json',
]

replacements = [
    ('WEEDING_TOOL_CONFIG', 'DEDUPE_TOOL_CONFIG'),
    ('WEEDING_TOOL', 'DEDUPE_TOOL'),
    ('Weeding_Module', 'Dedupe_Module'),
    ('WEEDING SECTION', 'DEDUPE SECTION'),
    ('Weeding Process', 'Dedupe Process'),
    ('Weeding process', 'Dedupe process'),
    ('WeedingPage', 'DedupePage'),
    ('weedingAdvancedOpen', 'dedupeAdvancedOpen'),
    ('setWeedingAdvancedOpen', 'setDedupeAdvancedOpen'),
    ('weeding_', 'dedupe_'),
    ('MODULE_WEEDING = "weeding"', 'MODULE_WEEDING = "dedupe"'),
    ('/weeding', '/dedupe'),
    ('isActive("/weeding")', 'isActive("/dedupe")'),
    ('"Weeding"', '"Dedupe"'),
    ('>Weeding<', '>Dedupe<'),
    ('WEEDING_TOOL"', 'DEDUPE_TOOL"'),
    ('"weeding"', '"dedupe"'),
    ("'weeding'", "'dedupe'"),
    ('__WEEDING_SETTINGS__', '__DEDUPE_SETTINGS__'),
]
for filepath in files:
    if not os.path.exists(filepath):
        print(f"SKIPPED (not found): {filepath}")
        continue
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    original = content
    for old, new in replacements:
        content = content.replace(old, new)
    
    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated: {filepath}")
    else:
        print(f"No changes: {filepath}")

print("All done!")

