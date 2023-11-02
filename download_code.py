import requests
import re
# 替换成你自己的GitHub用户名和访问令牌
username = "2393732975"
token = "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"

# 设置搜索关键字和过滤条件
query = "Checklist"  # 替换成你想搜索的关键字
url = f"https://api.github.com/search/repositories?q={query}"

results = []
i=0
while url:


    # 发出 GET 请求并将访问令牌添加到标头中
    headers = {
        "Authorization": f"token {token}"
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        data = response.json()
        repositories = data['items']
        results.extend(repositories)
        for repo in repositories:
            owner = repo['owner']['login']
            print(owner)
            repo_name0 = repo['full_name']
            repo_name1 = re.sub(owner, '', repo_name0)
            repo_name = re.sub('/', '', repo_name1)
            print(repo_name)
            readme_url = f"https://api.github.com/repos/{owner}/{repo_name}/readme"

            # 发出 GET 请求并将访问令牌添加到标头中
            response = requests.get(readme_url, headers=headers)

            if response.status_code == 200:
                # 解析 JSON 响应
                readme_data = response.json()

                # 获取 README 内容
                readme_content = readme_data.get("content", "")

                # 解码 base64 编码的内容
                import base64

                if readme_content:
                    # 解码base64编码的内容
                    decoded_content = base64.b64decode(readme_content).decode('utf-8')
                    with open(f"C://Users/lenovo/Desktop/hhf/{repo_name}", 'w', encoding='utf-8') as f:
                        f.write(decoded_content)

                    print("字符串已保存")
                    print(i)
                else:
                    print(f"No README content found for {owner}/{repo_name}")
        # 检查是否有下一页
        if 'next' in response.links:
            url = response.links['next']['url']
            i=i+1
        else:
            url = None
    else:
        print("Failed to fetch repositories")
        break

# 打印所有仓库的完整名称
for repo in results:
    print(repo['full_name'])

print(i)