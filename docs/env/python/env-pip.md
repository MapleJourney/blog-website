不同工具比较

### pip 
简单安装

### pip-tools

如果安装pip安装flask会安装以下依赖
```
click==7.1.2
Flask==1.1.2
itsdangerous==1.1.0
Jinja2==2.11.2
MarkupSafe==1.1.1
Werkzeug==1.0.1    
```
但是如果运行pip uninstall flask只会卸载Flask这个包其他依赖并不会卸载

> pip-tools 需要 < pip 23.2 但是你安装pip-tools他会自动帮你更新到最新版本的pip
> 所以安装完需要运行 `pip install pip==22.2 --ignore-requires-python` 强制重装

pip-compile requirements 会生成 requirements.txt
之后再用
pip-sync requirements.txt 就可以比对项目与requirements中的依赖并自动管理
不建议使用

### pipenv
建议先试用venv创建一个环境再用pipenv --python 3.7来创建pipenv管理
之后可以使用以下命令来根据requirements来安装包
pyenv install -r requirements