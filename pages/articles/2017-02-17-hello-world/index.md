---
title: "Hello world"
date: "2017-02-17T22:12:03.284Z"
layout: post
path: "/hello-world/"
category: "something"
description: "架设在github上的blog"
---
### 博客
突然想找个地方写写东西，对于我这些不装逼遭雷劈的人来说，用现成的blog显然逼格太低是不可能的。       
想着有个用来做邮箱的域名，又有两个用来ss的vps，本来想在vps上架个wordpress。想想看还是算了，东西又写得不多，还是怎么简单怎么来好了。  

### github
所以就想到了github，因为github服务器上只能放静态的html，老实说其实不是很科学。  
当然好处就是无限容量的github，而且配置简单还能挂上域名。    
说干就干，然后我打开了github，用力地打上了关键词 **blog** ，按照stars排序。 

### gatsby
jekyll大概是最出名的了，排在第一。本着不走平常路的执着，当然不能用最出名的那个（其实是配置看起来有些复杂）。     
继续滚下去随便看看，看到了有个项目叫 <a href="https://github.com/gatsbyjs/gatsby" target="_blank"/>**gatsby** </a>，这不是一直在用的日本发蜡牌子咩？？？ 还是说了不起的盖茨比？？？   
进去看看介绍
>Transform plain text into dynamic blogs and websites using the latest web technologies. A React.js static site generator.

>Supports Markdown, HTML, and React.js pages out of the box. Easy to add support for additional file types.

刚好我也在看react，觉得老牛逼了，就是它了。

### 安装
按着提示npm啪啪啪啪啪一声就安装好了，跑了下gatsby看着功能和描述一样，能用jsx、能用markdown，只是不太像一个blog。  
看见有个不知道怎么翻译的东东Gatsby Starters，大概是gatsby的衍生项目？
其中有个项目叫 <a href="https://github.com/wpioneer/gatsby-starter-lumen" target="_blank"/>**lumen**</a>，像极了博客，就是它了


### 再安装
啪啪啪啪啪又装完，看了一下目录，一个post就是一个文件夹，只是不知道为什么开发模式下加一篇文章会有error的，需要重启服务器才可以。    
顺手改了一下模版，英文改中文，无用的icon去掉，layout小改了一下


### 域名
域名的设置可谓相当简单，github后台设置一下，然后域名的dns做一个记录，五分钟就生效。  
只是现在文章要用markdown写，要查查语法格式。   
写好后build一下，把build的东西扔进git commit一下。   

大功告成。