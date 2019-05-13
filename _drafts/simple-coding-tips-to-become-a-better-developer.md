---
layout: post
title: Simple coding tips to become a better developer
---

### TL:DR: For lazy souls
>In this blog post I will be sharing certain information which you can use to become a rockstar developer without investing a lot of time.

I'm not a veteran developer who has in-depth knowledge about programming but in the last few years since I have been coding, I have learnt a couple of things which have helped me become a better developer by writing structured and technically correct code without violating the guidelines.

It's quite common to experience an urge to write sub-standard code which violates certain rules.

#### Why?
That's because even with that sub-standard code you are able to meet your short term goal of getting a particular output.

In this article we will look at certain stuff which we can learn and instantaneously start implementing which in turn will make your code stink a bit less. And also will help you in future to debug it.

Lets start with the tips without wasting much time.

### 1: if-else vs switch
When you have 2-3 conditions, then both will work and you won't see any major difference. But when you have say 5 or more conditions then it's better to use switch than a if-else.

If you need an in-depth info on why you should use switch then you can checkout this question on StackOverflow.

>Sometimes it takes 10 years to just get that 1 year which will changes your life.

### 2: null vs empty object
Many a times people confuse that null and empty are both same but they are not. Null means an object has not been initailized whereas an empty means the object is empty. When using `null`, we have to be careful of the NullPointerException.

### 3: Choose appropiate data structure
The choice of data structure effects the performance of the program/software. So, select them carefully. There are various scenarious where a list and array both will do but choosing one over the other will greatly affect the performance.

### 4: boxing and unboxing
Converting a primitive value into an object of theh corresponding wrapper class is called boxing/autoboxing. Whereas converting an object of a wrapper type to its corresponding primitive value is called unboxing.

**Boxing example:**
```java
int x = 10;
Integer y = x;
```

**Unboxing example:**
```java
Integer x = 10;
int y = x;
```
 
 It is generally adviced to use unboxed values compared to boxed values both in terms of performance and memory space.
