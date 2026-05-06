import os
import re

def clean_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # This regex matches hyphens with spaces around them that are likely tailwind classes
        # e.g. mt - 8, space - y - 3, tracking - [0.2em]
        # We look for them inside quotes or backticks
        def fix_tailwind_classes(match):
            return match.group(0).replace(' - ', '-')

        # Pattern: look for anything inside className={...} or className="..."
        content = re.sub(r'className\s*=\s*(\{[`"].*?[`"]\}|"[^"]*")', fix_tailwind_classes, content, flags=re.DOTALL)
        
        # Also handle data-testid which might still have spaces in some files
        content = re.sub(r'data\s*-\s*testid', 'data-testid', content)

        with open(filepath, 'w', encoding='utf-8', newline='') as f:
            f.write(content)
        print(f'Cleaned {filepath}')
    except Exception as e:
        print(f'Error cleaning {filepath}: {e}')

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith(('.jsx', '.js')):
            clean_file(os.path.join(root, file))
