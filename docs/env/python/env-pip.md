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
1. 建议先试用venv创建一个环境，之后进入虚拟环境（执行./venv/bin/activate 脚本即可执行）

2. pipenv --python 3.7来创建pipenv管理（如果上面没有使用venv则会在默认位置创建一个虚拟环境但是有venv虚拟环境就会在

3. pipenv shell 进入虚拟环境 ==如果在命令行开头已经有(venv)这样的表示代表已经进入虚拟环境了可以不用这个命令== 

4. 之后可以使用以下命令来根据requirements来安装包

5. pipenv install -r requirements

6. pipenv update更新（只安装不卸载）

7. pipenv uninstall --all 删除所有

8. pipenv clean 自动清理项目中不需要的包

9. pipenv update [package] 升级项目中的包


只能根据命令来修改配置文件然后修改环境中的依赖,无法直接通过配置文件来修改环境,而且安装速度有点慢

当项目部署上去之后只需要在pipfile所在目录执行pipenv install即可


### pipx 和 poetry
https://www.cnblogs.com/aifengqi/p/15394389.html