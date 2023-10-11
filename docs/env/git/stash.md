# GIT 操作: 隐藏（Stash）

在需要暂存隐藏的分支运行, 隐藏当前代码更改

```linux
git stash
```

通过运行`git stash list` 查看当前所有隐藏的列表

修改完其他分支代码后, 回到当前分支运行`git stash pop` 恢复之前隐藏的代码
