# linux 常见问题整理

## vim 粘贴文本格式错乱问题

### 解决办法

在正常模式下使用以下命令, 然后粘贴内容 (保持原样文本格式)

```linux
:set paste
```

## tar 文件夹压缩

命令如下

```linux
tar -czvf 文件名.tar.gz 要压缩的文件夹/
```
