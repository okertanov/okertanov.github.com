---
layout: post
title : Hown to generate a directory index for the images preview like a true vimmer.
tagline:
category : vim
tags : [vim, index, regexp]
---
{% include JB/setup %}

    cd dir-with-images
    vim index.html
    :r!ls
    :%s/^\(.+\)$/<img src"\1">/g

