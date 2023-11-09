import json
import os
import re
import string

import markdown
from bs4 import BeautifulSoup

# 指定Markdown文件所在的文件夹路径
#folder_path = ''

# 列出文件夹中的所有Markdown文件
#markdown_files = [file for file in os.listdir(folder_path) if file.endswith('.txt')]

#print("已经读取到文件")
# 遍历每个Markdown文件并处理
#n = 0
# for file_name in markdown_files:
#file_path = os.path.join(folder_path, file_name)

# 读取Markdown文件
file_path=''
with open(file_path, 'r', encoding='utf-8') as file:
    markdown_text = file.read()

#n = n + 1
# 在此处可以编写提取信息的代码，例如提取标题、链接等
# 解析Markdown文档
html = markdown.markdown(markdown_text)

# 使用BeautifulSoup解析HTML内容
soup = BeautifulSoup(html, 'html.parser')

# 提取各级标题及其下的内容，同时区分标题级别
headings_and_content = []

for heading in soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']):
    title = heading.text
    content = []
    next_sibling = heading.find_next_sibling()

    # 获取标题级别
    level = int(heading.name[1])

    while next_sibling and next_sibling.name not in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']:
        content.append(str(next_sibling))
        next_sibling = next_sibling.find_next_sibling()

    headings_and_content.append({'title': title, 'level': level, 'content': ''.join(content)})
# 寻找最高级别标题
# highest_priority_title = max(headings_and_content, key=lambda x: x['level'])
# 指定文件目录路径
output_directory = r"D:\files_temporary\checklistdata\outdata"
# 创建目录来保存文件，如果不存在的话
if not os.path.exists(output_directory):
    os.makedirs(output_directory)
# debug
print("这是：***", n, "***")
print("Processing file:", file_name)
# 替换无效字符创建文件名
invalid_chars = ['<', '>', ':', '"', '/', '\\', '|', '?', '*']
file_name = file_name.removesuffix('.txt')
output_file_name = file_name
for char in invalid_chars:
    output_file_name = output_file_name.replace(char, '')
# 创建一个输出文档以最高级别标题作为文档名
output_file_path = os.path.join(output_directory, f'{file_name}.md')
# 创建一个输出字典
output_data = {
    "id": n,
    "header": file_name,
    "topicList": [],
    "itemGroups": []
}


# 部分正确代码
def add_topic(data, level):
    if level == 1:
        return
    elif level == 2:
        output_data['topicList'].append(data['topic'])
        output_data['itemGroups'].append(data)
    else:
        add_topic(data, level - 1)


for entry in headings_and_content:
    if entry['level'] == 1:
        new_topic = {
            "topic": entry['title'],
            "items": []
        }
        add_topic(new_topic, entry['level'])

    elif entry['level'] == 2:
        original_string = entry['content']
        split_strings = re.split(r"<ul>\n<li>|</li>\n<li>", original_string)
        # 去除首尾的 "<ul>\n<li>" 和 "</li>\n</ul>" 标签
        split_strings[0] = split_strings[0].replace("[ ] ", "")
        split_strings[-1] = split_strings[-1].replace("</li>\n</ul>", "")
        # 创建一个新列表，只包含非空字符串
        non_empty_strings = [string.strip() for string in split_strings if string.strip()]
        info = []
        for st in non_empty_strings:
            st = re.sub(r'\[ +\]', '', st)
            info.append(st)
        items_list = [{"title": string} for string in info]
        new_topic = {
            "topic": entry['title'],
            "items": items_list,
            # "description": entry['content'],
            # "description":"",
            # "tags":""
        }
        add_topic(new_topic, entry['level'])
    elif entry['level'] == 3:
        original_string = entry['content']
        split_strings = re.split(r"<ul>\n<li>|</li>\n<li>", original_string)
        # 去除首尾的 "<ul>\n<li>" 和 "</li>\n</ul>" 标签
        split_strings[0] = split_strings[0].replace("[ ] ", "")
        split_strings[-1] = split_strings[-1].replace("</li>\n</ul>", "")
        # 创建一个新列表，只包含非空字符串
        non_empty_strings = [string.strip() for string in split_strings if string.strip()]
        info = []
        for st in non_empty_strings:
            st = re.sub(r'\[ +\]', '', st)
            info.append(st)
        items_list = [{"title": string} for string in info]
        current_items = output_data['itemGroups'][-1]['items']
        current_items.append({
            "topic": entry['title'],
            "items": items_list,
            # "description": entry['content'],
            # "description": "",
            # "tags": ""
        })

# current_level2 = None
#
# for entry in headings_and_content:
#     if entry['level'] == 1:
#         new_topic = {
#             "title": entry['title'],
#             "items": [],
#             "description": entry['content'],
#         }
#         output_data['itemGroups'].append(new_topic)
#         current_level2 = new_topic
#     elif entry['level'] == 2:
#         new_topic = {
#             "title": entry['title'],
#             "items": [],
#             "description": entry['content'],
#         }
#         current_level2['items'].append(new_topic)
#     elif entry['level'] == 3:
#         current_items = current_level2['items']
#         current_items.append({
#             "title": entry['title'],
#             "description": entry['content'],
#         })


# 将输出数据格式化为JSON字符串
output_json = json.dumps(output_data, indent=2, ensure_ascii=False)

# 创建一个输出JSON文件
output_file_path = os.path.join(output_directory, f'{output_file_name}.json')
with open(output_file_path, 'w', encoding='utf-8') as output_file:
    output_file.write(output_json)

print("Information has been written to individual files in the specified directory.This is file:", n)
# 打印各级标题、标题级别及其内容
# print("这是：***", n, "***")
# print("Processing file:", file_name)
# for entry in headings_and_content:
#     print("Title:", entry['title'])
#     print("Level:", entry['level'])
#     print("Content:", entry['content'])
#     print()
if (n > 300): break

# 打印文件名以示例
# print("Processing file:", file_name)
