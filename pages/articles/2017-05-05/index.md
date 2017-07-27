---
title: "MacOS挂载NTFS"
date: "2017-05-05T00:00:00.000Z"
layout: post
path: "/MacOSMountNTFS/"
category: "MacOS"
description: "mac读写ntfs啊啊啊啊"
---

虽然平时比较少机会会在mac上用到u盘什么的，毕竟现在靠网络传输就搞定很大部分问题了

但有时候无可避免要在mac上用ntfs，直接了当就是买收费软件，最省力。

其实自己挂载的话好像也不是太复杂


1. 执行 ``diskutil info /Volumes/[磁盘名]`` ，找到Device Node 这个字段值[Device Node名]

2. ``hdiutil eject /Volumes/[磁盘名]``，弹出磁盘

3. 创建一个目录，稍后将mount到这个目录 ``mkdir /Volumes/[随便起]``

4. 将移动硬盘以NTFS格式mount到上面的目录 ``mount_ntfs -o rw,nobrowse /dev/[Device Node名] /Volumes/[随便起]/``

5. ``cd /Volumes/[随便起]/`` 进入到目录

6. ``open .`` 在finder中打开目录

7. ``diskutil unmount /dev/[Device Node名]`` unmount掉磁盘
