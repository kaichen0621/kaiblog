import os, re

def get_clean_date(header, filepath):
    # 1. 嘗試抓取檔名或路徑中的 YYYY-MM-DD
    m = re.search(r"(20\d{2})[-._/](\d{2})[-._/](\d{2})", filepath)
    if m:
        return f"{m.group(1)}-{m.group(2)}-{m.group(3)}"

    # 2. 嘗試抓取 10.04 或 10.24 等 MM.DD 格式（預設年份 2026）
    m2 = re.search(r"/(1[0-2]|0?[1-9])\.(0?[1-9]|[12]\d|3[01])", filepath)
    if m2:
        month = m2.group(1).zfill(2)
        day = m2.group(2).zfill(2)
        return f"2026-{month}-{day}"

    # 3. 預設全區 fallback 日期
    return "2026-11-03"

modified = 0
for root, dirs, files in os.walk("content"):
    for file in files:
        if file.endswith(".md"):
            path = os.path.join(root, file)
            try:
                with open(path, "r", encoding="utf-8") as f:
                    content = f.read()

                match = re.match(r"^(---[\s\S]*?---)([\s\S]*)$", content)
                if not match:
                    continue

                header, body = match.groups()
                valid_date = get_clean_date(header, path)

                # 重新替換或補上標準 date 欄位
                if re.search(r"^date\s*:", header, re.M):
                    new_header = re.sub(r"^date\s*:.*$", f"date: {valid_date}", header, flags=re.M)
                else:
                    new_header = header.replace("---\n", f"---\ndate: {valid_date}\n", 1)

                if new_header != header:
                    with open(path, "w", encoding="utf-8") as f:
                        f.write(new_header + body)
                    modified += 1
            except Exception as e:
                print(f"Error {path}: {e}")

print(f"強效修復完成，共修正 {modified} 個檔案。")
