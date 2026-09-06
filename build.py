#!/usr/bin/env python3
"""
把 index.html + styles.css + content.js + app.js 合併成一個單檔網頁。

用途：單檔比較好用 LINE、Email 傳給家人，也可以直接上傳分享。
用法：在這個資料夾底下執行  python3 build.py
輸出：上一層資料夾的「行李打包清單.html」
"""

import pathlib
import sys

HERE = pathlib.Path(__file__).parent
OUT = HERE.parent / "行李打包清單.html"


def read(name: str) -> str:
    path = HERE / name
    if not path.exists():
        sys.exit(f"找不到 {name}，請確認檔案在 {HERE}")
    return path.read_text(encoding="utf-8")


def main() -> None:
    import re

    html = read("index.html")
    css = read("styles.css")
    content_js = read("content.js")
    app_js = read("app.js")

    # 把 <link rel="stylesheet" href="styles.css?v=1"> 換成內嵌 CSS
    html, n_css = re.subn(
        r'<link rel="stylesheet" href="styles\.css(\?[^"]*)?">',
        lambda _: "<style>\n" + css + "\n</style>",
        html,
    )

    # 把兩個 <script src="...js"> 換成內嵌 JS
    html, n_content = re.subn(
        r'<script src="content\.js(\?[^"]*)?"></script>',
        lambda _: "<script>\n" + content_js + "\n</script>",
        html,
    )
    html, n_app = re.subn(
        r'<script src="app\.js(\?[^"]*)?"></script>',
        lambda _: "<script>\n" + app_js + "\n</script>",
        html,
    )

    if not (n_css and n_content and n_app):
        sys.exit("合併失敗：index.html 裡的 css 或 js 標籤格式和預期不同")

    OUT.write_text(html, encoding="utf-8")
    print(f"完成，已輸出：{OUT}")


if __name__ == "__main__":
    main()
