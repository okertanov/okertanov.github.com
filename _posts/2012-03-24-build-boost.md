---
layout: post
title : How to build the boost library
tagline:
category : dev
tags : [c++, boost, build]
---
{% include JB/setup %}

Building Win32 boost
--------------------

### 1. Magic with cmd & vcvars:
    "C:\Program Files (x86)\Microsoft Visual Studio 9.0\Common7\Tools\vsvars32.bat"

### 2. Bootstrapping boost build system
    bootstrap.bat

### 3. Clean rebuild
    bjam --clean-all
    bjam --build-type=complete --layout=versioned --without-python --without-mpi toolset=msvc runtime-link=shared link=static threading=multi stage

